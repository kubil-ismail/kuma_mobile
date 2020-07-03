/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Badge,
  Body,
  Container,
  Content,
  Card,
  CardItem,
  Form,
  H1,
  H3,
  Icon,
  Item,
  Input,
  Text,
  Left,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';

const cover = 'https://i.pinimg.com/474x/bb/e5/06/bbe5064a2e35032e7559e1e64a6195c7.jpg';

export default class Home extends Component {
  render() {
    return (
      <>
        <Container style={favoriteStyle.parent}>
          <Content style={favoriteStyle.body}>
            {/* Search */}
            <Form style={favoriteStyle.search}>
              <Item regular>
                <Input placeholder="Search book..." />
                <Icon active name="search" />
              </Item>
            </Form>
            {/* Best Books */}
            <Text style={favoriteStyle.headTitle}>My Favorite</Text>
            <Card>
              <CardItem>
                <Left>
                  <Image source={{ uri: cover }} style={favoriteStyle.cover} />
                </Left>
                <Body style={favoriteStyle.topBody}>
                  <H1 style={favoriteStyle.title}>The Oddities Of Life</H1>
                  <H3 style={favoriteStyle.author}>Martin Bryres</H3>
                  <Badge>
                    <Text>Delete</Text>
                  </Badge>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Left>
                  <Image source={{ uri: cover }} style={favoriteStyle.cover} />
                </Left>
                <Body style={favoriteStyle.topBody}>
                  <H1 style={favoriteStyle.title}>The Oddities Of Life</H1>
                  <H3 style={favoriteStyle.author}>Martin Bryres</H3>
                  <Badge>
                    <Text>Delete</Text>
                  </Badge>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Left>
                  <Image source={{ uri: cover }} style={favoriteStyle.cover} />
                </Left>
                <Body style={favoriteStyle.topBody}>
                  <H1 style={favoriteStyle.title}>The Oddities Of Life</H1>
                  <H3 style={favoriteStyle.author}>Martin Bryres</H3>
                  <Badge>
                    <Text>Delete</Text>
                  </Badge>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </>
    );
  }
}

const favoriteStyle = StyleSheet.create({
  body: {
    padding: 15,
    marginBottom: 20,
  },
  search: {
    marginBottom: 30,
  },
  headTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: '#212529',
  },
  cover: {
    height: 160,
    width: null,
    marginRight: 15,
    flex: 1,
  },
  topBody: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#212529',
  },
  author: {
    fontSize: 16,
    marginVertical: 10,
  },
});
