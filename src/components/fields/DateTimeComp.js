import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { Item, Icon, ListItem, Left, Right, Body } from 'native-base'; 
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
        this.changeData = props.changeData;
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

    formatDateTime = (mode, date)=>{
        if(mode === "date")
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        // else return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        else return `${date.getHours()}:${date.getMinutes()}`;
    }

    handleChange = (event, selectedDate)=>{
        let {mode, data} = this.state;
        this.setState({show:false});
        console.log(this.formatDateTime(mode, selectedDate));
        this.setState({date: selectedDate});
        let obj = {
            [data.variable] : this.formatDateTime(mode,selectedDate)
          }
          this.changeData(obj);
    }

    render(){
        const {data, date, mode, show} = this.state;
        return(
            <View>
                <ListItem>
                    <Left>
                        <Text>{data.label}</Text>
                    </Left>
                    <Body>
                        <Text>{this.formatDateTime(mode, date)}</Text>
                    </Body>
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
                    display="default"
                    onChange={this.handleChange}
                />)}
            </View>
        );
    }
}

export default DateTimeComp;