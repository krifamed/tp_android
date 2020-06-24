import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Button } from 'native-base';
import { TextField, TextAreaField, GridField, RadioField, DateTimeComp, DropDownField } from './fields';

import {AppStyles} from '../AppStyles';

class FormField extends React.Component{
    constructor(props){
        super(props);
        this.changeData = props.onChangeData;
        this.submitForm = props.submitForm;
        this.cancelSubmit = props.cancelSubmit;
        this.state={
            fieldData: props.fieldData,
        }
    }

    render(){
        let {fieldData} = this.state;
        if(fieldData.type){
            switch(fieldData.type){
                //Title field
                case "title": return (
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>{fieldData.label}</Text>
                    </View>
                );
                case "text": return (
                    <View style={styles.wrapper}>
                        <TextField changeData={this.changeData} data={fieldData}/>
                    </View>
                );
                case "textarea": return (
                    <View style={styles.wrapper}>
                        <TextAreaField changeData={this.changeData} data={fieldData}/>
                    </View>
                );
                    
                case "radio" : return (
                    <View style={styles.wrapper}>
                        <RadioField changeData={this.changeData} data={fieldData}/>
                    </View>
                );
                case "grid": return (
                    <View style={styles.wrapper}>
                        <GridField changeData={this.changeData} data={fieldData}/>
                    </View>
                );
    
                // Picker
                case "dropdown": return (
                        <DropDownField changeData={this.changeData} data={fieldData}/>
                );
                
                case "button":
                case "submit" : return (
                    <View style={styles.wrapper}>
                        <Button
                        style={[styles.loginContainer, fieldData.name.includes('cancel')&&{backgroundColor: "red"}]}
                        onPress={()=>{
                            if(fieldData.name.includes('cancel'))
                                this.cancelSubmit();
                            else
                                this.submitForm()
                            }
                        }
                        >
                            <Text style={styles.loginText}>{fieldData.name.includes("submit")?"submit":fieldData.name.includes("cancel")?"cancel":fieldData.name}</Text>
                        </Button>
                    </View>
                );
                case "datetime": return (
                <DateTimeComp changeData={this.changeData} data ={fieldData} />)
                default: return null;
            }
        }else{
            console.log(fieldData);
            return null
        }

    }
}

export default FormField;

const styles = StyleSheet.create({
    wrapper:{ 
        width: Dimensions.get('window').width,
        alignItems: "center"
    },
    title:{
        paddingTop: 10,
        paddingBottom:10,
        fontSize:20,
        fontWeight: 'bold',
        width: Dimensions.get('window').width  
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
      }
});