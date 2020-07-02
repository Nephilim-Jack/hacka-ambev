import React, { Component } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import {
    IconView, PageContanier,
    PageText, Places,
    Place, SideBar,
    Wrapper, MoneyText,
    MoneyContainer
} from './styles'

export default class PlacesList extends Component {
    render() {
        return (
            <Wrapper>
                <PageContanier>
                    <PageText>Bares na sua Região</PageText>
                    <MoneyContainer>
                        <MoneyText size={24}>Saldo Disponivel:</MoneyText>
                        <MoneyText size={24}>R$150,00</MoneyText>
                    </MoneyContainer>
                </PageContanier>

                <Places>
                    <Place />
                    <Place />
                    <Place />
                    <Place />
                    <Place />
                    <Place />
                </Places>

                <SideBar>

                    <IconView size={48}>
                        <FontAwesome5 name='angle-left' size={32} color='#293241' />
                    </IconView>

                    <IconView size={48}>
                        <FontAwesome5 name='star' size={32} color='#293241' />
                    </IconView>

                    <IconView size={56}>
                        <FontAwesome5 name='user' size={40} color='#293241' />
                    </IconView>

                    <IconView size={48}>
                        <FontAwesome5 name='users' size={32} color='#293241' />
                    </IconView>

                    <IconView size={48}>
                        <FontAwesome5 name='angle-right' size={32} color='#293241' />
                    </IconView>

                </SideBar>
            </Wrapper>
        )
    }
}