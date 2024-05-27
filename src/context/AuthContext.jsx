import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';   
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiURL = 'http://localhost:5000/api'; //process.env.REACT_APP_API_URL;
    const [user, setUser] = useState('');
    const [acessToken, setAcessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [loading, setLoading] = useState(false);
    



