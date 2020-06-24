import React, {useState} from 'react';
import { Dimensions, SafeAreaView, FlatList, StyleSheet, View, TextInput, ScrollView, ToastAndroid } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Label, Item, Picker, Toast } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppStyles } from "../AppStyles";

import FormField from './FormField';
import Spinner from './Spinner';
/*
  * formData : data fields from API
  * data : data to submit to API POST /cases 
*/

class CaseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            case_items: props.route.params.item,
            formData: [],
            token : "",
            dyna_uid: "",
            data: {}
        }
    }
    async componentDidMount(){
        const {pro_uid, tas_uid} = this.state.case_items;
        // Grab the token from AsyncStorage
        const tokenStorage = await AsyncStorage.getItem("token")
        const token = JSON.parse(tokenStorage);
        this.setState({token});
        // Make request to get Dynaform uid so that we could use it to get form fields
        const req = await fetch(`http://process.isiforge.tn/api/1.0/isi/project/${pro_uid}/activity/${tas_uid}/steps`, {
            headers: {
                'Authorization' : `Bearer ${this.state.token}`
            }
        });
        const res = await req.json();
        if(res){
            this.setState({dyna_uid: res[0].step_uid_obj});
            console.log(this.state.dyna_uid);
            // Make request to get form data fields
            const formReq = await fetch(`http://process.isiforge.tn/api/1.0/isi/extrarest/dynaform/${this.state.dyna_uid}`, {
                headers: {
                    'Authorization' : `Bearer ${this.state.token}`
                }
            });
            const formData = await formReq.json();
            if(formData){
                this.setState({formData});
            }
        }
        // console.log("formdata: ");
        // console.log(this.state.formData);
    }

    onChangeData = (text)=>{
      console.log(text);
      let dataObj = {...this.state.data, ...text};
      // this.setState({data: dataObj});
      this.setState((state, props)=>({
          data : {...state.data, ...text}
      }));
      console.log("bla",this.state.data);

    }

    async submitForm(){
      console.log("submit form", this.state.data);
      const {pro_uid, tas_uid} = this.state.case_items;
      const req = await fetch("http://process.isiforge.tn/api/1.0/isi/cases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : `Bearer ${this.state.token}`
          },
        body: JSON.stringify({
            pro_uid,
            tas_uid,
            variables : this.state.data
        })
    });
    const res = await req.json();
    console.log(res);
    if(res.app_uid){
      Toast.show({
        text: 'Form submited successfuly!',
        buttonText: 'Okay',
        type: 'success',
        position: "top",
        duration : 2000
      });
      this.props.navigation.goBack();
    }else{
          Toast.show({
            text: 'Form submited successfuly!',
            buttonText: 'Okay',
            type: 'danger',
            position: "top",
            duration : 2000
          });
          this.setState({data: {}});
    }
  }

  cancelSubmit(){
    this.setState({data: {}});
  }
  
    render(){
        let {formData, data} = this.state
        return (
          this.state.formData.length>0?
            <SafeAreaView style={styles.container}>
              <ScrollView stlye={styles.formField}>
                    {
                      formData.map((field, key)=>
                      <FormField
                      style={styles.formField}
                      onChangeData={this.onChangeData.bind(this)}
                      key={key} 
                      submitForm={this.submitForm.bind(this)} 
                      cancelSubmit={this.cancelSubmit}
                      fieldData={field}/>   
                      )
                    }
              </ScrollView>
            </SafeAreaView>
            :<Spinner/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginBottom : 5
    },
    formField:{
      flex: 1,
      width: Dimensions.get('window').width,
      
    }
});

export default CaseForm;