/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Container,
  Body,
  Left,
  Button,
  Icon,
  Content,
  Thumbnail,
  List,
  ListItem,
  Text,
  View,
} from 'native-base';
import { StyleSheet } from 'react-native';
import profile from '../../assets/image/icon.png';

export default class Profile extends Component {
  render() {
    return (
      <>
        <Container>
          <Content>
            <View style={profileStyle.head}>
              <Thumbnail large source={profile} />
              <Text style={profileStyle.title}>Profile Name</Text>
              <Text style={profileStyle.desc}>lorem ipsum sir dolor amet lorem ipsum sir dolor amet lorem ipsum sir dolor amet</Text>
            </View>
            <List>
              <ListItem itemHeader first>
                <Text>Profile</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button>
                    <Icon active name="paper-plane" />
                  </Button>
                </Left>
                <Body>
                  <Text>profile@web.com</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button>
                    <Icon active name="paper-plane" />
                  </Button>
                </Left>
                <Body>
                  <Text>20/07/2002</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button>
                    <Icon active name="paper-plane" />
                  </Button>
                </Left>
                <Body>
                  <Text>Male</Text>
                </Body>
              </ListItem>
              <ListItem itemHeader first>
                <Text>Social Media</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button>
                    <Icon active name="paper-plane" />
                  </Button>
                </Left>
                <Body>
                  <Text>facebook/profile.com</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button>
                    <Icon active name="paper-plane" />
                  </Button>
                </Left>
                <Body>
                  <Text>@profile</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button>
                    <Icon active name="paper-plane" />
                  </Button>
                </Left>
                <Body>
                  <Text>@profile</Text>
                </Body>
              </ListItem>
            </List>
          </Content>
        </Container>
      </>
    );
  }
}


const profileStyle = StyleSheet.create({
  head: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 10,
  },
  title: {
    color: '#0e1e40',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  desc: {
    color: '#0e1e40',
    textAlign: 'center',
  },
});
