/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Container,
  Body,
  Right,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
} from 'native-base';

export default class Favorite extends Component {
  render() {
    return (
      <>
        <Container>
          <Content>
            <List>
              <ListItem avatar onPress={() => this.props.navigation.navigate('detail')}>
                <Left>
                  <Thumbnail square large source={{ uri: 'https://store-images.s-microsoft.com/image/apps.28597.68843572048501388.669471cb-d7a3-4829-8dd3-971e31f52503.a726cd37-4249-45da-857b-1b3faaa3e1f3'}} />
                </Left>
                <Body>
                  <Text>Call of cthulhu</Text>
                  <Text note>horor</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
              <ListItem avatar onPress={() => this.props.navigation.navigate('detail')}>
                <Left>
                  <Thumbnail square large source={{ uri: 'https://store-images.s-microsoft.com/image/apps.28597.68843572048501388.669471cb-d7a3-4829-8dd3-971e31f52503.a726cd37-4249-45da-857b-1b3faaa3e1f3' }} />
                </Left>
                <Body>
                  <Text>Call of cthulhu part 3</Text>
                  <Text note>horor</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      </>
    );
  }
}
