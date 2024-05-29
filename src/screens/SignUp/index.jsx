import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

export default function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [birthdate, setBirthDate] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    
    useEffect(() => {
        console.log('SignUp')
    }, [])
    
    const handleSignUp = async () => {
        setLoading(true)
        try {
        const response = await axios.post('http://localhost:3000/users', {
            name,
            email,
            password,
            birthdate
        })
        console.log('response: ', response.data)
        navigation.navigate('Home')
        } catch (error) {
        console.error('Erro ao fazer login: ', error)
        }
        setLoading(false)
    }
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder='Name'
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TextInput
            style={styles.input}
            placeholder='Birth Date'
            value={birthdate}
            onChangeText={setBirthDate}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}
        >
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
    )
    }
