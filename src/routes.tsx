import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InitPage from './pages/InitPage/index'
import PlaceDetail from './pages/PlaceDetail/index'
import PlacesList from './pages/PlacesList/index'
import RegisterPage from './pages/RegisterPage/index'
import UserDetail from './pages/UserDetail/index'
import QrScannerPage from './pages/QrScannerPage/index'
import QrViewPage from './pages/QrViewPage/index'


export const Routes = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="InitPage" component={InitPage} />
                <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
                <Stack.Screen name="PlacesList" component={PlacesList} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} />
                <Stack.Screen name="UserDetail" component={UserDetail} />
                <Stack.Screen name="QrScannerPage" component={QrScannerPage} />
                <Stack.Screen name="QrViewPage" component={QrViewPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
