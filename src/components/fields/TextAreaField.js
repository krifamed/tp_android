import React from 'react';
import {StyleSheet, View , Text, TextInput} from 'react-native';

import {AppStyles} from '../../AppStyles';

class TextAreaField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : props.data,
            text: ''
        }
        this.changeData = props.changeData;
    }

    handleChange(text){
      this.setState({text});
      let {data} = this.state;
      let obj = {
        [data.id] : text
      }
      this.changeData(obj);
    }
    render(){
        let {data} = this.state; 
        return(
            <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              multiline={true}
              numberOfLines = {5}
              placeholder={data.label}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
              onChangeText={(text)=> this.handleChange(text)}
              // onBlur={(text)=> console.log("blur", text)}
              value={this.state.text}
            />
          </View>
        ) 
    }
}

const styles = StyleSheet.create({
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 30,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main
    },
    body: {
    //   height: 42,
      paddingLeft: 20,
      paddingRight: 20,
      color: AppStyles.color.text
    },
  
  });

export default TextAreaField;