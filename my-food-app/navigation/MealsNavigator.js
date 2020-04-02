import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

import { Ionicons } from '@expo/vector-icons';

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
         headerTitleStyle: {
            fontFamily: 'roboto'
         },
         headerTintColor: 'white'
      }
   });

// Bottom tab navigator
const MealsFavTabNavigator = createBottomTabNavigator({
   Meals: {
      screen: MealsNavigator, navigationOptions: {  // Returns a component, it can be ANY component
         tabBarLabel: 'Categories',
         tabBarIcon: (tabInfo) => {
            return (
               <Ionicons
                  name='ios-restaurant'
                  size={25}
                  color={tabInfo.tintColor}
               />
            );
         }
      }
   },
   Favorites: {
      screen: FavoritesScreen, navigationOptions: {
         tabBarLabel: 'Favorites',
         tabBarIcon: (tabInfo) => {
            return (
               <Ionicons
                  name='ios-star'
                  size={25}
                  color={tabInfo.tintColor}
               />
            );
         }
      }
   }
}, {
   tabBarOptions: {
      activeTintColor: Colors.primary,

   }
});

export default createAppContainer(MealsFavTabNavigator);