import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { Props } from '../../types'
import { MainView, QrText, QrView, QrTextView } from './styles'

export default class QrViewPage extends Component<Props> {
    state = {
        token: this.props.route.params.token
    }
    render() {
        return (
            <MainView>
                <QrView>
                    <QRCode value={this.state.token} size={300} />
                </QrView>
                <QrTextView>
                    <QrText>Mostre o Código no bar para pegar sua bebida!</QrText>
                </QrTextView>
            </MainView>
        )
    }
}