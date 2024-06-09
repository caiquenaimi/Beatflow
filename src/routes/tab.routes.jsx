import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";

import Home from "../screens/Home";
import Users from "../screens/Users";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Search from "../screens/Search";
import Player from "../screens/Player";
import PlayerPlaylist from "../screens/PlayerPlaylist";
import Library from "../screens/Library";
import ConfirmDelete from "../screens/ConfirmDelete";

const Tab = createBottomTabNavigator();

const tabBarLabelStyle = {
  fontSize: 14,
  fontFamily: "Roboto",
};

const tabBarIconStyle = {
  marginBottom: 10,
};

const tabBarStyle = {
  position: "absolute",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderTopWidth: 0,
  paddingTop: 8,
};

const tabBarBackground = () => (
  <BlurView
    intensity={95}
    style={{
      flex: 1,
      overflow: "hidden",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }}
  />
);

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF0000",
        tabBarLabelStyle,
        headerShown: false,
        tabBarStyle,
        tabBarIconStyle,
        tabBarBackground,
      }}
      initialRouteName="Inicio"
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="users" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        initialParams={{ user: null, edit: false }}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
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

      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ConfirmDelete"
        component={ConfirmDelete}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
