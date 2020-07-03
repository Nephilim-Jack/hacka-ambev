import styled from 'styled-components/native'

export const MainView = styled.View`
    display: flex;
    align-items: center;
    background-color: #293241;
    width: 100%;
    height: 100%;
`

export const Banner = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color: #21409a;
    width: 90%;
    height: 240px;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
`

export const PresentationContainer = styled.View`
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const UserNameText = styled.Text`
    color: white;
    font-size: 32px;
`

export const UserSlugText = styled.Text`
    color: white;
    font-size: 24px;
`

export const UserCityText = styled.Text`
    margin-top: 10%;
    color: white;
    font-size: 24px;
`

export const ImageView = styled.View`
    bottom: -30%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 75px;
    width: 150px;
    height: 150px;
    background-color: white;
    overflow: hidden;
    padding: 4px;
`

export const UserImage = styled.Image`
    width: 145px;
    height: 145px;
    border-radius: 75px;
`

export const MoneyContainer = styled.View`
    margin-top: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90%;
`
export const MoneyWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ExplainText = styled.Text`
    color: white;
    font-size: 40px;
    margin-top: 32px;
`

export const UserBalanceText = styled.Text`
    color: white;
    font-size: 24px;
`

export const AmbevPointsText = styled.Text`
    color: white;
    font-size: 24px;
`

export const BackContainer = styled.View`
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const BackButtom = styled.TouchableOpacity`
    border-radius: 40px;
    width: 80px;
    height: 80px;
    background-color: #ef476f;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const BackText = styled.Text`
    color: white;
    font-size: 24px;
`
