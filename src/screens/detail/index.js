/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';
import cover from '../../assets/image/book.jpg';

export default class Detail extends Component {
  render() {
    return (
      <>
        <Container>
          <Content>
            <Card>
              <CardItem cardBody>
                <Image source={cover} style={detailStyle.cover} />
              </CardItem>
              <CardItem>
                <Text style={detailStyle.title}>Book Name</Text>
              </CardItem>
              <CardItem>
                <Text>Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </>
    );
  }
}

const detailStyle = StyleSheet.create({
  header: {
    padding: 15,
  },
  body: {
    padding: 15,
  },
  view: {
    marginVertical: 20,
  },
  title: {
    color: '#0e1e40',
    fontWeight: 'bold',
    fontSize: 30,
  },
  cover: {
    height: 400,
    flex: 1,
  },
});
