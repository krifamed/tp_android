import React from 'react';
import {StyleSheet, View , Text, TextInput} from 'react-native';

import {AppStyles} from '../../AppStyles';

class TextField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
    }
    render(){
        let {data} = this.state; 
        return(
            <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder={data.label}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"

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
      height: 42,
      paddingLeft: 20,
      paddingRight: 20,
      color: AppStyles.color.text
    },
  
  });

export default TextField;