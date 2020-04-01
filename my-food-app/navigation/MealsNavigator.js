import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator({
   Categories: {
      screen: CategoriesScreen
   },
   CategoryMeals: {
      screen: CategoryMealsScreen
   },
   MealDetail: {
      screen: MealDetailScreen
   }
},
   { // Second parameter of createStackNavigator
      headerMode: 'float',
      defaultNavigationOptions: { // Applies to all screens in the stack (Overwritten when specifically applied)
         headerStyle: {
            backgroundColor: Colors.primary,
         },
         headerTintColor: 'white'
      }
   });

export default createAppContainer(MealsNavigator);