import React from 'react';
import {View } from 'react-native';
import {Picker, Label} from 'native-base';
class DropDownField extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: props.data,
            selectedValue: props.data.defaultValue
        }
        this.changeData = props.changeData;
    }

    async handleChange(itemValue, itemIndex){
        let {data} = this.state;
        console.log(itemValue,this.changeData);
        await this.setState({selectedValue: itemValue});
        let obj = {
            [data.variable] : this.state.selectedValue
          }
          this.changeData(obj);
    }
    render(){
        let {data, selectedValue} = this.state; 
        return(
                <Picker
                    mode="dropdown"
                    placeholder={data.label}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex)=>this.handleChange(itemValue, itemIndex)}
                >
                    <Picker.Item style={{color: "grey"}} label={data.label} enabled={false} value={null}/>
                    {data.options.map((pickerItem, key)=>
                        <Picker.Item key={key} label={pickerItem.label} value={pickerItem.value}/>
                    )}
                </Picker>
        )
    }
}
export default DropDownField;
