import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { Item, Icon, ListItem, Left, Right } from 'native-base'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppStyles } from '../../AppStyles';

class DateTimeComp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data : props.data,
            show: false,
            mode: 'date',
            date: new Date(Date.now())
        }
    }
    componentDidMount(){
        if(this.state.data.variable.includes("heure")){
            this.setState({
                mode: 'time',
                date: new Date()
            })
        }
    }
    changeDateTime = ()=>{
        console.log("variable : ", this.state.data.variable)
        console.log(this.state.date, this.state.mode);
        this.setState({show:true});
    }

    render(){
        const {data, date, mode, show} = this.state;
        return(
            <View>
                <ListItem>
                    <Left>
                        <Text>{data.label}</Text>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={this.changeDateTime.bind(this)}>
                            <Icon style={{color:AppStyles.color.tint}} name={this.state.mode==="date"?"calendar": "time"}/>
                        </TouchableOpacity>
                    </Right>
                </ListItem>
                {show && (<DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={mode==="date"}
                    display="spinner"
                    onChange={()=>this.setState({show:false})}
                />)}
            </View>
        );
    }
}

export default DateTimeComp;