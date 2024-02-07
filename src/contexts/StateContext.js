// Importa as funcionalidades necessárias do React para criar e usar um contexto
import React, { createContext, useContext, useReducer } from 'react';

// Importa o reducer que será usado para gerenciar o estado do usuário
import UserReducer from '../reducers/UserReducer';

// Define o estado inicial do contexto, com uma propriedade 'user' inicializada com o resultado do UserReducer
const initialState = {
    user: UserReducer() // Chama o UserReducer para inicializar o estado do usuário
};

// Define o reducer principal, que irá gerenciar o estado completo do contexto
const MainReducer = (state, action) => ({
    // Utiliza o UserReducer para atualizar o estado do usuário
    user: UserReducer(state.user, action) // Chama o UserReducer passando o estado atual do usuário e a ação a ser realizada
});

// Cria o contexto que será utilizado para prover e consumir o estado global da aplicação
export const StateContext = createContext();

// Componente que irá prover o estado global para a aplicação
export const StateProvider = ({ children }) => {
    // Usa o hook useReducer para criar o estado global e a função dispatch para realizar ações de atualização
    const [state, dispatch] = useReducer(MainReducer, initialState);
    return (
        // Retorna o provedor do contexto, que irá prover o estado global para todos os componentes filhos
        <StateContext.Provider value={[state, dispatch]}>
        
            {children} 
        </StateContext.Provider>
    );
};

// Hook customizado para consumir o estado global do contexto em componentes filhos
export const useStateValue = () => useContext(StateContext);

{/*
O contexto é uma funcionalidade do React que permite compartilhar dados entre componentes de forma eficiente
sem a necessidade de passar propriedades manualmente por todos os níveis da árvore de componentes. 
Ele é útil quando há a necessidade de compartilhar dados que são considerados "globais" para a aplicação.
*/}