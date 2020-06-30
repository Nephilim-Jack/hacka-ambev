import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Container, DataInputs, Background, LogoName } from './styles'

export const Home = () => {
    return (
        <Background
            source={require('../../../assets/backImage.jpg')}
            resizeMode='cover'
        >
            <LogoName>Nome do App</LogoName>
            <Container>
                <DataInputs placeholder='login' />
                <DataInputs placeholder='password' secureTextEntry />
            </Container>
        </Background>
    )
}