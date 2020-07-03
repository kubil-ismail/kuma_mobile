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
  View,
} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image } from 'react-native';

const cover = 'https://i.pinimg.com/474x/bb/e5/06/bbe5064a2e35032e7559e1e64a6195c7.jpg';

export default class Home extends Component {
  render() {
    return (
      <>
        <Container style={homeStyle.parent}>
          <Content style={homeStyle.body}>
            {/* Search */}
            <Form style={homeStyle.search}>
              <Item regular>
                <Input placeholder="Search book..." />
                <Icon active name="search" />
              </Item>
            </Form>
            {/* Best Books */}
            <Text style={homeStyle.headTitle}>Best This Week</Text>
            <Card>
              <CardItem>
                <Left>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Left>
                <Body style={homeStyle.topBody}>
                  <H1 style={homeStyle.title}>The Oddities Of Life</H1>
                  <H3 style={homeStyle.author}>Martin Bryres</H3>
                  <Badge info>
                    <Text>Fantasy</Text>
                  </Badge>
                </Body>
              </CardItem>
            </Card>
            {/* Head Title */}
            <View style={homeStyle.headView}>
              <Grid>
                <Col>
                  <Text style={homeStyle.headTitle}>Popular Book</Text>
                </Col>
                <Col>
                  <Text
                    style={homeStyle.viewMore}
                    onPress={() => this.props.navigation.navigate('book')}
                  >
                    See All
                  </Text>
                </Col>
              </Grid>
            </View>
            {/* Book Row */}
            <View>
              <Grid>
                <Col onPress={() => this.props.navigation.navigate('detail')}>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Col>
                <Col>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Col>
                <Col>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Col>
              </Grid>
            </View>
            {/* Head Title */}
            <View style={homeStyle.headView}>
              <Grid>
                <Col>
                  <Text style={homeStyle.headTitle}>Fantasy Book</Text>
                </Col>
                <Text
                  style={homeStyle.viewMore}
                  onPress={() => this.props.navigation.navigate('book')}
                >
                  See All
                </Text>
              </Grid>
            </View>
            {/* Book Row */}
            <View>
              <Grid>
                <Col>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Col>
                <Col>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Col>
                <Col>
                  <Image source={{ uri: cover }} style={homeStyle.cover} />
                </Col>
              </Grid>
            </View>
          </Content>
        </Container>
      </>
    );
  }
}

const homeStyle = StyleSheet.create({
  header: {
    padding: 15,
  },
  body: {
    padding: 15,
    marginBottom: 20,
  },
  search: {
    marginBottom: 30,
  },
  headView: {
    marginVertical: 20,
  },
  headTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: '#212529',
  },
  viewMore: {
    textAlign: 'right',
    color: '#68c2e8',
    fontWeight: 'bold',
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
