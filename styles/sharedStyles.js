import { StyleSheet } from 'react-native'
import { white, gray, black } from '../utils/colors'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    centerText:{
        textAlign:'center'
    },
    lightButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:10,
        borderWidth: 2,
        borderColor: black,
        color:black
    },
    darkButton:{
        backgroundColor:black,
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:10,
        borderWidth: 2,
        borderColor: white,
        color:white,
        overflow:'hidden'
    }
})