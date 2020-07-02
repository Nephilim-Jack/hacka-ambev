import styled from 'styled-components/native'

export const LogoName = styled.Text`
    font-size: 38px;
    font-weight: bold;
    color: white;
    top: 20%;
`

export const Background = styled.ImageBackground`
    width: 100%;
    height: 100%;
    align-items: center;
`
export const Container = styled.View`
    top: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 136px;
`
export const DataInputs = styled.TextInput`
    text-align: center;
    font-size: 18px;
    border-radius: 12px;
    background-color: white;
    height: 48px;
    width: 320px;
    color: #222;
`

export const RegisterText = styled.Text`
    text-align: right;
    color: white;
    font-size: 12px;
`

export const RegisterLink = styled(RegisterText)`
    color: #2e89ff;
    font-weight: bold;
`