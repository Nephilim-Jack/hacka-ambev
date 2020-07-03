import styled from 'styled-components/native'

export const MainView = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        alignItems: 'center',
        jusifyContent: 'space-between',
        overflow: 'hidden'
    },
}))`
    background-color: #293241;
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const Banner = styled.View`
    margin-top: -32px;
    background-color: #21409a;
    width: 90%;
    height: 240px; 
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`

export const PickerView = styled.View`
    margin-top: 4px;
    margin-bottom:8px;
    border-radius: 75px;
    overflow: hidden;
    width: 280px;
    height: 48px;
    background-color: white;
`
export const PickerTextHelp = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
`

export const PickerStyled = styled.Picker`
    width: 280px;
    height: 48px;
    background-color: white;
`

export const DataContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 240px;
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

export const ButtonsContainer = styled.View`
    margin-top: 48px;
    display:flex;
    flex-direction: row;
    width: 400px;
    justify-content: space-evenly;
`

export const ButtomText = styled.Text`
    color: white;
    font-size: 16px;
`

export const OkButtom = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #06d6a0;
    width: 132px;
    height: 48px;
    border-radius: 8px;
`

export const CancelButtom = styled(OkButtom)`
    background-color: #ef476f
`