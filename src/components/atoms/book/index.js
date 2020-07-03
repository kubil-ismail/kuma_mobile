/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, CardItem } from 'native-base';
import { Image } from 'react-native';
import cover from '../../../assets/image/book.jpg';

export default function index(props) {
  return (
    <Card>
      <CardItem cardBody>
        <Image source={cover} style={{ height: 200, width: null, flex: 1 }} />
      </CardItem>
    </Card>
  );
}
