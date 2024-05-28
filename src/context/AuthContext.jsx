import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

    const sign = async (email, password) => {
        try {
            const loggged = await axios.post(`${apiURL}/users/login`, {
                email,
                password
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
                setRefreshToken(loggged.data.refreshToken);
                AsyncStorage.setItem("@asyncStorage:refreshToken", JSON.stringify(loggged.data.refreshToken));
            }
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
        }
    }

    const signOut = async () => {
        try {
            await axios.post(`${apiURL}/users/logout`, {
                refreshToken
            });
            AsyncStorage.clear();
            setUser('');
            setRefreshToken('');
            setAcessToken('');
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    }   

    return (
        <AuthContext.Provider value={{ signed: !!user, user, sign, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };



    



