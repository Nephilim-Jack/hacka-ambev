import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    InitPage: { who: string };
    RegisterPage: undefined;
    PlacesList: { userDetail: object };
    PlaceDetail: { placeDetail: object, userPk: number };
    UserDetail: { userDetail: object };
    QrScannerPage: undefined;
    QrViewPage: { token: string };
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