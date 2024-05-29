import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const apiURL = 'http://localhost:3000'; //process.env.REACT_APP_API_URL;
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshToken, setRefreshToken] = useState('');
    const [acessToken, setAcessToken] = useState('');

    useEffect(() => {
        const loadingStoreDataStuff = async () => {
            setLoading(true);
            const storageToken = await AsyncStorage.getItem("@asyncStorage:refreshToken");

            if (storageToken) {
                try {
                    const loggged = await axios.post(`${apiURL}/users/refresh`, {
                        rtoken: JSON.parse(storageToken)
                    });
                    if(loggged){
                        const userId = await axios.get(`${apiURL}/users/${loggged.data.rtoken.user_id}`);
                        setAcessToken(loggged.data.rtoken);
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

    const test = async () => {
        console.log('user: ', user);
        console.log('refreshToken: ', refreshToken);
        console.log('acessToken: ', acessToken);
    }

    const login = async (email, password) => {
        try {
            const loggged = await axios.post(`${apiURL}/users/login`, {
                email: email,
                password: password
            });
            console.log('loggged: ', loggged.data);
            if(loggged){
                setAcessToken(loggged.data.token);
                const { password, ...noPassword } = loggged.data.user;
                setUser(noPassword);
                setRefreshToken(loggged.data.refreshToken);
                console.log('user: ', user);
                console.log('refreshToken: ', loggged.data.refreshToken);
                console.log('password: ', password);
                AsyncStorage.setItem("@asyncStorage:refreshToken", JSON.stringify(loggged.data.refreshToken));
            }

            return true
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            return false
        }
    }

    const signOut = async () => {
        try {
            await axios.post(`${apiURL}/users/logOut`, {
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
        <AuthContext.Provider value={{ user, login, signOut, loading, test }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };



    



