import React from 'react';
import {View } from 'react-native';
import {Picker, Label} from 'native-base';
class DropDownField extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: props.data
        }
    }
    render(){
        let {data} = this.state; 
        return(
            <View>
                <Picker mode="dropdown" placeholder={data.label}>
                    <Picker.Item style={{color: "grey"}} label={data.label} enable={false} value={null}/>
                    {data.options.map((pickerItem, key)=>
                        <Picker.Item key={key} label={pickerItem.label} value={pickerItem.value}/>
                    )}
                </Picker>
            </View>
        )
    }
}
export default DropDownField;
