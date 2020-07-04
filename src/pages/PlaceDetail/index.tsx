import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { HackaApi, Drink } from '../../services/api'
import { Props } from '../../types'
import {
    MainView
} from './styles'

export default class PlaceDetail extends Component<Props> {
    api = new HackaApi
    state = {
        placeDetail: this.props.route.params.placeDetail,
        userPk: this.props.route.params.userPk
    }
    goToQrPage = async (token: string) => {
        this.props.navigation.navigate('QrViewPage', { token: token })
    }

    handleBuy = async (data: Drink[]) => {
        const token = await this.api.buyDrinks({ drinks: data, userPk: this.state.userPk })
        // código aqui
        this.goToQrPage(token)
    }
    render() {
        console.log(this.state.placeDetail)
        return (
            <MainView>
            </MainView>
        )
    }
}