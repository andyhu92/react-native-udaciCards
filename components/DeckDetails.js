import React, { Component } from 'react'
import { View, Text, StyleSheet,Alert } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { getDeck } from '../utils/api'
import { white, gray, black, red } from '../utils/colors'
import TextButton from '../components/TextButton'
import SharedStyles from '../styles/sharedStyles'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { removeDeck } from '../utils/api'

export default class DeckDetails extends Component{
    static navigationOptions = ({navigation, props}) => {
        return {
        headerLeft: <HeaderBackButton tintColor={white} title='UdaciCards'
                        onPress={() => navigation.navigate('Home')} >
                    </HeaderBackButton>
        }
    };

    constructor(props){
        super(props);
        this.state = {
            deck:{
                title:"",
                questions:[]
            }
        }
    }
    componentDidMount(){
        let { id }= this.props.navigation.state.params;
        this.id = id;
        getDeck(id).then(deck => {
            this.setState({deck})
        });
    }

    removeDeck(){
        if(this.state.deck.questions.length){
            Alert.alert(
                'Are you sure to delete this deck?',
                'All cards will be deleted also.',
                [
                  {text: 'Cancel', onPress: () => console.log()},
                  {text: 'OK', onPress: () => {
                    removeDeck(this.id)
                    .then(res => {
                        this.props.navigation.navigate('Home')
                    })
                  }},
                ],
                { cancelable: false }
              );
        }else{
            removeDeck(this.id)
            .then(res => {
                this.props.navigation.navigate('Home')
            })
        }
    }

    startQuiz(){
        this.props.navigation.navigate("Quiz", {id: this.id})
    }

    render(){
        const { deck } = this.state;
        return (
            <View style={SharedStyles.container}>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <TextButton style={styles.deckSmallText} onPress={() => this.props.navigation.navigate("CardList",{id:this.id})}>{deck.questions.length} cards</TextButton>
                <TextButton style={SharedStyles.lightButton} onPress={() => this.props.navigation.navigate("NewCardForm",{ id: this.id})}>
                    Add Card
                </TextButton>
                { deck.questions.length > 0 &&
                <TextButton style={SharedStyles.darkButton} onPress={() => this.startQuiz()}>
                    Start Quiz
                </TextButton>}

                <TextButton style={[SharedStyles.darkButton,{backgroundColor:red}]} onPress={() => this.removeDeck()}>
                    Remove this Deck
                </TextButton>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckTitle:{
        fontSize:30,
        marginTop:50,
        fontWeight:'bold',
        textAlign:'center'
    },
    deckSmallText:{
        textAlign:'center',
        color:gray,
        marginBottom:30
    },

});
