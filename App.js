import React from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/components/Login';
import Cases from './src/components/Cases';
import CaseForm from './src/components/CaseForm';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CasesStack = ()=>{
  return(
    <Stack.Navigator>
    <Stack.Screen name="Cases" component={Cases} />
    <Stack.Screen name="CaseForm" component={CaseForm} />
  </Stack.Navigator>
  )
}

const Feed = ()=>{
  return <Text>Feeder</Text>
}

const Profile = ()=>{
  return <Text>Profile</Text>
}

const DrawerStack = ()=>{
  return(
    <Drawer.Navigator initialRouteName="Cases">
      <Drawer.Screen
        name="Cases"
        component={CasesStack}
        options={{ drawerLabel: 'Cases' }}
        />

      <Drawer.Screen
        name="Suivi"
        component={Profile}
        options={{ drawerLabel: 'Profile' }}
        />
    </Drawer.Navigator>

  )
}

const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          // headerStyle: {
          //   backgroundColor: '#f4511e',
          //   textAlign: "center"
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Drawer" component={DrawerStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
