import React, { Component } from 'react'
import { Props } from '../../types'
import {
    MainView
} from './styles'

export default class PlaceDetail extends Component<Props> {
    placeDetail = this.props.route.params.placeDetail
    render() {
        console.log(this.placeDetail)
        return (
            <MainView>
            </MainView>
        )
    }
}