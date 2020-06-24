import React from 'react';
import {StyleSheet, View , Text} from 'react-native';
import TextField from './TextField'

class GridField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
        this.changeData=props.changeData;
    }
    render(){
        let {data} = this.state; 
        return(
            <View style={{width: "100%", alignItems: "center"}}>
                <Text style={styles.subtitle}>{data.name}</Text>
                {
                    data.columns.map((item, key)=>{
                        switch(item.type){
                            case "text": return (<TextField changeData={this.changeData} key={key} data={item}/>)
                            default : return null
                        }
                    })
                }
            </View>
        ) 
    }
}
const styles=StyleSheet.create({
    subtitle:{
        paddingTop: 10,
        paddingBottom:10,
        fontSize:16,
        color: "grey",
        fontWeight: 'bold',
        // width: Dimensions.get('window').width  
    },
});

export default GridField;