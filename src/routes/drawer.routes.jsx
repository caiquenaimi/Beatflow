import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Category from "../screens/Category";
import Sobrenos from "../screens/Sobrenos";

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Sobre Nos" component={Sobrenos} />
      <Drawer.Screen name="Category" component={Category} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;