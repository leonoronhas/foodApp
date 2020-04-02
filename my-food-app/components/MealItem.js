import React from 'react';
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   Platform,
   TouchableNativeFeedback,
   ImageBackground
} from 'react-native';

/*===============================================
=
=
=============================================== */
const MealItem = props => {
   let TouchCmp = TouchableOpacity;
   if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchCmp = TouchableNativeFeedback;
   }
   return (
      <View style={styles.mealItem}>
         <TouchCmp onPress={props.onSelectMeal}>
            <View>
               <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                  <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                     <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                  </ImageBackground>
               </View>
               <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                  <Text style={{fontFamily: 'roboto-bold'}}>{props.duration} m</Text>
                  <Text style={{fontFamily: 'roboto-bold'}}>{props.complexity.toUpperCase()}</Text>
                  <Text style={{fontFamily: 'roboto-bold'}}>{props.affordability.toUpperCase()}</Text>
               </View>
            </View>
         </TouchCmp>
      </View>
   );
};

const styles = StyleSheet.create({
   mealItem: {
      height: 200,
      width: '100%',
      backgroundColor: 'honeydew',
      marginVertical: 8,
      borderRadius: 20,
      overflow: 'hidden' // So it overrides all the child styles
   },
   mealRow: {
      flexDirection: 'row',
      paddingHorizontal: 10
   },
   mealHeader: {
      height: '85%',
   },
   mealDetail: {
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '15%'
   },
   bgImage: {
      width: '100%', // Add width and height for web images, local images gets handled by RN
      height: '100%', // both 100% to get all available space it gets
      justifyContent: 'flex-end'
   },
   title:{
      fontFamily: 'roboto-bold',
      fontSize: 22,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)', // Black but transparent
      paddingVertical: 5,
      paddingHorizontal: 12
   }
});

export default MealItem;