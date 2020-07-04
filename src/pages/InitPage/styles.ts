import styled from 'styled-components/native'

export const Logo = styled.View`
    top: 10%;
    width: 320px;
    height: 320px;
`

export const Background = styled.ImageBackground`
    width: 100%;
    height: 100%;
    align-items: center;
`
export const Container = styled.View`
    top: 20%;
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

export const WhoAreYouContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 380px;
`

export const WhoButtom = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    border-radius: 12px;
    height: 48px;
    background-color: #06d6a0;
    width: 176px;
`

export const WhoText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
`
