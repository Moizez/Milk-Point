import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

//Páginas
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const AuthStack = createStackNavigator()

export default function AuthRoutes() {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen
                name='SignUp'
                component={SignUp}
                options={{
                    headerStyle: {
                        backgroundColor: '#292b2c',
                        borderBottomWidth: 1,
                        borderBottomColor: '#FFF'
                    },
                    headerTintColor: '#FFF',
                    headerBackTitle: false,
                    headerTitle: 'Voltar',

                }}
            />
        </AuthStack.Navigator>

    )
}

