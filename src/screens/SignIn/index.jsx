import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
// import styles from './styles'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'

export default function SignIn() {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const errors = []
    const navigation = useNavigation()
    
    useEffect(() => {
        console.log('SignUp')
    }, [])
    

    const validation = () => {
        if (!email) {
            errors.push('Preencha o campo de email')
            return false
        }
        if (!password) {
            errors.push('Preencha o campo de senha')
            return false
        }
        if (password.length < 6) {
            errors.push('A senha deve ter no mínimo 6 caracteres')
            return false
        }
        if (!email.includes('@')) {
            errors.push('Email inválido')
            return false
        }
        if (!password.includes('@', '.', '!', '#', '$', '%', '&', '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~', ':', ';', '<', '>', '[', ']', '\\', '"', "'")) {
            errors.push('A senha deve conter ao menos um caracter especial')
            return false
        }
        if (!password.includes('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')) {
            errors.push('A senha deve conter ao menos um número')
            return false
        }
        if (!password.includes('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')) {
            errors.push('A senha deve conter ao menos uma letra maiúscula')
            return false
        }
        if (!password.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z')) {
            errors.push('A senha deve conter ao menos uma letra minúscula')
            return false
        }
        if (errors.length > 0) {
            setError(errors.join('\n'))
            return false
        }
        return true
    }

    const handleSignIn = async () => {
        try{
            if (validation()) {
                setLoading(true)
                await login(email, password)
                navigation.navigate('Home')
            }
        }
        catch (error) {
            console.error('Erro ao fazer login: ', error)
        }
        setLoading(false)
    }
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
        >
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        </View>
    )
}