import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { Props } from '../../types'

export default class QrViewPage extends Component<Props> {
    state = {
        token: this.props.route.params.token
    }
    render() {
        return (
            <>
            </>
        )
    }
}