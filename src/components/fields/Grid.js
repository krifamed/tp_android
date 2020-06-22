import React from 'react';
import {View , Text} from 'react-native';
import TextField from './TextField'

class GridField extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
        console.log("inside the grid component");
        console.log(this.state.data);
    }
    render(){
        let {data} = this.state; 
        return(
            <View>
                <Text>{data.name}</Text>
                {
                    data.columns.map(item=>{
                        switch(item.type){
                            case "text": return (<TextField data={item}/>)
                            default : return null
                        }
                    })
                }
            </View>
        ) 
    }
}

export default GridField;