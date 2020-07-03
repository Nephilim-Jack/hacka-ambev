import React, { Component } from 'react'
import { Clipboard, ToastAndroid } from 'react-native'
import { HackaApi, getPlaceResponse } from '../../services/api'
import { Props } from '../../types'
import { FontAwesome5 } from '@expo/vector-icons'
import {
    IconView, PageContanier,
    PageText, Places,
    Place, SideBar,
    Wrapper, MoneyText,
    MoneyContainer,
    PlaceContact, PlaceIconsContainer,
    PlaceName, PlaceRegion,
    PlaceShortDescription,
    PlaceBottomContainer
} from './styles'

interface PlacesLoaded {
    places: getPlaceResponse[]
}

export default class PlacesList extends Component<Props, PlacesLoaded> {
    api = new HackaApi
    userDetail = {}

    state = {
        places: [
            {
                pk: 0,
                name: '',
                lat: 0,
                lng: 0,
                placeUf: '',
                placeCity: '',
                contact: '',
                description: '',
                hasMusic: false,
                hasKidSpace: false,
                hasWifi: false,
                hasAccessibility: false,
                drinks: [{
                    pk: 0,
                    drinkName: '',
                    realQuantity: 0,
                    digitalQuantity: 0,
                    imageUrl: ''
                }]
            }
        ]
    }
    showUserDetail = () => {
        this.props.navigation.navigate('UserDetail', { userDetail: this.userDetail })
    }

    async componentDidMount() {
        this.userDetail = this.props.route.params.userDetail
        const places = await this.api.getPlaces()
        this.setState({ places: places })

    }

    setClipBoard = (contact: string) => {
        Clipboard.setString(contact)
        ToastAndroid.showWithGravity('Contato Copiado!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    showPlaceDetail = (place: getPlaceResponse) => {
        this.props.navigation.navigate('PlaceDetail', { placeDetail: place })
    }

    render() {
        return (
            <Wrapper>
                <PageContanier>
                    <PageText>Bares na sua Região</PageText>
                </PageContanier>

                <Places>
                    {this.state.places.map(place => {
                        return (
                            <Place key={place.pk} onPress={e => this.showPlaceDetail(place)}>
                                <PlaceName>{place.name}</PlaceName>
                                <PlaceShortDescription>{place.description.slice(0, 18)}...</PlaceShortDescription>
                                <PlaceRegion>{place.placeCity}/{place.placeUf}</PlaceRegion>
                                <PlaceBottomContainer>

                                    <PlaceIconsContainer>
                                        <FontAwesome5 name='music' size={16} color={place.hasMusic ? '#06d6a0' : '#ef476f'} />
                                        <FontAwesome5 name='child' size={16} color={place.hasKidSpace ? '#06d6a0' : '#ef476f'} />
                                        <FontAwesome5 name='wifi' size={16} color={place.hasWifi ? '#06d6a0' : '#ef476f'} />
                                        <FontAwesome5 name='accessible-icon' size={16} color={place.hasAccessibility ? '#06d6a0' : '#ef476f'} />
                                    </PlaceIconsContainer>
                                    <PlaceContact onPress={e => this.setClipBoard(place.contact)}>
                                        <FontAwesome5 name='clipboard' size={16} color='white' />
                                        {' '}{place.contact}
                                    </PlaceContact>

                                </PlaceBottomContainer>
                            </Place>
                        )
                    })}
                </Places>

                <SideBar>

                    <IconView style={{ backgroundColor: '#21409a' }} size={48}>
                        <FontAwesome5 name='angle-left' size={32} color='#293241' />
                    </IconView>

                    <IconView size={48}>
                        <FontAwesome5 name='star' size={32} color='#293241' />
                    </IconView>

                    <IconView size={56} onPress={this.showUserDetail}>
                        <FontAwesome5 name='user' size={40} color='#293241' />
                    </IconView>

                    <IconView size={48}>
                        <FontAwesome5 name='users' size={32} color='#293241' />
                    </IconView>

                    <IconView style={{ backgroundColor: '#21409a' }} size={48}>
                        <FontAwesome5 name='angle-right' size={32} color='#293241' />
                    </IconView>

                </SideBar>
            </Wrapper>
        )
    }
}