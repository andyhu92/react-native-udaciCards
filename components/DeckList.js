import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { getDecks, initDecks } from '../utils/api'
import { black, gray, white} from '../utils/colors'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import TextButton from './TextButton'
import uuid from 'uuid/v4'
import SharedStyles from '../styles/sharedStyles'

export default class DeckList extends Component{
    static navigationOptions = ({navigation, props}) => {
        return {
        headerRight: <TextButton style={{color:white,marginRight:10}} onPress={() => navigation.navigate('NewDeckForm')} >
            　<FontAwesome name="plus"/> New Deck
        </TextButton>,
        headerLeft:<Text></Text>
        }
    };

    constructor(props){
        super(props);
        this.state = {
            decks:{}
        }
    }

    componentDidMount(){

        initDecks().then(getDecks)
            .then(res => {
                this.setState({
                    decks: res
                })
            });
    }
    render(){
        const { decks } = this.state;
        return (
            <ScrollView>
                {Object.keys(decks).sort((a,b) => decks[b].timestamp - decks[a].timestamp).map(key => {
                    let deck = decks[key];
                    return (
                    <View style={styles.deck} key={deck.title}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetails', { id: key})} >
                            <Text style={[styles.deckTitle,SharedStyles.centerText]}><Entypo name='documents' size={30} color={black} />
                                {deck.title}
                            </Text>
                            <Text style={[SharedStyles.centerText,{color:gray}]}>{deck.questions.length} cards</Text>
                        </TouchableOpacity>
                    </View>
                   );
                })}

                {Object.keys(decks).length === 0 &&
                <View style={SharedStyles.container}>
                        <Text style={[SharedStyles.centerText,{fontSize:20}]}>No Deck Yet...</Text>
                        <TextButton style={SharedStyles.lightButton} onPress={() => this.props.navigation.navigate('NewDeckForm')} >
                                Add one?
                        </TextButton>
                </View>}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
      flex:1,
      alignItems:'center',
      padding:50,
      justifyContent:'center',
      borderStyle:'solid',
      borderBottomWidth:1,
      borderBottomColor:black
    },
    deckTitle:{
        fontSize:20,
    }
  })