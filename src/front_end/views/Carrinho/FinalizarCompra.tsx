import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import useCarrinho from '../../store/CarrinhoContext';
import Container from '../../components/Container';
import cardContainerStyle from '../../styles/cardContainer';
import formularioStyle from '../../styles/formulario';
import api from '../../services/api';
import store from '../../store';


export default function FinalizarCompra(props: any) {
    const { itens, limparCarrinho } = useCarrinho();

    const [clienteCPF, setClienteCPF] = useState('');
    const [clientes, setClientes] = useState<{ id: number; nome: string; documento: string }[]>([]);
    const [qtdParcelas, setQtdParcelas] = useState('1');
    const [formaPagamento, setFormaPagamento] = useState('Pix');

    const [dataVencimento, setDataVencimento] = useState<Date | undefined>(undefined);
    const [exibirCalendario, setExibirCalendario] = useState(false);

    const usuarioId = store.getState().auth.usuario?.id;

    useEffect(() => {
        async function carregarClientes() {
            try {
                const response = await api.get(`/clientes/usuario/${usuarioId}`);
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
                Alert.alert('Erro', 'Não foi possível carregar os clientes.');
            }
        }

        if (usuarioId) carregarClientes();
    }, [usuarioId]);

    async function enviarPedido() {
        if (!clienteCPF || !qtdParcelas || !dataVencimento || !formaPagamento) {
            Alert.alert('Preencha todos os campos!');
            return;
        }

        const dataVencimentoUTC = new Date(dataVencimento).toISOString();

        const pedido = {
            cpfCliente: clienteCPF,
            itens: itens.map(item => ({
                joiaId: item.joia.id,
                quantidade: item.quantidade,
            })),
            pagamento: {
                qtdParcelas: parseInt(qtdParcelas),
                dataPrimeiroVencimento: dataVencimentoUTC,
                formaPagamento: formaPagamento,
            },
        };

        try {
            const usuarioId = store.getState().auth.usuario?.id;

            if (!usuarioId) {
                Alert.alert("Erro", "Usuário não identificado.");
                return;
            }

            await api.post(`pedido?usuarioId=${usuarioId}`, JSON.stringify(pedido), {
                headers: { 'Content-Type': 'application/json' },
            });

            Alert.alert('Pedido finalizado com sucesso!');
            limparCarrinho();
            props.navigation.navigate('Carrinho');
        } catch (error: any) {
            console.error(error);
            const mensagemErro = error?.response?.data || 'Erro ao finalizar o pedido!';
            Alert.alert('Erro', JSON.stringify(mensagemErro));
        }
    };

    const aoSelecionarData = (evento: any, dataSelecionada?: Date) => {
        setExibirCalendario(Platform.OS === 'ios');
        if (dataSelecionada) {
            setDataVencimento(dataSelecionada);
        }
    };

    return (
        <Container>
            <Text style={formularioStyle.titulo}>Finalizar Compra</Text>
            <ScrollView style={cardContainerStyle.cardContainer}>

                <Text style={formularioStyle.label}>Selecione o Cliente:</Text>
                <View style={styles.selectCliente}>
                    <RNPickerSelect
                        onValueChange={(value) => setClienteCPF(value)}
                        items={clientes.map(cliente => ({
                            label: `${cliente.nome} (${cliente.documento})`,
                            value: cliente.documento,
                            key: cliente.id,
                        }))}
                        placeholder={{ label: 'Selecione um cliente', value: null }}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>

                <Text style={formularioStyle.label}>Quantidade de Parcelas:</Text>
                <TextInput
                    keyboardType="numeric"
                    value={qtdParcelas}
                    onChangeText={setQtdParcelas}
                    style={formularioStyle.input}
                />

                <Text style={formularioStyle.label}>Data do 1º Vencimento:</Text>
                <TouchableOpacity style={formularioStyle.botao} onPress={() => setExibirCalendario(true)}>
                    <Text style={formularioStyle.textoBotao}>{dataVencimento ? dataVencimento.toLocaleDateString('pt-BR') : 'Selecionar Data'}</Text>
                </TouchableOpacity>

                {exibirCalendario && (
                    <DateTimePicker
                        value={dataVencimento || new Date()}
                        mode="date"
                        display="default"
                        onChange={aoSelecionarData}
                    />
                )}

                <Text style={formularioStyle.label}>Forma de Pagamento:</Text>
                <RadioButton.Group
                    onValueChange={setFormaPagamento}
                    value={formaPagamento}
                >
                    <View style={styles.radioGroup}>
                        <RadioButton.Item label="Pix" value="Pix" style={styles.radioItem} />
                        <RadioButton.Item label="Cartão de Crédito" value="Cartão" style={styles.radioItem} />
                        <RadioButton.Item label="Boleto" value="Boleto" style={styles.radioItem} />
                    </View>
                </RadioButton.Group>
                <TouchableOpacity style={formularioStyle.botao} onPress={enviarPedido}>
                    <Text style={formularioStyle.textoBotao}>Enviar Pedido</Text>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    radioGroup: {
        marginVertical: 10,
    },
    radioItem: {
        backgroundColor: '#A3A3A3',
        borderRadius: 12,
        marginBottom: 10,
    },
    btn: {
        marginBottom: 10,
    },
    selectCliente: {
        backgroundColor: '#A3A3A3',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#999',
        marginBottom: 10,
    },
})

const pickerSelectStyles = {
    inputIOS: {
        color: '#F7E7CE',
        fontSize: 16,
        padding: 12,
    },
    inputAndroid: {
        color: '#F7E7CE',
        fontSize: 16,
        padding: 12,
    },
};
;