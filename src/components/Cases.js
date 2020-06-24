import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from './Spinner';


function Item({item, onSelect}){
    return (
        <TouchableOpacity onPress={()=>onSelect(item)}>
            <Card>
                <CardItem>
                    <Right>
                        <Text>{item.pro_title}</Text>
                    </Right>
                    <Left style={{flexDirection:"row-reverse"}}>
                        <Icon name="add"/>
                    </Left>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

class Cases extends React.Component{
    constructor(){
        super();
        this.state = {
            cases : [],
            token : "",
        }
    }
    async componentDidMount(){
        const tokenStorage = await AsyncStorage.getItem("token")
        const token = JSON.parse(tokenStorage);
        this.setState({token})
        const req = await fetch('http://process.isiforge.tn/api/1.0/isi/case/start-cases', {
            headers: {
                'Authorization' : `Bearer ${this.state.token}`
            }
        });
        const res = await req.json();
        if(res){
            this.setState({cases: res});

        }
        console.log(this.state.cases);
    }

     onSelect = (item)=>{
        console.log("test")
        this.props.navigation.navigate("CaseForm", {item});
    }

    render(){
        return (
            this.state.cases.length>0?
            <SafeAreaView>
                <FlatList
                    data={this.state.cases}
                    renderItem={({item})=><Item 
                    item={item}
                    onSelect={this.onSelect}
                    />}
                    keyExtractor={(item) => item.tas_uid}
                />
            </SafeAreaView>
            : <Spinner/>
                
        )
    }
}

export default Cases;