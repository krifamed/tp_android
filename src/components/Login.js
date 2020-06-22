import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'native-base';
import { AppStyles } from "../AppStyles";


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: "",
      password: ""
    };
  }

  onPressLogin = async () =>{
      const email = this.state.email;
      const password = this.state.password;
      console.log(email, password);
     const req = await fetch("http://process.isiforge.tn/isi/oauth2/token", {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
             username: email,
             password,
             scope: "*",
             grant_type: "password",
             client_id :  "WMZNSSETCJDPTZSVETRNOPGYFKMAKHHQ",
             client_secret :  "5813427175e8e5d18452a90035077331"
         })
     });
     const res = await req.json();
     console.log(res);
     if(res)
        await AsyncStorage.setItem('token', JSON.stringify(res.access_token));
        this.props.navigation.navigate('Drawer');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Username"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button style={styles.loginContainer} onPress={()=>this.onPressLogin()}>
          <Text style={styles.loginText}>Log in</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    justifyContent: "center"
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },

});

export default LoginScreen;
