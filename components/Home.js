import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';

class Home extends React.Component {
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
    title: 'DS Sonorisation',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width * 50 / 100;
    const imageHeight = Math.round(imageWidth * 340 / 462);

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
          <Image
            style={{ width: imageWidth, height: imageHeight }}
            source={require('../images/splashscreen/logo-small.png')}
          />
          <View style={styles.buttons}>
            <Button iconLeft block style={styles.button}
              onPress={() =>
                navigate('PhotosMime')
              }>
              <Icon name='images' />
              <Text>Photos-mime</Text>
            </Button>
            <Button iconLeft block success style={styles.button}
              onPress={() =>
                navigate('LiveCamera')
              }>
              <Icon name='videocam' />
              <Text>Live-Camera</Text>
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

export default Home;
