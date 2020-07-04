import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, Alert, ToastAndroid } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'
import QRCode from 'react-native-qrcode-svg';
import { HackaApi, Drink } from '../../services/api'
import { Props } from '../../types'
import {
    MainView, MapContainer,
    MarkerContainer, MarkerText,
    DrinkAvalible, DrinkButtom,
    DrinkBuyQuantity, DrinkImage,
    DrinkView, DrinksScrollView,
    DrinkName, DrinkBuyContainer,
    FinishBuy, PlaceDesc,
    BottomContainer, FinishBuyText,
    QrIcon
} from './styles'

interface InsideDrink {
    pk: number,
    drinkName: string,
    realQuantity: number,
    digitalQuantity: number,
    imageUrl: string
}

export default class PlaceDetail extends Component<Props> {
    api = new HackaApi

    state = {
        placeDetail: this.props.route.params.placeDetail,
        userPk: this.props.route.params.userPk,
        drinksToBuy: this.props.route.params.placeDetail.drinks.map(drink => {
            return { drinkPk: Number(drink.pk), quantity: 0, max: drink.digitalQuantity }
        }),
        token: ''
    }
    goToQrPage = async () => {
        this.props.navigation.navigate('QrViewPage', { token: this.state.token })
    }

    saveTokenAsync = async () => {
        await AsyncStorage.setItem('token', this.state.token)
    }

    loadTokenAsync = async () => {
        const token = await AsyncStorage.getItem('token') || ''
        this.setState({ token: token })
    }

    handleBuy = async () => {
        const token = await this.api.buyDrinks({ drinks: this.state.drinksToBuy, userPk: this.state.userPk })
        this.setState({ token: token })
        if (this.state.token === '') {
            Alert.alert(
                'Compra',
                'Você precisa comprar alguma coisa antes!',
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ]
            )
        } else {
            this.setState({
                drinksToBuy: this.props.route.params.placeDetail.drinks.map(drink => {
                    return { drinkPk: Number(drink.pk), quantity: 0, max: drink.digitalQuantity }
                })
            })
            ToastAndroid.showWithGravity('Qr Code atualizado!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        this.saveTokenAsync()
    }

    handleAddToCart = (drinkPk: number) => {
        const tempList = this.state.drinksToBuy.slice()
        for (const drink in tempList) {
            if (tempList[Number(drink)].drinkPk == drinkPk) {
                tempList[Number(drink)].quantity += 1

                if (tempList[Number(drink)].quantity > tempList[Number(drink)].max) {
                    tempList[Number(drink)].quantity = tempList[Number(drink)].max
                }
                this.setState({ drinksToBuy: tempList })
                break
            }
        }
    }

    handleRemoveFromCart = (drinkPk: number) => {
        const tempList = this.state.drinksToBuy.slice()
        for (const drink in tempList) {
            if (tempList[Number(drink)].drinkPk == drinkPk) {
                tempList[Number(drink)].quantity -= 1

                if (tempList[Number(drink)].quantity < 0) {
                    tempList[Number(drink)].quantity = 0
                }
                this.setState({ drinksToBuy: tempList })
                break
            }
        }
    }

    async componentDidMount() {
        this.loadTokenAsync()
    }

    render() {
        return (
            <MainView>
                <MapContainer>
                    <MapView
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={{
                            latitude: this.state.placeDetail.lat,
                            longitude: this.state.placeDetail.lng,
                            latitudeDelta: 0.011,
                            longitudeDelta: 0.011
                        }}
                    >
                        <Marker
                            style={styles.marker}
                            coordinate={{
                                latitude: this.state.placeDetail.lat,
                                longitude: this.state.placeDetail.lng
                            }}
                        >
                            <MarkerContainer>
                                <MarkerText>{this.state.placeDetail.name}</MarkerText>
                            </MarkerContainer>
                        </Marker>
                    </MapView>
                </MapContainer>
                <DrinksScrollView horizontal={true}>
                    {this.state.placeDetail.drinks.map((drink: InsideDrink, index: number) => {
                        return (
                            <DrinkView key={drink.pk}>
                                <DrinkAvalible>{'<'}{drink.digitalQuantity}{'>'}</DrinkAvalible>
                                <DrinkImage source={{ uri: drink.imageUrl }} />
                                <DrinkName>{drink.drinkName}</DrinkName>
                                <DrinkBuyContainer>
                                    <DrinkButtom onPress={e => this.handleRemoveFromCart(drink.pk)}>
                                        <FontAwesome5 name='minus' size={12} color='#222222' />
                                    </DrinkButtom>

                                    <DrinkBuyQuantity value={this.state.drinksToBuy[index].quantity.toString()} />

                                    <DrinkButtom onPress={e => this.handleAddToCart(drink.pk)}>
                                        <FontAwesome5 name='plus' size={12} color='#222222' />
                                    </DrinkButtom>
                                </DrinkBuyContainer>
                            </DrinkView>
                        )
                    })}
                </DrinksScrollView>
                <PlaceDesc>{this.state.placeDetail.description}</PlaceDesc>
                <BottomContainer>
                    <FinishBuy onPress={e => this.handleBuy()}>
                        <FontAwesome5 name='shopping-cart' size={12} color='white' />
                        <FinishBuyText>{' '}Finalizar Compra</FinishBuyText>
                    </FinishBuy>
                    {
                        this.state.token !== '' ?
                            <QrIcon onPress={e => this.goToQrPage()}><FontAwesome5 name='qrcode' size={30} color='#17a8fc' /></QrIcon> :
                            undefined
                    }
                </BottomContainer>
            </MainView >
        )
    }
}

const styles = StyleSheet.create({
    marker: {
        width: 90,
        height: 50,
    }
})