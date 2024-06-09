import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const apiURL = "http://localhost:3000";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const loadingStore = async () => {
      setLoading(true);
      const storageToken = await AsyncStorage.getItem(
        "@asyncStorage:refreshToken"
      );

      if (storageToken) {
        try {
          const isLogged = await axios.post(`${apiURL}/users/refresh`, {
            refreshToken: JSON.parse(storageToken),
          });
          if (isLogged) {
            const userById = await axios.get(
              `${apiURL}/users/${isLogged.data.refreshToken.user_id}`,
              {
                headers: {
                  Authorization: `Bearer ${isLogged.data.token}`,
                },
              }
            );
            setAccessToken(isLogged.data.token);
            const { password, ...userWithoutPassword } = userById.data.user;
            const userWithPassword = { ...userWithoutPassword, password: "" };
            setUser(userWithPassword);
          }
        } catch (error) {
          console.log("Error: ", error);
          AsyncStorage.clear();
        }
      }
      setLoading(false);
    };
    loadingStore();
  }, []);

  const login = async (email, password) => {
    try {
      const logged = await axios.post(`${apiURL}/users/login`, {
        email,
        password,
      });
      if (logged) {
        setAccessToken(logged.data.token);
        const userWithPassword = { ...logged.data.user, password };
        setUser(userWithPassword);
        setRefreshToken(logged.data.refreshToken);
        await AsyncStorage.setItem(
          "@asyncStorage:refreshToken",
          JSON.stringify(logged.data.refreshToken)
        );
      }
      return true;
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await axios.post(`${apiURL}/users/logOut`, {
        refreshToken,
      });
      AsyncStorage.clear();
      setUser("");
      setRefreshToken("");
      setAccessToken("");
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, signOut, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
