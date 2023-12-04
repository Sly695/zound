import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const PrimaryButton = ({ handleFunction, text }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleFunction}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#C9F701', // Change the color as needed
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        margin: 10,
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


export default PrimaryButton