import React from 'react';
import {Text} from 'react-native';
import {Button } from 'native-base';
import { TextField, TextAreaField, GridField, RadioField, DateTimeComp, DropDownField } from './fields';

class FormField extends React.Component{
    constructor(props){
        super(props);
        this.changeData = props.onChangeData;
        this.submitForm = props.submitForm;
        this.state={
            fieldData: props.fieldData,
        }
    }

    render(){
        let {fieldData} = this.state;
        if(fieldData.type){
            switch(fieldData.type){
                //Title field
                case "title": return (<Text>{fieldData.label}</Text>);
                case "text": return (<TextField changeData={this.changeData} data={fieldData}/>);
                case "textarea": return (<TextAreaField changeData={this.changeData} data={fieldData}/>);
    
                case "radio" : return (<RadioField changeData={this.changeData} data={fieldData}/>);
                case "grid": return (<GridField changeData={this.changeData} data={fieldData}/>);
    
                // Picker
                case "dropdown": return (<DropDownField changeData={this.changeData} data={fieldData}/>);
                case "button" : return (<Button onPress={this.submitForm} style={{justifyContent: "center"}} success><Text>{fieldData.name}</Text></Button>);
                case "submit" : return (<Button style={{justifyContent: "center"}} success><Text>{fieldData.name}</Text></Button>);
                case "datetime": return (<DateTimeComp changeData={this.changeData} data ={fieldData} />)
                default: return null;
            }
        }else{
            console.log(fieldData);
            return null
        }

    }
}

export default FormField;