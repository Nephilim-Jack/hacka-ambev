import axios from 'axios'

interface IBGEUFsResponse {
    name: string
}

interface IBGECitiesResponse {
    name: string
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
}