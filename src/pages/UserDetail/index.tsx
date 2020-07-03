import React, { Component } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Props } from '../../types'
import {
    MainView, AmbevPointsText,
    UserBalanceText, UserCityText,
    UserImage, UserNameText,
    UserSlugText, Banner,
    PresentationContainer, ImageView,
    MoneyContainer, MoneyWrapper,
    ExplainText, BackButtom,
    BackContainer, BackText
} from './styles'

export default class UserDetail extends Component<Props> {
    userDetail = this.props.route.params.userDetail

    render() {
        return (
            <MainView>
                <Banner>
                    <ExplainText>Dados do Usuário</ExplainText>
                    <ImageView>
                        <UserImage source={{ uri: this.userDetail.userImage }} />
                    </ImageView>
                </Banner>
                <PresentationContainer>
                    <UserNameText>{this.userDetail.name}</UserNameText>
                    <UserSlugText>{this.userDetail.username}</UserSlugText>
                </PresentationContainer>
                <UserCityText>{this.userDetail.userCity}/{this.userDetail.userUf}</UserCityText>
                <MoneyContainer>
                    <MoneyWrapper style={
                        {
                            marginRight: 8,
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                        }
                    }>
                        <UserBalanceText>R${this.userDetail.accountBalance}</UserBalanceText>
                        <UserBalanceText>Saldo Disponível</UserBalanceText>
                    </MoneyWrapper>

                    <MoneyWrapper style={
                        {
                            marginLeft: 8,
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                        }
                    }>
                        <AmbevPointsText>{this.userDetail.ambevPoints}</AmbevPointsText>
                        <AmbevPointsText>Pontos Ambev</AmbevPointsText>
                    </MoneyWrapper>

                </MoneyContainer>
                <BackContainer>
                    <BackButtom onPress={e => this.props.navigation.goBack()}>
                        <FontAwesome5 name='angle-down' size={72} color={'white'} />
                    </BackButtom>
                    <BackText>Voltar</BackText>
                </BackContainer>
            </MainView>
        )
    }
}