import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    InitPage: undefined;
    RegisterPage: undefined;
    PlacesList: { userDetail: object };
    PlaceDetail: { placeDetail: object };
    UserDetail: { userDetail: object };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'UserDetail'
>;

export type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};