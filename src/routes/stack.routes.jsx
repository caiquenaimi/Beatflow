import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Category from "../screens/Category";
import Sobrenos from "../screens/Sobrenos";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Sobre Nos" component={Sobrenos} />
      <Stack.Screen name="Category" component={Category} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
