import React, { Component } from 'react'
import { View, Text, StyleSheet,Alert, Animated } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { getDeck } from '../utils/api'
import { white, gray, black, red, green } from '../utils/colors'
import TextButton from '../components/TextButton'
import SharedStyles from '../styles/sharedStyles'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import QuizResult from '../components/QuizResult'
import { setLocalNotification, clearLocalNotification } from '../utils/helper'


export default class Quiz extends Component{
    constructor(props){
        super(props);
        this.state = {
            questionNumber:1,
            questions:[],
            isViewAnswer:true
        }
        this.flipCard = this.flipCard.bind(this);
        this.handleRestartQuiz = this.handleRestartQuiz.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    componentWillMount(){
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg']
        })
    }

    componentDidMount(){
        let id = this.props.navigation.state.params.id;
        this.id = id;
        clearLocalNotification()
            .then(setLocalNotification);

        getDeck(id)
            .then(deck => {
                this.setState({
                    questions:deck.questions
                });
            })
    }

    handleRestartQuiz(){
        getDeck(this.id)
        .then(deck => {
            this.setState({
                questions:deck.questions,
                questionNumber:1
            });
        })
    }

    handleGoBack(){
        this.props.navigation.goBack();
    }

    flipCard() {
        if (this.value >= 90) {
          Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10
          }).start();
        } else {
          Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10
          }).start();
        }

        this.setState({
            isViewAnswer: !this.state.isViewAnswer
        })
      }

    answer(isCorrect){
        const { questions ,questionNumber } = this.state;


        this.setState((prev) => {
            let question = questions[questionNumber-1];
            question.isCorrect = isCorrect;
            let copy = questions.slice();

            copy[questionNumber - 1] = question;
            return {
                questionNumber: prev.questionNumber + 1,
                questions:copy
            }
        });
    }


    render(){
        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate}
            ]
          }
          const backAnimatedStyle = {
            transform: [
              { rotateY: this.backInterpolate }
            ]
          }

        const { questions ,questionNumber, isViewAnswer } = this.state;
        let question = questions[questionNumber - 1];
        return (
            question ?
            <View style={SharedStyles.container}>
                <Text>{questionNumber} / {questions.length}</Text>

                <Animated.View style={[frontAnimatedStyle, styles.flipCard, styles.flipCardFront]}>
                    <Text style={[SharedStyles.centerText,{fontSize:20,fontWeight:'bold',padding:20}]}>
                        {question.question}
                    </Text>
                </Animated.View>

                <Animated.View style={[backAnimatedStyle,styles.flipCard, styles.flipCardBack]}>
                    <Text style={[SharedStyles.centerText,{fontSize:20,fontWeight:'bold',padding:20}]}>
                        {question.answer}
                    </Text>
                </Animated.View>


                <TextButton style={{color:red}} onPress={this.flipCard}>
                    {isViewAnswer ? 'View Answer':'View Question'}
                </TextButton>

                <TextButton style={[SharedStyles.darkButton,{backgroundColor:green}]} onPress={() => this.answer(true)}>
                    Correct
                </TextButton>

                <TextButton style={[SharedStyles.darkButton,{backgroundColor:red}]} onPress={() => this.answer(false)}>
                    Incorrect
                </TextButton>


            </View>:<QuizResult questions={questions} onRestartQuiz={this.handleRestartQuiz} onGoBack={this.handleGoBack}/>
        )
    }
}

const styles = StyleSheet.create({
    flipCard: {
      backfaceVisibility: 'hidden',
    },
    flipCardFront:{
        marginBottom:-30
    },
    flipCardBack: {
        marginTop:-20
    }
  });