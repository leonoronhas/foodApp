import React, { useState, useEffect, useCallback } from 'react'; // useEffect so we can run code when the state changes
import { View, Text, StyleSheet, Switch } from 'react-native';

import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';


const FilterSwitch = props => {
   return (
      <View style={styles.filterContainer}>
         <Text>{props.label}</Text>
         <Switch
            value={props.state}
            onValueChange={props.onChange}
            trackColor={{ true: '#f2a2a2' }}
            thumbColor={Colors.primary}
         />
      </View>
   );
};

/*===============================================
=
=
=============================================== */
const FiltersScreen = props => {
   const [isGlutenFree, setIsGlutenFree] = useState(false);
   const [isLactoseFree, setIsLactoseFree] = useState(false);
   const [isVegan, setIsVegan] = useState(false);
   const [isVegetarian, setIsVegetarian] = useState(false);

   const dispatch = useDispatch();

const saveFilters = useCallback(() => {
   const appliedFilters={
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree, 
      vegan: isVegan,
      vegetarian: isVegetarian
   };
   dispatch(setFilters(appliedFilters));
}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

// So we can navigate from our component to the navigation (line 94)
useEffect(() => {
   props.navigation.setParams({save: saveFilters}); // Create a key and point to a function 
}, [saveFilters]);

   return (
      <View style={styles.screen}>
         <Text style={styles.title}>Available Filters</Text>
         <FilterSwitch
            label="Gluten-Free"
            state={isGlutenFree}
            onChange={newValue => setIsGlutenFree(newValue)}
         />
         <FilterSwitch
            label="Lactose-Free"
            state={isLactoseFree}
            onChange={newValue => setIsLactoseFree(newValue)}
         />
         <FilterSwitch
            label="Vegan"
            state={isVegan}
            onChange={newValue => setIsVegan(newValue)}
         />
         <FilterSwitch
            label="Vegetarian"
            state={isVegetarian}
            onChange={newValue => setIsVegetarian(newValue)}
         />
      </View>
   );
};

FiltersScreen.navigationOptions = navData => {
   return {
      headerTitle: 'Filter Meals',
      headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
            title="Menu"
            iconName='ios-menu'
            buttonStyle={{ color: 'white' }}
            onPress={() => {
               navData.navigation.toggleDrawer();
            }}
         />
      </HeaderButtons>
      ),
      headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
            title="Save"
            iconName='ios-save'
            buttonStyle={{ color: 'white' }}
            onPress={navData.navigation.getParam('save')} // getting new set param (line 44)
         />
      </HeaderButtons>
      )
   };
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: 'center'
   },
   filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingVertical: 10
   },
   title: {
      fontFamily: 'roboto-bold',
      fontSize: 22,
      margin: 20,
      textAlign: 'center'
   }
});

export default FiltersScreen;