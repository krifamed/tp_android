import React from 'react';
import {Text, YellowBox} from 'react-native';
import { Root } from 'native-base';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/components/Login';
import Cases from './src/components/Cases';
import CaseForm from './src/components/CaseForm';
import AsyncStorage from '@react-native-community/async-storage';


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

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      token : null
    }
  }
  async componentDidMount(){
    const tokenStorage = await AsyncStorage.getItem("token");
    const token = await JSON.parse(tokenStorage);
    this.setState({token})
    console.log("token", token);
  }
  render(){
    let token = this.state.token;
    YellowBox.ignoreWarnings([
      'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
    ])
    return(
      <Root>
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
            {token===null&&<Stack.Screen name="Login" component={LoginScreen}/>}
            <Stack.Screen name="Drawer" component={DrawerStack}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    )
  }
};



export default App;
