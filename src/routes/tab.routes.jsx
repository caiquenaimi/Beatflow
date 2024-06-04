import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
/* import Playlists from "../screens/Playlists"; */
import Users from "../screens/Users";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Search from "../screens/Search";
import Player from "../screens/Player";
import PlayerPlaylist from "../screens/PlayerPlaylist";
import PlaylistTest from "../screens/PlaylistTest";


const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#FF0000",
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#000",
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
          backgroundColor: "#000",
        },
        headerTintColor: "#FF0000",
      }}
      initialRouteName="SignUp"
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
        initialParams={{ user: null, edit: false }}
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
      <Tab.Screen
        name="PlaylistTest"
        component={PlaylistTest}
        options={{
          tabBarButton: () => null, 
          tabBarVisible: false, 
        }}
      />

      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarButton: () => null, 
          tabBarVisible: false,
        }}
      />

      <Tab.Screen
        name="PlayerPlaylist"
        component={PlayerPlaylist}
        options={{
          tabBarButton: () => null, 
          tabBarVisible: false,
        }}
      />

    </Tab.Navigator>


  );
};

export default TabRoutes;
