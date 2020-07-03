/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Button,
  Body,
  Container,
  Content,
  Left,
  List,
  ListItem,
  Thumbnail,
  Text,
  View,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
              <Text style={profileStyle.title}>Bilkis Ismail</Text>
              <Text style={profileStyle.desc}>lorem ipsum sir dolor amet lorem ipsum sir dolor amet lorem ipsum sir dolor amet</Text>
            </View>
            <List>
              <ListItem itemHeader first>
                <Text>Profile</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button info>
                    <Icon solid style={profileStyle.icon} name="envelope" />
                  </Button>
                </Left>
                <Body>
                  <Text>profile@web.com</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button info>
                    <Icon solid style={profileStyle.icon} name="birthday-cake" />
                  </Button>
                </Left>
                <Body>
                  <Text>20/07/2002</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button info>
                    <Icon solid style={profileStyle.icon} name="venus-mars" />
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
                  <Button info>
                    <Icon solid style={profileStyle.icon} name="facebook-f" />
                  </Button>
                </Left>
                <Body>
                  <Text>facebook/profile.com</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button info>
                    <Icon solid style={profileStyle.icon} name="instagram" />
                  </Button>
                </Left>
                <Body>
                  <Text>@profile</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button info>
                    <Icon solid style={profileStyle.icon} name="twitter" />
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
  icon: {
    fontSize: 15,
    color: '#fff',
  },
});
