import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import MealItem from './MealItem';
/*===============================================
=
=
=============================================== */
const MealList = props => {

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
                  mealId: itemData.item.id,
                  mealTitle: itemData.item.title
               }});
            }}
         />
      );
   };

   return (
      <View style={styles.list}>
         <FlatList
            data={props.listData}
            keyExtractor={(item, index) => item.id}
            renderItem={renderMealItem}
            style={{width: '100%', padding: 10}} // So the list takes all the width it can get
         />
      </View>
     );
};

const styles = StyleSheet.create({
   list: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});

export default MealList;