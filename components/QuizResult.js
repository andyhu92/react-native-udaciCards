import React, { Component } from 'react'
import { View, Text, StyleSheet,Alert } from 'react-native'
import { getDeck } from '../utils/api'
import { white, gray, black, red, green } from '../utils/colors'
import TextButton from '../components/TextButton'
import SharedStyles from '../styles/sharedStyles'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default class QuizResult extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let { questions, id, onRestartQuiz, onGoBack } = this.props;
        questions = questions || [];
        let correctQuestionsLength = questions.filter(q => q.isCorrect).length;
        let correctPercent = correctQuestionsLength / questions.length;
        let emojiStyle = this.getEmojiStyle(correctPercent);

        return (
            <View style={SharedStyles.container}>
                <Text style={SharedStyles.centerText}><Entypo name={emojiStyle} size={40}/></Text>
                <Text style={[SharedStyles.centerText,{fontSize:20,color:green,fontWeight:'bold'}]}>{correctPercent*100 + ' %'}</Text>
                <Text style={SharedStyles.centerText}>Result: {correctQuestionsLength} of {questions.length} questions are correct!</Text>
                <TextButton style={[SharedStyles.darkButton,{backgroundColor:green}]} onPress={() => onRestartQuiz()}>Try Again</TextButton>
                <TextButton style={[SharedStyles.darkButton,{backgroundColor:gray}]} onPress={() => onGoBack()}>Back to Deck</TextButton>

                {questions.map(q => {

                })}

            </View>
        )
    }

    getEmojiStyle(percent){
        let res = 'emoji-';
        if(percent > 0.6) return res + "happy";
        if(percent > 0.3) return res + "neutral";
        return res + "sad";
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
