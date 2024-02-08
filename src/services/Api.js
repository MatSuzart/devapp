// Importa o módulo AsyncStorage do pacote '@react-native-async-storage/async-storage', que permite armazenar dados de forma assíncrona no armazenamento local do dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a URL base para as requisições à API
const baseUrl = 'https://api.b7web.com.br/devcond/api';

// Função assíncrona que realiza requisições para a API
const request = async (method, endpoint, params, token = null) => {
    // Converte o método da requisição para minúsculas
    method = method.toLowerCase();
    // Monta a URL completa com o endpoint da requisição
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    // Switch case para determinar o tipo de requisição
    switch(method) {
        case 'get':
            // Se for uma requisição do tipo GET, monta a string de consulta (query string) com os parâmetros
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            // Se for uma requisição dos tipos POST, PUT ou DELETE, converte os parâmetros para formato JSON
            body = JSON.stringify(params);
        break;       
    }

    // Define os cabeçalhos da requisição, incluindo o tipo de conteúdo como JSON e, se houver, o token de autenticação
    let headers = {'Content-Type': 'application/json'};
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    // Realiza a requisição HTTP utilizando a função fetch do JavaScript, com o método, URL, cabeçalhos e corpo definidos
    let req = await fetch(fullUrl, {
        method,
        headers,
        body
    });

    // Converte a resposta da requisição para formato JSON
    let json = await req.json();
    // Retorna o resultado da requisição
    return json();
}

// Exporta um objeto com funções utilitárias para lidar com o token de autenticação
export default {
    // Função assíncrona para obter o token de autenticação armazenado no AsyncStorage
    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },

    // Função assíncrona para validar o token de autenticação armazenado no AsyncStorage
    validateToken: async () => {
        // Obtém o token de autenticação armazenado no AsyncStorage
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/validate', {}, token);
        return json();
    },
};
