import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';

class PhotosMime extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({
      isReady: true
    });
  }

  static navigationOptions = {
    title: 'Photos-Mime',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <View style={styles.content}>
          <Spinner color='#ccc' />
        </View>
      );
    }
    return (
      <Container>
        <View style={styles.content}>
          <View style={styles.buttons}>
            <Button iconLeft block style={styles.button}>
              <Icon name='checkmark' />
              <Text>Bonne réponse (+1 point)</Text>
            </Button>
            <Button iconLeft block success style={styles.button}>
              <Icon name='close' />
              <Text>Passer (-1 point)</Text>
            </Button>
          </View>
        </View>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>&copy; Labo Web France</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttons: {
    alignSelf: 'stretch',
  },
  button: {
    margin: 10,
  },
});

export default PhotosMime;
