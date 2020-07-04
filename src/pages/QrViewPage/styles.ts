import styled from 'styled-components/native'

export const MainView = styled.View`
    background-color: #293241;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export const QrView = styled.View`
    width: 340px;
    height: 340px;
    background-color: white;
    padding: 8px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const QrTextView = styled.View`
    margin-top: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #06d6a0;
    width: 240px;
    height: 120px;
    border-radius: 24px;
`

export const QrText = styled.Text`
    color: white;
    font-size: 24px;
    text-align: center;
`