import React, { Component } from 'react'
import { StyleSheet, View, ToastAndroid, Text } from 'react-native'
import { Props } from '../../types'
import { HackaApi } from '../../services/api'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class QrScanner extends Component<Props> {
    api = new HackaApi
    state = {
        scanned: false,
        hasPermission: false,
    }


    async componentDidMount() {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        this.state.hasPermission = status === 'granted' ? true : false
    }

    handleQrScanned = async (info: any) => {
        if (info !== undefined) {
            this.setState({ scanned: true })
            const response = await this.api.validateToken(info.data)
            if (response === 200) {
                ToastAndroid.showWithGravity('Qr Code escaneado e aceito pelo sistema!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                setTimeout(() => { this.props.navigation.goBack() }, 2000)
            } else {
                ToastAndroid.showWithGravity('Não foi possível validar o Qr Code, tente novamente!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                setTimeout(() => { this.setState({ scanned: false }) }, 2000)

            }
        } else {
            ToastAndroid.showWithGravity('Falha ao ler o Qr Code, tente novamente!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }

    }

    render() {
        return (
            <View style={
                {
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#293241',
                    flex: 1,
                    alignItems: 'center'
                }
            }>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleQrScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <View
                    style={{
                        flex: 0.15,
                        width: 140,
                        height: 50,
                        backgroundColor: '#06d6a0',
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        bottom: -681
                    }}
                >
                    <Text
                        style={{ color: 'white', fontSize: 20, textAlign: 'center' }}
                    >
                        {this.state.scanned ? 'Qr Code escaneado!' : 'Aguardando Qr Code!'}
                    </Text>
                </View>
            </View>
        )
    }
}