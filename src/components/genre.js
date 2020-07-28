/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Badge } from 'react-native-elements';

export default function book(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Genre', {
        genreId: props.id,
        genreName: props.name,
      })}
    >
      <Badge
        value={props.name}
        badgeStyle={styles.padding_15}
        containerStyle={styles.padding_5}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  padding_15: {
    padding: 15,
  },
  padding_5: {
    padding: 5,
  },
});
