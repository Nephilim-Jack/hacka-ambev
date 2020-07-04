import React, { Component } from 'react';
import { Alert, Image } from 'react-native'
import { Props } from '../../types'
import { HackaApi } from '../../services/api'
import {
    Container, DataInputs,
    Background, Logo,
    RegisterText, RegisterLink,
    WhoAreYouContainer, WhoButtom, WhoText
} from './styles'

export default class InitPage extends Component<Props> {
    api = new HackaApi
    state = {
        username: '',
        password: '',
        who: 'none'
    }

    handleLoginText = (text: string) => {
        this.setState({ username: text })
    }

    handlePasswordText = (text: string) => {
        this.setState({ password: text })
    }

    handleLogin = async () => {
        const status = await this.api.loginUser({
            username: this.state.username,
            password: this.state.password
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
            this.props.navigation.navigate('PlacesList', { userDetail: status })
        }
    }

    handleNewAccount = () => {
        this.props.navigation.navigate('RegisterPage')
    }

    loadContent = () => {
        if (this.state.who === 'none') {
            return (
                <Container style={{ alignItems: 'center', top: '20%' }}>
                    <WhoText style={{ fontSize: 32 }}>Você é?</WhoText>
                    <WhoAreYouContainer>
                        <WhoButtom onPress={() => { this.setState({ who: 'user' }) }}>
                            <WhoText>Cliente</WhoText>
                        </WhoButtom>
                        <WhoButtom onPress={() => { this.setState({ who: 'place' }) }}>
                            <WhoText>Estabelecimento</WhoText>
                        </WhoButtom>
                    </WhoAreYouContainer>
                </Container>
            )
        } else if (this.state.who === 'user') {
            return (
                <Container>
                    <DataInputs
                        placeholder='Nome de Usuário'
                        onChangeText={text => this.handleLoginText(text)}
                    />

                    <DataInputs
                        placeholder='Senha'
                        onChangeText={text => this.handlePasswordText(text)}
                        onSubmitEditing={this.handleLogin}
                        secureTextEntry
                    />

                    <RegisterText>Não tem uma conta? É fácil criar uma,
                        <RegisterLink onPress={this.handleNewAccount}> é só clicar aqui!</RegisterLink>
                    </RegisterText>
                </Container>
            )
        } else {
            this.props.navigation.navigate('QrScannerPage')
        }
    }

    render() {
        return (
            <Background
                source={require('../../../assets/backImage.jpg')}
                resizeMode='cover'
            >
                <Logo>
                    <Image style={{ width: '100%', height: '100%' }} source={require('../../../assets/logo.png')}></Image>
                </Logo>
                {this.loadContent()}
            </Background>
        )
    }
}