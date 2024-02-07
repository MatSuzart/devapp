// Importa o módulo AsyncStorage do pacote '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define o estado inicial do reducer, com propriedades 'token', 'user' e 'property' inicializadas como vazio
const initialState = {
    token: '',      // Inicializa o token como uma string vazia
    user: {},       // Inicializa o usuário como um objeto vazio
    property: {}    // Inicializa a propriedade como um objeto vazio
};

// Define o reducer que irá gerenciar as ações de atualização do estado
export default (state = initialState, action = {}) => {
    // Utiliza um switch para determinar qual ação deve ser executada com base no tipo da ação
    switch (action.type) {
        // Caso a ação seja do tipo 'setToken'
        case 'setToken':
            // Utiliza o AsyncStorage para armazenar o token no armazenamento local
            AsyncStorage.setItem('token', action.payload.token);
            // Retorna um novo estado com o token atualizado e as outras propriedades mantidas
            return { ...state, token: action.payload.token };
            // Encerra a execução do switch
            break;
        // Caso a ação seja do tipo 'setUser'
        case 'setUser':
            // Retorna um novo estado com a propriedade 'property' atualizada com o valor do payload
            return { ...state, property: action.payload.property };
            // Encerra a execução do switch
            break;
    }
    // Caso não haja correspondência com nenhum tipo de ação, retorna o estado atual sem modificações
    return state;
};
{/*
Um reducer é uma função pura que especifica como o estado de uma aplicação deve ser alterado em resposta 
a uma ação enviada para a store. No contexto do Redux (uma biblioteca para gerenciamento de estado 
em aplicações JavaScript), um reducer é responsável por atualizar o estado global da aplicação com 
base nas ações que são despachadas.
*/}