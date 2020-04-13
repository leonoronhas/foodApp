import React from 'react';
import { useSelector, } from 'react-redux';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';
import { View, Text } from 'react-native';

/*===============================================
=
=
=============================================== */
const CategoryMealScreen = props => {

   // retrieve data from previous screens
   const catId = props.navigation.getParam('categoryId');

   // Get the filtered meals from redux using useSelector
   const availableMeals = useSelector(state => state.meals.filteredMeals); // useSelector takes a function

   // retrieve data from the id selected 
   const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

   if (displayedMeals.length === 0 )
      return (
         <View style={{
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
               No meals found, maybe checking your filters may help!
         </Text>
         </View>
      );
   return (
      <MealList listData={displayedMeals} navigation={props.navigation} />
   );
};

// Set properties as a function to receive params
CategoryMealScreen.navigationOptions = navigationData => {
   // retrieve data from previous screens
   const catId = navigationData.navigation.getParam('categoryId');
   // retrieve data from the id selected 
   const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

   return {
      headerTitle: selectedCategory.title
   };
};

export default CategoryMealScreen;