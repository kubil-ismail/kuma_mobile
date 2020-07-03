/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Icon,
  Item,
  Input,
  Text,
  View,
} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image } from 'react-native';

const cover = 'https://i.pinimg.com/474x/bb/e5/06/bbe5064a2e35032e7559e1e64a6195c7.jpg';

export default class Books extends Component {
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
            {/* Head Title */}
            <View style={homeStyle.headView}>
              <Grid>
                <Col>
                  <Text style={homeStyle.headTitle}>List Book</Text>
                </Col>
                {/* <Col>
                  <Text style={homeStyle.viewMore}>See All</Text>
                </Col> */}
              </Grid>
            </View>
            {/* Book Row */}
            <View style={homeStyle.bookRow}>
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
            {/* Book Row */}
            <View style={homeStyle.bookRow}>
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
            {/* Book Row */}
            <View style={homeStyle.bookRow}>
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
    marginBottom: 20,
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
  cover: {
    height: 160,
    width: null,
    marginRight: 15,
    flex: 1,
  },
  bookRow: {
    marginBottom: 25,
  },
});
