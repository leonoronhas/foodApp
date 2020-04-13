import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../constants/Colors';

import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

/*===============================================
=
=
=============================================== */
const FavoritesScreen = props => {
   // Retrieve the meals from the store
   const favMeals = useSelector(state => state.meals.favoriteMeals);

   if (favMeals.length === 0 || !favMeals) {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               padding: 30
            }}>
            <Text style={{
               fontFamily: 'roboto',
               fontSize: 20,
               textAlign: 'center'
            }}>
               No favorites meals found. Start adding some!
            </Text>
         </View>
      );
   }

   return (
      <MealList listData={favMeals} navigation={props.navigation} />
   );
};

FavoritesScreen.navigationOptions = navData => {
   return {
      headerTitle: 'Your Favorites',
      headerStyle: {
         backgroundColor: Colors.accent
      },
      headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
            title="Menu"
            iconName='ios-menu'
            buttonStyle={{ color: 'white' }}
            onPress={() => {
               navData.navigation.toggleDrawer();
            }}
         />
      </HeaderButtons>
   };
};

export default FavoritesScreen;