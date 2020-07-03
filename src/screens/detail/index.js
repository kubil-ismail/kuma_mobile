/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Badge,
  Body,
  Container,
  Content,
  Card,
  CardItem,
  H1,
  H2,
  Text,
  View,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';

const cover = 'https://i.pinimg.com/474x/bb/e5/06/bbe5064a2e35032e7559e1e64a6195c7.jpg';

export default class Detail extends Component {
  render() {
    return (
      <>
        <Container>
          <Content>
            <View style={detailStyle.head}>
              <Image source={{ uri: cover }} style={detailStyle.cover} />
              <H1 style={detailStyle.title}>ODDITIES OF LIFES</H1>
              <Text style={detailStyle.author}>Martin Bryers</Text>
              <View style={{ flex:1, flexDirection: 'row', marginBottom: 20 }}>
                <Badge primary style={{ flex: 1 }}>
                  <Text>Fantasy</Text>
                </Badge>
                <Badge info style={{ flex: 1 }}>
                  <Text>English</Text>
                </Badge>
                <Badge warning style={{ flex: 1 }}>
                  <Text>available</Text>
                </Badge>
              </View>
              <H2 style={{ color:'#7f7f7f' }}>ABOUT</H2>
              <Text style={detailStyle.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vivamus tincidunt molestie leo, quis dignissim arcu viverra sit amet.
                Vestibulum quis risus nunc. Nullam sit amet nisi risus. Duis semper ultrices tempus.
                Quisque a vulputate ex, et suscipit risus. Vivamus finibus fringilla turpis,
                ac dictum libero iaculis vitae.
              </Text>
              <H2 style={{ color: '#7f7f7f', marginBottom: 10 }}>REVIEW</H2>
              <Card>
                <CardItem>
                  <Body>
                    <Text note>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus tincidunt molestie leo, quis dignissim arcu viverra sit amet.
                    </Text>
                  </Body>
                </CardItem>
                <CardItem footer>
                  <Text>GeekyAnts</Text>
                </CardItem>
              </Card>
            </View>
          </Content>
        </Container>
      </>
    );
  }
}

const detailStyle = StyleSheet.create({
  head: {
    padding: 15,
    alignContent: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  body: {
    padding: 15,
  },
  view: {
    marginVertical: 20,
  },
  cover: {
    height: 400,
    padding: 50,
  },
  title: {
    color: '#0e1e40',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  author: {
    color: '#7f7f7f',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  desc: {
    color: '#7f7f7f',
    fontSize: 17,
    textAlign: 'justify',
    marginTop: 10,
    marginBottom: 20,
  },
});
