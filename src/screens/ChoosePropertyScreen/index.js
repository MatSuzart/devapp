// Importa os módulos necessários do React e de outras bibliotecas
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style'; // Importa estilos personalizados
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateValue } from '../../contexts/StateContext'; // Importa o contexto global do aplicativo
import api from '../../services/Api'; // Importa o serviço de API para fazer requisições

// Componente funcional responsável por renderizar a tela principal
export default () => {
    const navigation = useNavigation(); // Inicializa o hook de navegação
    const [context, dispatch] = useStateValue(); // Obtém o estado global do aplicativo e a função de dispatch
    const [loading, setLoading] = useState(true); // Define um estado local para controle de carregamento
// Define um efeito colateral que é executado após a renderização inicial do componente
useEffect(() => {
    // Função assíncrona para verificar se o usuário selecionou uma propriedade anteriormente
    const checkPropertySel = async () => {
        // Obtém a propriedade selecionada do armazenamento local
        let property = await AsyncStorage.getItem('property');
        if (property) {
            // Converte a propriedade para o formato JSON
            property = JSON.parse(property);
            await chooseProperty(property);
        }
        // Define o estado de carregamento como false para indicar que o efeito de carregamento foi concluído
        setLoading(false);
    }
    // Chama a função para verificar se o usuário selecionou uma propriedade ao montar o componente
    checkPropertySel();
}, []); // O array de dependências vazio indica que o efeito só deve ser executado uma vez, após a montagem inicial do componente

// Função responsável por lidar com o botão de logout
const handleLogoutButton = async () => {
    // Chama a função de logout do serviço de API
    await api.logout();
    // Redefine a navegação para a tela de login, removendo todas as outras rotas do histórico
    navigation.reset({
        index: 1,
        routes: [{ name: 'loginScreen' }]
    });
}

// Função assíncrona responsável por selecionar uma propriedade e configurá-la como propriedade ativa do usuário
const chooseProperty = async (property) => {
    // Armazena a propriedade selecionada no armazenamento local, convertendo-a para o formato JSON
    await AsyncStorage.setItem('property', JSON.stringify(property));
    // Despacha uma ação para atualizar o estado global da propriedade ativa do usuário
    dispatch({
        type: 'setProperty',
        payload: {
            property // Define a propriedade como payload da ação
        }
    });
    // Redefine a navegação para a tela principal do aplicativo, removendo todas as outras rotas do histórico
    navigation.reset({
        index: 1,
        routes: [{ name: 'MainDrawer' }]
    });
}
    return (
        <C.Container>
            <C.Scroller>
                {/* Verifica se a página está carregando */}
                {loading && 
                    <C.LoadingIcon color="#8863E6" size="large" /> // Exibe um ícone de carregamento
                }
                {/* Verifica se o usuário está logado e possui propriedades */}
                {!loading && context.user.user.properties.length > 0 &&
                    <>  
                        <C.HeadTitle>Olá {context.user.user.name}</C.HeadTitle> 
                        <C.HeadTitle>Escolha uma das suas propriedades</C.HeadTitle> 

                        <C.PropertyList>
                            {context.user.user.properties.map((item, index)=>(
                                <C.ButtonArea key={index} onPress={()=>chooseProperty(item)}>
                                    <C.ButtonText>{item.name}</C.ButtonText>
                                </C.ButtonArea>
                            ))}
                        </C.PropertyList>
                    </>
                }
                {/* Verifica se o usuário está logado, mas não possui propriedades */}
                {!loading && context.user.user.properties.length <= 0 &&
                    <C.BigArea>
                        <C.HeadTitle>{context.user.name}, parabéns pelo cadastro!</C.HeadTitle> 
                        <C.HeadTitle>Agora a administração precisa liberar seu acesso.</C.HeadTitle>
                    </C.BigArea>
                }
            </C.Scroller>
            <C.ExitButtonArea onPress={handleLogoutButton}>
                <C.ExitButtonText>Sair</C.ExitButtonText>
            </C.ExitButtonArea>
        </C.Container>
    );
}
