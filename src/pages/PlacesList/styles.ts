import styled from 'styled-components/native'

interface IconProps {
    size: number
}

interface TextProps {
    size: number
}

export const Wrapper = styled.View`
    display: flex;
    height: 100%;
    flex-direction: column;
    background-color: #293241;
    align-items: center;
`

export const PageContanier = styled.View`
    width: 95%;
    margin-bottom: 16px;
    height: 160px;
    background-color: #21409a;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    justify-content: space-evenly;
`

export const PageText = styled.Text`
    margin-left: 8px;
    margin-right: 8px;
    color: white;
    font-size: 32px;
    text-align: center;
`

export const MoneyContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

export const MoneyText = styled.Text<TextProps>`
    color: white;
    font-size: ${props => props.size}px;
`

export const Places = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        alignItems: 'center',
        jusifyContent: 'space-arround',
        overflow: 'hidden'
    },
}))`
    margin-top: 8px;
    margin-bottom: 16px;
    border-radius: 15px;
    width: 85%;
    height: 60%;
    background-color: white;
`

export const Place = styled.TouchableOpacity`
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: #21409a;
    border-radius: 15px;
    width: 80%;
    height: 132px;
    display: flex;
    justify-content: space-around;
`
export const PlaceName = styled.Text`
    color: white;
    font-size: 32px;
    margin-top: 8px;
    margin-left: 16px;
`

export const PlaceBottomContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const PlaceIconsContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-left: 8px;
    width: 80px;
`

export const PlaceContact = styled.Text`
    color: white;
    margin-bottom: 8px;
    margin-right: 8px;
`

export const PlaceRegion = styled.Text`
    color: white;
    margin-left: 53%;
    margin-right: 8px;
`

export const PlaceShortDescription = styled.Text`
    color: #dee2e6;
    margin-left: 16px;
    font-size: 16px;
    margin-top: 8px;
`

export const SideBar = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 80px;
    background-color: #21409a;
    margin-top: 8px;
    bottom: 0;
    left: 0;
    right: 0;
`

export const IconView = styled.TouchableOpacity<IconProps>`
    background-color: white;
    border-radius: 100px;
    width: ${props => props.size ? props.size : 40}px;
    height: ${props => props.size ? props.size : 40}px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`
