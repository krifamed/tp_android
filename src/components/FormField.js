import React from 'react';
import {Text} from 'react-native';
import {Button } from 'native-base';
import { TextField, GridField, RadioField, DateTimeComp, DropDownField } from './fields';

class FormField extends React.Component{
    constructor(props){
        super(props);
        this.changeData = props.onChangeData;
        this.state={
            fieldData: props.fieldData
        }
    }
    render(){
        let {fieldData} = this.state;
        if(fieldData.type){
            switch(fieldData.type){
                //Title field
                case "title": return (<Text>{fieldData.label}</Text>);
                case "text": return (<TextField changeData={this.changeData} data={fieldData}/>);
    
                case "radio" : return (<RadioField data={fieldData}/>);
                case "grid": return (<GridField data={fieldData}/>);
    
                // Picker
                case "dropdown": return (<DropDownField data={fieldData}/>);
                case "button" : return (<Button style={{justifyContent: "center"}} success><Text>{fieldData.name}</Text></Button>);
                case "submit" : return (<Button style={{justifyContent: "center"}} success><Text>{fieldData.name}</Text></Button>);
                case "datetime": return (<DateTimeComp data ={fieldData} />)
                default: return null;
            }
        }else{
            console.log(fieldData);
            return null
        }

    }
}

export default FormField;