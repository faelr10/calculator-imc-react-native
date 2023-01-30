import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Vibration, Keyboard, Pressable } from 'react-native'
import ResultImc from './ResultImc';
import styles from './style';


export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e a altura!")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular IMC")
    const [mediaImc, setMediaImc] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator() {
        const newImc = (weight / (height * height)).toFixed(2)
        setImc(newImc)
        if (newImc < 18.5) {
            setMediaImc("Magreza!")
        } else if (newImc >= 18.5 && newImc <= 24.9) {
            setMediaImc("Peso normal!")
        } else if (newImc >= 25 && newImc <= 29.9) {
            setMediaImc("Sobrepeso!")
        } else if (newImc >= 30) {
            setMediaImc("JUNINHO!")
        }
        return
    }

    function verificationImc() {
        if (imc === null) {
            setErrorMessage("Campo obrigatório*")
            Vibration.vibrate()
        }
    }

    async function validationImc() {
        if (weight !== null && height !== null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual: ")
            setTextButton("Calcular novamente")
            setErrorMessage(null)
            return
        }
        verificationImc()
        setImc(null)
        setMessageImc("É necessário preencher os campos altura e peso!")
        setTextButton("Calcular")
        setMediaImc(null)
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder='Ex: 1.75'
                    keyboardType='numeric'
                />
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder='Ex: 75.36'
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                />
                <TouchableOpacity
                    style={styles.ButtonCalculator}
                    onPress={() => validationImc()}
                    onPressIn={Keyboard.dismiss}
                    title={textButton}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc
                messageResultImc={messageImc}
                resultImc={imc}
                mediaImc={mediaImc}
            />
        </Pressable>
    );
}