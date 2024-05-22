import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Sobrenos from "../screens/Sobrenos";
import Category from "../screens/Users";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"   component={Home} />
      <Tab.Screen name="Sobre Nós" component={Sobrenos} />
      <Tab.Screen name="Category" component={Category} />
    </Tab.Navigator>
  );
};

export default TabRoutes;
