import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { getDeck } from '../utils/api'
import { white, gray, black } from '../utils/colors'
import TextButton from '../components/TextButton'
import SharedStyles from '../styles/sharedStyles'
import { saveDeckTitle } from '../utils/api'


export default class NewDeckForm extends Component{
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    addNewDeck = () => {
        let title = this.state.text;
        if(title){
            saveDeckTitle(title)
                .then(newKey => {
                    this.props.navigation.navigate('DeckDetails', { id: newKey });
                });
        }
    }

    render(){
        return (
        <View style={SharedStyles.container}>
            <Text>New Deck Title</Text>
            <TextInput
                autoFocus
                returnKeyType='done'
                placeholder='Enter title...'
                style={{height: 40, borderColor: 'gray',borderRadius:5, borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}

                value={this.state.text}
            />
            <TextButton style={SharedStyles.darkButton} onPress={this.addNewDeck}>
                Submit
            </TextButton>
        </View>)
    }
}