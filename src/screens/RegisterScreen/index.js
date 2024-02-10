import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/Api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEamil] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    //vamos utilizar o useEffect para alterar o cabeçalho
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Fazer Cadastro'
        });
    });

    const handleRegisterButton = async()=>{
        if(name && email && password && passwordConfirm ){
            let result = await api.register(name, email,cpf,password,password_confirm);
            if(result.error ===''){
                //mandou o usuario, agora salvar as informações do usuario
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
            }else{
                alert(result.error);
            }
        }else {
            alert("Preencha os Campos");
        }
    }


    return (
        <C.Container>
          <C.Field 
            placeholder="Digite seu Nome"
            value={name}
            onChangeText={(t) => setName(t)}
          />

            <C.Field 
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(t) => setCpf(t)}
          />
           <C.Field 
            placeholder="Digite seu E-mail"
            value={email}
            onChangeText={(t) => setEmail(t)}
          />
      
          <C.Field 
            placeholder="Digite sua Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={(t) => setPassword(t)}
          />
           <C.Field 
            placeholder="Confirme a sua Senha"
            secureTextEntry={true}
            value={passwordConfirm}
            onChangeText={(t) => setPasswordConfirm(t)}
          />


            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>Cadastre-se</C.ButtonText>
            </C.ButtonArea>
        </C.Container>

       
      );
}