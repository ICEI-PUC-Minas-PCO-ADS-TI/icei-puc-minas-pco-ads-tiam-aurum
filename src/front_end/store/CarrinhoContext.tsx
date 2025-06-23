import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Joia } from '../components/JoiaCard';

export interface ItemCarrinho {
    joia: Joia;
    quantidade: number;
}

interface CarrinhoContextData {
    itens: ItemCarrinho[];
    adicionarItem: (joia: Joia, quantidade: number) => void;
    removerItem: (idJoia: number) => void;
    limparCarrinho: () => void;
    atualizarItem: (idJoia: number, novaQuantidade: number) => void;
}

const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

type CarrinhoProviderProps = {
  children: ReactNode;
};

export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({ children }) => {

    const [itens, setItens] = useState<ItemCarrinho[]>([]);

    function adicionarItem(joia: Joia, quantidade: number) {
        setItens(prev => {
            const existente = prev.find(item => item.joia.id === joia.id);
            if (existente) {
                return prev.map(item =>
                    item.joia.id === joia.id
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                );
            } else {
                return [...prev, { joia, quantidade }];
            }
        });
    }

    function removerItem(idJoia: number) {
        setItens(prev => prev.filter(item => item.joia.id !== idJoia));
    }

    function atualizarItem(idJoia: number, novaQuantidade: number) {
        setItens(prev =>
            prev.map(item =>
                item.joia.id === idJoia
                    ? { ...item, quantidade: novaQuantidade }
                    : item
            )
        );
    }

    const limparCarrinho = () => {
        setItens([]);
    };

    return (
        <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho, atualizarItem }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

const useCarrinho = () => useContext(CarrinhoContext);

export default useCarrinho;
