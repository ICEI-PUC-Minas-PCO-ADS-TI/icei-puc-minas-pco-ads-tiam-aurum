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
}

const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
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

    const limparCarrinho = () => {
        setItens([]);
    };

    return (
        <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

const useCarrinho = () => useContext(CarrinhoContext);

export default useCarrinho;
