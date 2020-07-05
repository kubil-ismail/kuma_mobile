/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const url = 'http://192.168.1.4:8000/';
export default function book(props) {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Detail', {
      bookId: props.id,
    })}>
      <Card title={props.name} image={{uri: `${url}${props.cover}`}}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text numberOfLines={4} style={{marginBottom: 10, textAlign: 'center'}}>
          {props.description}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}
