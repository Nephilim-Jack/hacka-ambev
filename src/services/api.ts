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
        this.api.get('user')
    }
}