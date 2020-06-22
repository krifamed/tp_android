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
    }

    changeOption = (value)=>{
        console.log(value);
        this.setState({option : value});
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