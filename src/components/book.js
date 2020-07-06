/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const url = 'http://192.168.1.4:8000/';
export default function book(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Detail', {
        bookId: props.id,
      })
    }>
      <Card
        title={props.name}
        titleNumberOfLines={1}
        image={{uri: `${url}${props.cover}`}}
        imageStyle={styles.cover}
        containerStyle={props.horizontal ? styles.card : null}
      >
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text numberOfLines={4} style={{marginBottom: 10, textAlign: 'center'}}>
          {props.description}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 340,
  },
  cover: {
    height: 200,
    maxHeight: 200,
    minHeight: 200,
  },
});
