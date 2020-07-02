/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Container,
  View,
  Badge,
  Content,
  Text,
} from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native';
import Book from '../../components/atoms/book';

export default class Home extends Component {
  render() {
    return (
      <>
        <Container>
          <Content style={homeStyle.body}>
            {/* Popular Books */}
            <View>
              <Text style={homeStyle.title}>Popular Books</Text>
              <Grid>
                {/* Col */}
                <Col style={homeStyle.coloumn} onPress={() => this.props.navigation.navigate('detail')}>
                  <Book />
                </Col>
                {/* Col */}
                <Col style={homeStyle.coloumn}>
                  <Book />
                </Col>
                {/* Col */}
                <Col style={homeStyle.coloumn}>
                  <Book />
                </Col>
              </Grid>
            </View>
            {/* New Collections */}
            <View style={homeStyle.view}>
              <Text style={homeStyle.title}>New books</Text>
              <Grid>
                {/* Col */}
                <Col style={homeStyle.coloumn}>
                  <Book />
                </Col>
                {/* Col */}
                <Col style={homeStyle.coloumn}>
                  <Book />
                </Col>
                {/* Col */}
                <Col style={homeStyle.coloumn}>
                  <Book />
                </Col>
              </Grid>
            </View>
            {/* Category */}
            <View style={homeStyle.view}>
              <Text style={homeStyle.title}>More Category</Text>
              <Grid style={homeStyle.grid}>
                <Badge primary style={homeStyle.coloumn}>
                  <Text>Fantasy</Text>
                </Badge>
                <Badge primary style={homeStyle.coloumn}>
                  <Text>Horror</Text>
                </Badge>
                <Badge primary style={homeStyle.coloumn}>
                  <Text>Romance</Text>
                </Badge>
                <Badge primary style={homeStyle.coloumn}>
                  <Text>Adventure</Text>
                </Badge>
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
  },
  view: {
    marginVertical: 20,
  },
  coloumn: {
    margin: 5,
  },
  grid: {
    marginTop: 10,
  },
  title: {
    margin: 5,
    color: '#0e1e40',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
