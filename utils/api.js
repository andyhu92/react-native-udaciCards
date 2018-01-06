import { AsyncStorage } from 'react-native'
import uuid from 'uuid/v4'
import { UDACICARDS_STORAGE_KEY } from './_decks'

export function initDecks(){
    let initData = {
        '7f159904-c70e-11e7-abc4-cec278b6b50a': {
          title: 'React',
          timestamp:1510541150505,
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        '7f15a0c0-c70e-11e7-abc4-cec278b6b50a': {
          title: 'JavaScript',
          timestamp:1510541151505,
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
    };

    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(res => {
        if(!res) return AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(initData));
        return [];
    });
}

export function getDecks () {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(JSON.parse);
}

export function getDeck (id) {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(JSON.parse)
        .then(decks => decks[id]);
}

export function removeDeck (id) {
    return getDecks()
        .then(decks => {
            delete decks[id];
            return AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
        })
}

export function saveDeckTitle(title){
    let key = uuid();
    let newDeck = {
        [key]:{
            title,
            timestamp:Date.now(),
            questions:[]
        }
    };
    return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify(newDeck))
        .then(res => key);
}

export function addCardToDeck(id, card){
    return getDeck(id).then(deck => {
        deck.questions.push(card);
        let modifedDeck = {
            [id]:deck
        }
        return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify(modifedDeck))
            .then(res => id);
    });
}

