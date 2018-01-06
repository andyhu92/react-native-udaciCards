import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import UdaciStatusBar from './components/StatusBar'
import { lightPurp, blue, white, black } from './utils/colors'
import { StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import NewDeckForm from './components/NewDeck'
import NewCardForm from './components/NewCard'
import CardList from './components/CardList'
import Quiz from './components/Quiz'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import TextButton from './components/TextButton'
import { setLocalNotification, clearLocalNotification } from './utils/helper'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar barStyle="dark-content" />
        <MainNavigator/>
      </View>
    );
  }

  componentDidMount(){
    setLocalNotification();
  }
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: 'UdaciCards',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  },
  NewDeckForm:{
    screen: NewDeckForm,
    navigationOptions: ({navigation}) => ({
      title: 'New Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  },
  NewCardForm:{
    screen: NewCardForm,
    navigationOptions: ({navigation}) => ({
      title: 'New Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  },
  CardList:{
    screen:CardList,
    navigationOptions: ({navigation}) => ({
      title: `Cards`,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  },
  Quiz:{
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
