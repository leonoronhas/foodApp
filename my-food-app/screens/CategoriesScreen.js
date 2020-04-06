import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

/*===============================================
=
=
=============================================== */
const CategoriesScreen = props => {
   // Render function grid items and make them touchable
   const renderGridItem = (itemData) => {
      return (
         <CategoryGridTile
            title={itemData.item.title} // Forward data to the component 
            color={itemData.item.color}
            onSelect={() => {
               props.navigation.navigate({
                  routeName: 'CategoryMeals',
                  params: {
                     categoryId: itemData.item.id // Forward tapped id to new screen
                  }
               });
            }}
         />
      );
   };

   return (
      <FlatList
         keyExtractor={(item, index) => item.id}
         data={CATEGORIES}
         renderItem={renderGridItem}
         numColumns={2}
      />
   );

};

// Set properties for CategoryScreen component
CategoriesScreen.navigationOptions =  navData=> {
   return {
   headerTitle: 'Meal Categories',
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

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
});

export default CategoriesScreen;