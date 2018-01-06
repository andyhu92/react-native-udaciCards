import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { getDeck } from '../utils/api'
import { white, gray, black } from '../utils/colors'
import TextButton from '../components/TextButton'
import SharedStyles from '../styles/sharedStyles'
import { addCardToDeck } from '../utils/api'


export default class NewCardForm extends Component{
    constructor(props) {
        super(props);
        this.state = { question: '',answer:'' };
    }

    componentDidMount(){
        this.id = this.props.navigation.state.params.id;
    }

    addNewCard = () => {
        let { question,answer } = this.state;
        if(!question) return alert("Please enter question");
        if(!answer) {
            return alert("Please enter answer");
        }
        let card = { question, answer };
        addCardToDeck(this.id, card)
            .then(res => {
                return this.props.navigation.navigate("DeckDetails",{id:this.id});
            });
    }

    render(){
        return (
        <View style={SharedStyles.container}>

            <Text>Qustions</Text>
            <TextInput
                autoFocus
                returnKeyType='done'
                style={{height: 40, borderColor: 'gray',borderRadius:5, borderWidth: 1,marginBottom:20}}
                onChangeText={(question) => this.setState({question})}

                value={this.state.question}
            />

            <Text>Answer</Text>
            <TextInput
                returnKeyType='done'
                style={{height: 40, borderColor: 'gray',borderRadius:5, borderWidth: 1}}
                onChangeText={(answer) => this.setState({answer})}

                value={this.state.answer}
            />
            <TextButton style={SharedStyles.darkButton} onPress={this.addNewCard}>
                Submit
            </TextButton>
        </View>)
    }
}