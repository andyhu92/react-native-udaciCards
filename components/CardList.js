import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { getDeck } from '../utils/api'
import { black, gray, white} from '../utils/colors'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import TextButton from './TextButton'
import SharedStyles from '../styles/sharedStyles'

export default class CardList extends Component{
    static navigationOptions = ({navigation, props}) => {
        return {
        headerRight: <TextButton style={{color:white,marginRight:10}} onPress={() => navigation.navigate('NewCardForm',{id:navigation.state.params.id})} >
            　<FontAwesome name="plus"/> New Card
        </TextButton>
        }
    };

    constructor(props){
        super(props);
        this.state = {
            cards:[]
        }
    }

    componentDidMount(){
        let { id } = this.props.navigation.state.params;
        getDeck(id)
            .then(deck => this.setState({
                cards: deck.questions
            }))
    }
    render(){
        let { cards } = this.state;
        return (
            <ScrollView>
               {cards.map(card => {
                return (
                <View style={styles.card} key={card.answer}>
                    <Text style={styles.QA}>Q: {card.question}</Text>
                    <Text style={styles.QA}>A: {card.answer}</Text>
                </View>
               );
            })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    card: {
      flex:1,
      alignItems:'flex-start',
      padding:40,
      justifyContent:'center',
      borderStyle:'solid',
      borderBottomWidth:1,
      borderBottomColor:black
    },
    QA:{
        fontSize:16,
    }
  })