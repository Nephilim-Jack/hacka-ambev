import axios from 'axios'
import { useReducer } from 'react'

interface IBGEUFsResponse {
    name: string
}

interface IBGECitiesResponse {
    name: string
}

interface createUserRequest {
    name: string,
    username: string,
    password: string,
    uf: string,
    city: string,
    image: string
}

interface loginUserRequest {
    username: string,
    password: string
}

interface loginUserResponse {
    pk: number,
    name: string,
    username: string,
    userUf: string,
    userCity: string,
    userImage: string,
    accountBalance: number,
    ambevPoints: number
}

interface createPlaceRequest {
    name: string,
    lat: number,
    lng: number,
    uf: string,
    city: string,
    contact: string,
    desc: string,
    music: boolean,
    kidSpace: boolean,
    wifi: boolean,
    access: boolean
}

interface getPlaceResponse {
    pk: number,
    name: string,
    lat: number,
    lng: number,
    placeUf: string,
    placeCity: string,
    contact: string,
    description: string,
    hasMusic: boolean,
    hasKidSpace: boolean,
    hasWifi: boolean,
    hasAccessibility: boolean,
    drinks: {
        pk: number,
        drinkName: string,
        realQuantity: number,
        digitalQuantity: number,
        imageUrl: string
    }[]
}

interface Drink {
    drinkPk: number,
    quantity: number

}

interface buyDrinkRequest {
    userPk: number,
    drinks: Drink[]
}

interface createGroupRequest {
    name: string,
    users: number[]
}

interface addRemGroupRequest {
    groupPk: number,
    users: number[]
}

interface groupUsersResponse {
    pk: number,
    username: string,
    imageUrl: string
}

export class IBGEApi {
    getUfs = async () => {
        const response = await axios.get<IBGEUFsResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
        const ufInitials = response.data.map(uf => uf.name)
        return ufInitials
    }

    getCities = async (uf: string) => {
        return axios.get<IBGECitiesResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
            const citiesNames = response.data.map(city => city.name)
            return citiesNames
        })
    }
}

export class HackaApi {
    api = axios.create({
        baseURL: 'https://hack-ambev-api.herokuapp.com/api'
    })

    createUser = async (data: createUserRequest) => {
        return this.api.post('user', {
            name: data.name,
            username: data.username,
            password: data.password,
            uf: data.uf,
            city: data.city,
            image: data.image
        }).then(response => {
            return response.status
        })
    }

    loginUser = async (data: loginUserRequest) => {
        return this.api.get<loginUserResponse>('user', {
            headers: {
                'username': data.username,
                'password': data.password,
                'mode': 'login'
            }
        }).then(response => {
            return {
                pk: response.data.pk,
                name: response.data.name,
                username: response.data.username,
                userUf: response.data.userUf,
                userCity: response.data.userCity,
                userImage: response.data.userImage,
                accountBalance: response.data.accountBalance,
                ambevPoints: response.data.ambevPoints,
            }
        })
    }

    createPlace = async (data: createPlaceRequest) => {
        return this.api.post('place', {
            name: data.name,
            lat: data.lat,
            lng: data.lng,
            uf: data.uf,
            city: data.city,
            contact: data.contact,
            desc: data.desc,
            music: data.music,
            kidSpace: data.kidSpace,
            wifi: data.wifi,
            access: data.access
        }).then(response => {
            return response.status
        })
    }

    getPlaces = async (placeId = 0) => {
        if (placeId === 0) {
            return this.api.get<getPlaceResponse[]>('place').then(response => {
                return response.data.map(place => {
                    return {
                        pk: place.pk,
                        name: place.name,
                        lat: place.lat,
                        lng: place.lng,
                        placeUf: place.placeUf,
                        placeCity: place.placeCity,
                        contact: place.contact,
                        description: place.description,
                        hasMusic: place.hasMusic,
                        hasKidSpace: place.hasKidSpace,
                        hasWifi: place.hasWifi,
                        hasAccessibility: place.hasAccessibility,
                        drinks: place.drinks
                    }
                })
            })
        } else {
            return this.api.get<getPlaceResponse>(`place/${placeId}`).then(response => {
                return {
                    pk: response.data.pk,
                    name: response.data.name,
                    lat: response.data.lat,
                    lng: response.data.lng,
                    placeUf: response.data.placeUf,
                    placeCity: response.data.placeCity,
                    contact: response.data.contact,
                    description: response.data.description,
                    hasMusic: response.data.hasMusic,
                    hasKidSpace: response.data.hasKidSpace,
                    hasWifi: response.data.hasWifi,
                    hasAccessibility: response.data.hasAccessibility,
                    drinks: response.data.drinks
                }
            })
        }
    }

    buyDrinks = async (data: buyDrinkRequest) => {
        return this.api.get('drinks', {
            headers: {
                'drinks': JSON.stringify(data.drinks),
                'userPk': data.userPk
            }
        }).then(response => {
            return response.data
        })
    }

    createGroup = async (data: createGroupRequest) => {
        return this.api.post('group', {
            mode: 'create',
            name: data.name,
            users: data.users
        }).then(response => {
            return response.status
        })
    }

    addUserToGroup = async (data: addRemGroupRequest) => {
        return this.api.post('group', {
            mode: 'add',
            groupPk: data.groupPk,
            users: data.users
        }).then(response => {
            return response.status
        })
    }

    removeUserFromGroup = async (data: addRemGroupRequest) => {
        return this.api.delete('group', {
            headers: {
                'groupPk': data.groupPk,
                'users': JSON.stringify(data.users)
            }
        }).then(response => {
            return response.status
        })
    }

    listGroupUsers = async (groupId = 0) => {
        return this.api.get<groupUsersResponse[]>(`group/${groupId}`).then(response => {
            return response.data.map(user => {
                return {
                    userPk: user.pk,
                    username: user.username,
                    imageUrl: user.imageUrl
                }
            })
        })
    }

    validateToken = async (token: string) => {
        return this.api.get('trans', {
            headers: { 'token': token }
        }).then(response => {
            return response.status
        })
    }
}