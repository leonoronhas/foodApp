import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/meals';


const ListItem = props => {
   return (
      <View style={styles.listItem}>
         <Text style={{ fontFamily: 'roboto' }}>{props.children}</Text>
      </View>
   );
};
/*===============================================
=
=
=============================================== */
const MealDetailScreen = props => {
   // Get all the available meals from the store
   const availableMeals = useSelector(state => state.meals.meals);
   const mealId = props.navigation.getParam('mealId');
   // Check if meals is part of favorites
   const currentMealsIsFavorite = useSelector(state =>
      state.meals.favoriteMeals.some(meal => meal.id === mealId));

   // Find the meal by the id
   const selectedMeal = availableMeals.find(meal => meal.id === mealId);

   const dispatch = useDispatch();

   const toggleFavoriteHandler = useCallback(() => {
      dispatch(toggleFavorite(mealId));
   }, [dispatch, mealId]);

   //Send new data to params wrapped in useEffect to avoid infinite loop
   useEffect(() => {
      props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
   }, [toggleFavoriteHandler]); // Forward data to header only if selectedMeal changes the state


   useEffect(() => {
      props.navigation.setParams({isFav: currentMealsIsFavorite});
   }, [currentMealsIsFavorite]);
   return (
      <ScrollView>
         <View style={styles.imageContainer}>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
         </View>
         <View style={styles.details}>
            <Text style={{ fontFamily: 'roboto-bold' }}>{selectedMeal.duration} m</Text>
            <Text style={{ fontFamily: 'roboto-bold' }}>{selectedMeal.complexity.toUpperCase()}</Text>
            <Text style={{ fontFamily: 'roboto-bold' }}>{selectedMeal.affordability.toUpperCase()}</Text>
         </View>
         <View style={styles.icons}>
            <Text style={styles.title}>Ingredients </Text>
            <MaterialCommunityIcons
               title="IngredientsIcon"
               name='food-variant'
               size={19}
            />
         </View>

         {selectedMeal.ingredients.map(ingredient => (  // Display content in the array
            <ListItem key={ingredient}>{ingredient}</ListItem>
         ))}

         <View style={styles.icons}>
            <Text style={styles.title}>Steps</Text>
            <MaterialCommunityIcons
               title="StepsIcon"
               name='walk'
               size={19}
            />
         </View>

         {selectedMeal.steps.map(step => (  // Display content in the array
            <ListItem key={step}>{step}</ListItem>
         ))}
      </ScrollView>
   );
};

MealDetailScreen.navigationOptions = (navigationData) => {
   //const mealId = navigationData.navigation.getParam('mealId');
   const mealTitle = navigationData.navigation.getParam('mealTitle');
   const toggleFavorite = navigationData.navigation.getParam('toggleFav');
   const isFavorite = navigationData.navigation.getParam('isFav');
   //const selectedMeal = MEALS.find(meal => meal.id === mealId);
   return {
      headerTitle: mealTitle,
      headerRight: (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
               title='Favorite'
               iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
               onPress={toggleFavorite}
            />
         </HeaderButtons>
      )
   };
};

const styles = StyleSheet.create({
   imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,

   },
   image: {
      width: '95%',
      height: 200,
      borderRadius: 10
   },
   details: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-around'
   },
   title: {
      fontFamily: 'roboto-bold',
      fontSize: 20,
      textAlign: 'center'
   },
   icons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   listItem: {
      marginVertical: 10,
      marginHorizontal: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      borderRadius: 10
   }
});

export default MealDetailScreen;