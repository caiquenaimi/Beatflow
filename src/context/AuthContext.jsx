import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const apiURL = 'https://briefly-dynamic-griffon.ngrok-free.app'; //process.env.REACT_APP_API_URL;
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshToken, setRefreshToken] = useState('');
    const [acessToken, setAcessToken] = useState('');

    useEffect(() => {
        const loadingStore = async () => {
            setLoading(true);
            const storageToken = await AsyncStorage.getItem("@asyncStorage:refreshToken");
      
            if (storageToken) {
              try {
                const isLogged = await axios.post(`${apiURL}/users/refresh`, {
                  refreshToken: JSON.parse(storageToken)
                });
                console.log(isLogged)
                if (isLogged) {
                  const userById = await axios.get(`${apiURL}/users/${isLogged.data.refreshToken.user_id}`, {
                    headers: {
                      Authorization: `Bearer ${isLogged.data.token}`
                    }
                  });
                  setAcessToken(isLogged.data.token);
                  const { password, ...userWithoutPassword } = userById.data.user;
                  setUser(userWithoutPassword);
                }
              } catch (error) {
                setPopUpMessage("Faça login novamente");
                setTimeout(() => {
                  setPopUpMessage(null);
                }, 3000);
                AsyncStorage.clear();
              }
            }
            setLoading(false);
          };
          loadingStore();
        }, []);

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
                await AsyncStorage.setItem("@asyncStorage:refreshToken", JSON.stringify(loggged.data.refreshToken));
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
        <AuthContext.Provider value={{ user, login, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };



    



