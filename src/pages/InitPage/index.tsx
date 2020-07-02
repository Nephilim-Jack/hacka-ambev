import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Props } from '../../types'
import { HackaApi } from '../../services/api'
import {
    Container, DataInputs,
    Background, LogoName,
    RegisterText, RegisterLink
} from './styles'

export default class InitPage extends Component<Props> {
    api = new HackaApi
    username = ''
    password = ''

    handleLoginText = (text: string) => {
        this.username = text
    }

    handlePasswordText = (text: string) => {
        this.password = this.password
    }

    handleLogin = async () => {
        const status = await this.api.loginUser({
            username: this.username,
            password: this.password
        })

        if (status.error == 'unauthorized') {
            Alert.alert(
                'Login',
                'Nome de usuário ou senha incorreta!',
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ]
            )
        } else {
            this.props.navigation.navigate('PlacesList')
        }
    }

    handleNewAccount = () => {
        this.props.navigation.navigate('RegisterPage')
    }

    render() {
        return (
            <Background
                source={require('../../../assets/backImage.jpg')}
                resizeMode='cover'
            >
                <LogoName>Nome do App</LogoName>
                <Container>
                    <DataInputs
                        placeholder='login'
                        onChangeText={text => this.handleLoginText(text)}
                    />

                    <DataInputs
                        placeholder='password'
                        onChangeText={text => this.handlePasswordText(text)}
                        onSubmitEditing={this.handleLogin}
                        secureTextEntry
                    />

                    <RegisterText>Não tem uma conta? É fácil criar uma,
                        <RegisterLink onPress={this.handleNewAccount}> é só clicar aqui!</RegisterLink>
                    </RegisterText>
                </Container>
            </Background>
        )
    }
}