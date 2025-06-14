import { Text, FlatList, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { useState } from 'react';

import Container from '../../components/Container';
import JoiaCard from '../../components/JoiaCard';
import ModalEditarQuantidade from '../../components/ModalEditarQuantidade';
import cardContainerStyle from '../../styles/cardContainer';
import formularioStyle from '../../styles/formulario';
import useCarrinho, { ItemCarrinho } from '../../store/CarrinhoContext';

export default function Carrinho({ navigation }: any) {
    const { itens, removerItem, atualizarItem } = useCarrinho();
    const [modalVisivel, setModalVisivel] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState<ItemCarrinho | null>(null);


    function abrirModalEditar(item: ItemCarrinho) {
        setItemSelecionado(item);
        setModalVisivel(true);
    }

    function atualizarQuantidade(novaQtd: number) {
        if (itemSelecionado) {
            atualizarItem(itemSelecionado.joia.id, novaQtd);
        }
    }

    function fecharModal() {
        setModalVisivel(false);
        setItemSelecionado(null);
    }

    function finalizarCompra() {
        navigation.navigate('FinalizarCompra');
    }

    return (
        <Container>
            <Text style={formularioStyle.titulo}>Carrinho</Text>
            <View style={cardContainerStyle.cardContainer}>
                {itens.length === 0 ? (
                    <Text style={formularioStyle.label}>Seu carrinho está vazio.</Text>
                ) : (
                    <>
                        <FlatList<ItemCarrinho>
                            data={itens}
                            keyExtractor={(item) => item.joia.id.toString()}
                            renderItem={({ item: itemCarrinho }) => (
                                <JoiaCard
                                    joia={{ ...itemCarrinho.joia, quantidade: itemCarrinho.quantidade }}
                                    deletar={() => removerItem(itemCarrinho.joia.id)}
                                    editar={() => abrirModalEditar(itemCarrinho)}
                                />
                            )}
                        />
                        <TouchableOpacity style={styles.btnFinalizar} onPress={finalizarCompra}>
                            <Text style={styles.txtBtnFinalizar}>Finalizar Compra</Text>
                        </TouchableOpacity>
                    </>
                )}
                <ModalEditarQuantidade
                    visivel={modalVisivel}
                    fechar={fecharModal}
                    quantidadeAtual={itemSelecionado?.quantidade || 1}
                    estoque={itemSelecionado?.joia.quantidade || 1}
                    onConfirmar={atualizarQuantidade}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    btnFinalizar: {
        backgroundColor: '#293A3A',
        width: '60%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    txtBtnFinalizar: {
        color: '#D4AF37',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
