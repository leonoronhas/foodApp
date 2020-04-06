import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';
import FiltersScreen from '../screens/FiltersScreen';

import { Ionicons } from '@expo/vector-icons';

const MealsNavigator = createStackNavigator(
   {
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

// New stack for the favorites screen
const FavNavigator = createStackNavigator({
   Favorites: FavoritesScreen,
   MealDetail: MealDetailScreen
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

const tabScreenConfig = {
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
         },
         tabBarColor: Colors.primary
      }
   },
   Favorites: {
      screen: FavNavigator,
      navigationOptions: {
         tabBarLabel: 'Favorites',
         tabBarIcon: (tabInfo) => {
            return (
               <Ionicons
                  name='ios-star'
                  size={25}
                  color={tabInfo.tintColor}
               />
            );
         },
         tabBarColor: Colors.accent
      }
   }
};

// Bottom tab navigator
const MealsFavTabNavigator =
   Platform.OS === 'android'
      ? createMaterialBottomTabNavigator(tabScreenConfig, {
         activeTintColor: Colors.accent,
         shifting: true // Scale when tapped 
      })
      : createBottomTabNavigator(tabScreenConfig, {
         tabBarOptions: {
            labelStyle: {
               fontFamily: 'roboto'
            },
            activeTintColor: Colors.primary,
         }
      });

const FiltersNavigator = createStackNavigator({
   Filters: FiltersScreen
}, {
   defaultNavigationOptions: { // Applies to all screens in the stack (Overwritten when specifically applied)
      headerStyle: {
         backgroundColor: Colors.primary,
      },
      headerTitleStyle: {
         fontFamily: 'roboto-bold'
      },
      headerBackTitleStyle: {
         fontFamily: 'roboto'
      },
      headerTintColor: 'white'
   }
});

//Drawer navigator
const MainNavigator = createDrawerNavigator({
   MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
         drawerLabel: 'Meals'
      }
   },
   Filters: FiltersNavigator
}, {
   contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
         fontFamily: 'roboto-bold'
      }
   }
});

export default createAppContainer(MainNavigator);