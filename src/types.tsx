import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    InitPage: undefined;
    RegisterPage: undefined;
    PlacesList: undefined;
    PlaceList: { placePk: string };
    UserDetail: { userPk: string };
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