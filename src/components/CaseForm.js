import React, {useState} from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, TextInput, ScrollView } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Label, Item, Picker } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppStyles } from "../AppStyles";

import FormField from './FormField';


// function FormField({fieldData}){
//     const [show, setShow] = useState(false);
//     if(fieldData.type){
//         switch(fieldData.type){
//             //Title field
//             case "title": return (<Text>{fieldData.label}</Text>);
//             case "text": return (<TextField data={fieldData}/>);

//             case "radio" : return (<RadioField data={fieldData}/>);
//             case "grid": return (<GridField data={fieldData}/>);

//             // Picker
//             case "dropdown": return (<DropDownField data={fieldData}/>);
//             case "button" : return (<Button style={{justifyContent: "center"}} success><Text>{fieldData.name}</Text></Button>);
//             case "submit" : return (<Button style={{justifyContent: "center"}} success><Text>{fieldData.name}</Text></Button>);
//             case "datetime": return (<DateTimeComp data ={fieldData} />)
//             default: return null;
//         }
//     }else{
//         console.log(fieldData);
//         return null
//     }
// }


class CaseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            case_items: props.route.params.item,
            formData: [],
            token : "",
            dyna_uid: ""
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
      console.log("hello world", text);

    }

    render(){
        let {formData} = this.state
        return (
            <ScrollView>
                {
                    formData.map((field, key)=>
                    <FormField onChangeData={this.onChangeData.bind(this)} key={key} fieldData={field}/>   
                    )
                }
           </ScrollView>
        )
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

export default CaseForm;