import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

/*===============================================
=
=
=============================================== */
const CategoryMealScreen = props => {
   // retrieve data from previous screens
   const catId = props.navigation.getParam('categoryId');
   // retrieve data from the id selected 
   const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

   return (
      <View style={styles.screen}>
         <Text>The Category Meal Screen!</Text>
         <Button title="Go to Meal Detail!" onPress={() => {
            props.navigation.navigate('MealDetail')
         }}/>
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