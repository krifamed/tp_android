import React, { Component } from 'react';
import { Container, ListItem, Text, Radio, Right, Left } from 'native-base';
import {View } from 'react-native';
class RadioField extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : props.data,
            option : props.data.defaultValue
        }
        this.changeData = props.changeData;
    }

    changeOption = async (value)=>{
        console.log(value);
        await this.setState({option : value});
        let {data} = this.state;
        let obj = {
          [data.variable]: this.state.option
        }
        this.changeData(obj);
    }
    
  render() {
      const {data} = this.state;
    return (
      <View>
          <Text>{data.label}</Text>
          {data.options.map((item, key)=>
            <ListItem key={key}>
                <Left>
                    <Text>{item.value}</Text>
                </Left>
                <Right>
                    <Radio onPress={this.changeOption.bind(this,item.value)} selected={this.state.option===item.value}/>
                </Right>
            </ListItem>
          
          )
          }
      </View>
    );
  }
}

export default RadioField;