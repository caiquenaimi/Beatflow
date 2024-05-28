import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';   
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiURL = 'http://localhost:3000/api'; //process.env.REACT_APP_API_URL;
    const [user, setUser] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [acessToken, setAcessToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadingStoreDataStuff = async () => {
            setLoading(true);
            const storageToken = await AsyncStorage.getItem("@asyncStorage:refreshToken");

            if (storageToken) {
                try {
                    const loggged = await axios.post(`${apiURL}/users/refresh`, {
                        refreshToken: JSON.parse(storageToken)
                    });
                    if(loggged){
                        const userId = await axios.get(`${apiURL}/users/${loggged.data.refreshToken.user_id}`, {
                            headers: {
                                Authorization: `Bearer ${loggged.data.accessToken}`
                            }
                        });
                        
                        setAcessToken(loggged.data.token);
                        const { password, ...noPassword } = userId.data.user;
                        setUser(noPassword);
                    }
                } catch (error) {
                    console.error("Erro ao fazer login: ", error);
                    AsyncStorage.clear();
                }
            }
            setLoading(false);  
        };
        loadingStoreDataStuff();
    }, []);



    



