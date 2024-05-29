import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import Playlists from "../screens/Playlists";
import Users from "../screens/Users";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#E25252",
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#3A3954",
          height: 80,
          shadowColor: "#000",
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.53,
          shadowRadius: 13.97,
          elevation: 21,
        },
        tabBarIconStyle: {
          marginBottom: -10,
        },
        headerStyle: {
          backgroundColor: "#3A3954",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Roboto",
          },
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Buscar",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Roboto",
          },
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          tabBarLabel: "Biblioteca",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Roboto",
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: "Usuários",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Roboto",
          },
          tabBarIcon: ({ color }) => (
            <Feather name="users" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: "Sign Up",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Roboto",
          },
          tabBarIcon: ({ color }) => (
            <Feather name="user-plus" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarLabel: "Sign In",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Roboto",
          },
          tabBarIcon: ({ color }) => (
            <Feather name="log-in" color={color} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
