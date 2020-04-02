import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

/*===============================================
=
=
=============================================== */
const CategoryMealScreen = props => {
   // Function to be rendered by Flatlist
   const renderMealItem = itemData => {
      return (
         <MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
               props.navigation.navigate({routeName: 'MealDetail', params: {
                  mealId: itemData.item.id
               }});
            }}
         />
      );
   };

   // retrieve data from previous screens
   const catId = props.navigation.getParam('categoryId');
   // retrieve data from the id selected 
   const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

   return (
      <View style={styles.screen}>
         <FlatList
            data={displayedMeals}
            keyExtractor={(item, index) => item.id}
            renderItem={renderMealItem}
            style={{width: '100%', padding: 10}} // So the list takes all the width it can get
         />
      </View>
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

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});



export default CategoryMealScreen;