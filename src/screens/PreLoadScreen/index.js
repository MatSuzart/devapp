import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/Api';

// Componente funcional que representa a tela de pré-carregamento
export default () => {
    // Obtém a navegação da aplicação usando o hook useNavigation
    const navigation = useNavigation();
    // Obtém o estado global da aplicação e a função dispatch para atualizar o estado usando o hook useStateValue
    const [context, dispatch] = useStateValue();

    // Efeito que é executado após a montagem do componente
    useEffect(() => {
        // Função que verifica se o usuário está logado
        const checkLogin = async () => {
            // Obtém o token de autenticação do usuário
            let token = await api.getToken();
            // Verifica se há um token
            if (token) {
                // Valida o token de autenticação
                let result = await api.validateToken();
                // Verifica se houve erro na validação do token
                if (result.error === '') {
                    // Atualiza o estado global da aplicação com os dados do usuário
                    dispatch({
                        type: 'setUser',
                        payload: {
                            user: result.user
                        }
                    });
                    // Redefine a navegação para a tela ChoosePropertyScreen
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'ChoosePropertyScreen' }]
                    });
                } else {
                    // Limpa o token de autenticação do usuário
                    alert(result.error); // Exibe um alerta com o erro
                    dispatch({ type: 'setToken', payload: { token: '' } }); // Limpa o token
                    // Redefine a navegação para a tela LoginScreen
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'LoginScreen' }]
                    });
                }
            } else {
                // Se não houver um token, redefine a navegação para a tela LoginScreen
                navigation.reset({
                    index: 1,
                    routes: [{ name: 'LoginScreen' }]
                });
            }
        };

        // Chama a função de verificação de login
        checkLogin();
    }, []); // O segundo argumento vazio indica que este efeito é executado apenas uma vez, após a montagem do componente

    // Retorna a interface da tela de pré-carregamento
    return (
        <C.Container>
            {/* Renderiza um ícone de carregamento */}
            <C.LoadingIcon color="#8863E6" size="large" />
        </C.Container>
    );
}
