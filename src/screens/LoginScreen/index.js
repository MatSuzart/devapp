import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/Api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const hadleLoginButton = async ()=>{
        if(cpf && password){
            let result = await api.login(cpf, password);

            if(result.error ===''){
                //se erro não retornou nada, agora vamos salvar o nosso token no reducer
                dispatch({
                    type:'setToken',
                    payload:{
                        token: result.token
                    }
                });
                dispatch({type:'setUser', payload: {user:result.user}});
                //redicionar o usuario
                navigation.reset({
                    index:1,
                    routes:[{name: 'ChoosePropertyScreen'}]
                });
            }else {
                alert(result.error);
            }

        }else {
            alert("Preencha os campos");
        }
    }

    const handleRegisterButton = ()=>{
        navigation.navigate('RegisterScreen');
    }

    return (
        <C.Container>
          <C.Logo 
            source={require('../../assets/logo.png')}
            resizeMode="contain"
          />
      
          <C.Field 
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(t) => setCpf(t)}
          />
      
          <C.Field 
            placeholder="Digite sua Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={(t) => setPassword(t)}
          />
           <C.ButtonArea onPress={hadleLoginButton}>
                <C.ButtonText>Entrar</C.ButtonText>
            </C.ButtonArea>

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>Cadastre-se</C.ButtonText>
            </C.ButtonArea>
        </C.Container>

       
      );
}