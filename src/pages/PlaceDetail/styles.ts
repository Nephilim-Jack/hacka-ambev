import styled from 'styled-components/native'

export const MainView = styled.View`
    background-color: #293241;
    width: 100%;
    height: 100%;
    align-items: center;
`

export const MapContainer = styled.View`
    margin-top: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 350px;
    border-bottom-left-radius: 32px;
    border-top-right-radius: 32px;
    overflow: hidden;
`

export const MarkerContainer = styled.View`
    background-color: #21409a;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
`

export const MarkerText = styled.Text`
 color: #ffffff;
 font-size: 14px;
 text-align: center;
`

export const DrinksScrollView = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        marginLeft: 12,
        alignItems: 'center',
        jusifyContent: 'space-arround',
        overflow: 'hidden'
    },
}))`
    margin-top: 32px;
    width: 85%;
    height: 80px;
    margin-bottom: 20%;
    background-color: white;
    border-radius: 24px;
`

export const DrinkView = styled.View`
    width: 112px;
    height: 112px;
    display: flex;
    align-items: center;
`

export const DrinkImage = styled.Image`
    border-radius: 12px;
    width: 56px;
    height: 56px;
`


export const DrinkAvalible = styled.Text`
    color: #222222;
    font-size: 16px;
`

export const DrinkBuyContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

export const DrinkButtom = styled.TouchableOpacity`

`

export const DrinkBuyQuantity = styled.TextInput`
    text-align: center;
`

export const DrinkName = styled.Text`
    color: #222222;
    font-size: 16px;
`

export const FinishBuy = styled.TouchableOpacity`
    width: 180px;
    height: 40px;
    background-color: #06d6a0;
    border-radius: 24px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const PlaceDesc = styled.Text`
    top: -64px;
    color: white;
    font-size: 16px;
    margin-left: 32px;
    margin-right: 32px;
    text-align: justify;
`

export const BottomContainer = styled.View`
    top: -24px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 500px;

`

export const FinishBuyText = styled.Text`
    color: white;
    font-size: 16px;
    text-align: center;
`

export const QrIcon = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
