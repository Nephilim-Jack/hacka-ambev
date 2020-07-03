import React, { Component } from 'react'
import { Picker, Alert } from 'react-native'
import { Props } from '../../types'
import { IBGEApi, HackaApi } from '../../services/api'
import {
    MainView, PickerStyled,
    PickerView, PickerTextHelp,
    DataInputs, DataContainer,
    ButtonsContainer, ButtomText,
    OkButtom, CancelButtom,
    Banner
} from './styles'

interface Uf {
    nome: string
    sigla: string
}
interface StateProps {
    ufs: Uf[],
    cities: string[]
    selectedCity: string,
    selectedUf: string,
    name: string,
    username: string,
    password: string
}

export default class RegisterPage extends Component<Props, StateProps> {
    hackApi = new HackaApi
    ibgeApi = new IBGEApi

    state = {
        ufs: [{ nome: '', sigla: '' }],
        cities: [''],
        selectedCity: '',
        selectedUf: '',
        name: '',
        username: '',
        password: ''
    }
    async componentDidMount() {
        const ufs = await this.ibgeApi.getUfs()
        ufs.sort(function (a, b) {
            var nameA = a.nome.toLowerCase(), nameB = b.nome.toLowerCase()
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        })
        this.setState({ ufs: ufs })

    }

    async getCities(uf: string) {
        const cities = await this.ibgeApi.getCities(uf)
        cities.sort(function (a, b) {
            var nameA = a.toLowerCase(), nameB = b.toLowerCase()
            if (nameA < nameB)
                return -1
            if (nameA > nameB)
                return 1
            return 0
        })
        this.setState({ cities: cities })
        this.setState({ selectedUf: uf })
    }

    handleCreateUser = () => {
        const data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            uf: this.state.selectedUf,
            city: this.state.selectedCity,
            image: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=50'
        }
        this.hackApi.createUser(data)
        Alert.alert(
            'Cadastro',
            'Usuário criado com succeso, clique em ok para voltar e logar com seu usuário!',
            [
                {
                    text: "Ok",
                    style: "cancel"
                }
            ]
        )
        this.props.navigation.navigate('InitPage')
    }
    handleCancel = () => {
        this.props.navigation.navigate('InitPage')
    }

    render() {
        return (
            <MainView>
                <Banner>
                    <PickerTextHelp
                        style={
                            {
                                fontSize: 32,
                                marginTop: 32
                            }
                        }
                    >
                        Cadastro de Usuário
                </PickerTextHelp>
                </Banner>

                <PickerTextHelp style={{ marginTop: '5%' }}>Selecione seu Estado</PickerTextHelp>
                <PickerView>
                    <PickerStyled
                        itemStyle={{ textAlign: 'center' }}
                        selectedValue={this.state.selectedUf}
                        onValueChange={(itemValue) => { this.getCities(itemValue) }}
                    >
                        {this.state.ufs.map((uf, index) => {
                            return (<Picker.Item label={uf.nome} value={uf.sigla} key={index} />)
                        })}
                    </PickerStyled>
                </PickerView>

                <PickerTextHelp>Selecione sua Cidade</PickerTextHelp>
                <PickerView>
                    <PickerStyled
                        itemStyle={{ textAlign: 'center' }}
                        selectedValue={this.state.selectedCity}
                        onValueChange={(itemValue) => { this.setState({ selectedCity: itemValue }) }}
                    >
                        {this.state.cities.map((cities, index) => {
                            return (<Picker.Item label={cities} value={cities} key={index} />)
                        })}
                    </PickerStyled>
                </PickerView>

                <DataContainer>
                    <PickerTextHelp style={{ bottom: -16 }}>Seus Dados</PickerTextHelp>
                    <DataInputs placeholder='Nome' onChangeText={text => { this.setState({ name: text }) }} />
                    <DataInputs placeholder='Nome de Usuário' onChangeText={text => { this.setState({ username: text }) }} />
                    <DataInputs secureTextEntry placeholder='Senha' onChangeText={text => { this.setState({ password: text }) }} />
                </DataContainer>

                <ButtonsContainer>
                    <CancelButtom onPress={this.handleCancel}>
                        <ButtomText>Cancelar</ButtomText>
                    </CancelButtom>

                    <OkButtom onPress={this.handleCreateUser}>
                        <ButtomText>Cadastrar</ButtomText>
                    </OkButtom>
                </ButtonsContainer>
            </MainView>
        )
    }
}