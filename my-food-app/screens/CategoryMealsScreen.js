import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

/*===============================================
=
=
=============================================== */
const CategoryMealScreen = props => {
   

   // retrieve data from previous screens
   const catId = props.navigation.getParam('categoryId');
   // retrieve data from the id selected 
   const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

   return (
      <MealList listData={displayedMeals} navigation={props.navigation}/>
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