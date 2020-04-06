import React from 'react';
import Colors from '../constants/Colors';

import MealList from '../components/MealList';
import {MEALS} from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

import {HeaderButtons, Item } from 'react-navigation-header-buttons';

/*===============================================
=
=
=============================================== */
const FavoritesScreen = props => {
   const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2') // To see if it works

   return (
      <MealList listData={favMeals} navigation={props.navigation}/>
   );
};

FavoritesScreen.navigationOptions =  navData=> {
   return {
   headerTitle: 'Your Favorites',
   headerStyle:{
      backgroundColor: Colors.accent
   },
   headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item 
      title="Menu" 
      iconName='ios-menu' 
      buttonStyle={{color: 'white'}}
      onPress={() => {
         navData.navigation.toggleDrawer();
      }} 
      />
   </HeaderButtons>
   };
};

export default FavoritesScreen;