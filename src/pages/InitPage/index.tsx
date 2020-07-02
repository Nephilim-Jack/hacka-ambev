import React, { Component } from 'react';
import { Props } from '../../types'
import {
    Container, DataInputs,
    Background, LogoName,
    RegisterText, RegisterLink
} from './styles'

export default class InitPage extends Component<Props> {
    handleInput = () => {
        this.props.navigation.navigate('PlacesList')
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
                    <DataInputs placeholder='login' />
                    <DataInputs placeholder='password' secureTextEntry onSubmitEditing={this.handleInput} />

                    <RegisterText>Não tem uma conta? É fácil criar uma,
                        <RegisterLink onPress={this.handleNewAccount}> é só clicar aqui!</RegisterLink>
                    </RegisterText>
                </Container>
            </Background>
        )
    }
}