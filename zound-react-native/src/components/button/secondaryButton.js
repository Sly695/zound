import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const SecondaryButton = ({ handleFunction, text }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleFunction}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFF', // Change the color as needed
        padding: 10,
        width: 200,
        margin: 10,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        
    },
    buttonText: {
        color: 'black', // Change the text color as needed
        fontSize: 16,
    },
});


export default SecondaryButton