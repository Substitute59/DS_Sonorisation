import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Image, Dimensions, Modal } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import images from '../assets/photos';

class PhotosMime extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      photos: [],
      modalVisible: true,
      score: 0,
      timer: '03:00',
      counter: 0
    };
  }

  async componentWillMount() {
    let photos = preval`
      const fs = require('fs');
      const path = require('path');
      const photos = fs.readdirSync(path.resolve(__dirname, '../images/photos'));
      let ex = '{\\n';
        photos.forEach((item) => {
          ex += '"' + item + '": require("../../images/photos/' + item + '"), \\n';
        });
        ex += '}';
      const res = "export default " + ex;
      fs.writeFileSync(path.resolve(__dirname, '../assets/photos/index.js'), res);
      module.exports = photos;
    `;

    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({
      isReady: true,
      photos
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  shuffle = (o) => {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  startTimer(duration) {
    let timer = duration, minutes, seconds;
    const that = this;
    that.setState({
      score: 0,
      photos: this.shuffle(this.state.photos),
      currentImage: images[this.state.photos[this.state.counter]]
    });
    let interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      that.setState({
        timer: minutes + ":" + seconds
      });

      if (--timer < 0) {
        clearInterval(interval);
        that.setState({
          timer: '03:00'
        });
        that.setModalVisible(!that.state.modalVisible);
      }
    }, 1000);
  }

  updateCounter(action) {
    if(action === 'add') {
      this.setState({
        score: this.state.score + 1
      });
    } else {
      this.setState({
        score: this.state.score - 1 >= 0 ? this.state.score - 1 : 0
      });
    }
    const counter = this.state.counter + 1;
    this.setState({
      counter,
      currentImage: images[this.state.photos[counter]]
    })
  }

  render() {
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width * 80 / 100;

    if (!this.state.isReady) {
      return (
        <View style={styles.content}>
          <Spinner color='#ccc' />
        </View>
      );
    }
    return (
      <Container>
        <View style={styles.mainContent}>
          <Modal
            visible={this.state.modalVisible}
            onRequestClose={() => {
            }}>
            <View style={styles.content}>
              {this.state.score > 0 ? (
                <Text style={styles.scoreBig}>{this.state.score} {this.state.score > 1 ? 'points' : 'point'}</Text>
              ) : ( null )}
              <Button iconLeft block success style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.startTimer(180);
                }}>
                <Icon name='play' />
                <Text>Démarrer</Text>
              </Button>
            </View>
          </Modal>
          <View style={styles.buttons}>
            <Grid>
              <Col size={1} style={styles.timer}>
                <Text>{this.state.timer}</Text>
              </Col>
              <Col size={2}></Col>
              <Col size={1} style={styles.score}>
                <Text>{this.state.score} {this.state.score > 1 ? 'points' : 'point'}</Text>
              </Col>
            </Grid>
          </View>
          <Image
            style={{ width: imageWidth, height: imageWidth }}
            source={this.state.currentImage}
            resizeMode="contain"
          />
          <View style={styles.buttons}>
            <Button iconLeft block style={styles.button}
              onPress={() => {
                  this.updateCounter('add');
                }}>
              <Icon name='checkmark' />
              <Text>Bonne réponse (+1 point)</Text>
            </Button>
            <Button iconLeft block danger style={styles.button}
              onPress={() => {
                  this.updateCounter('remove');
                }}>
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
  mainContent: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  timer: {
    padding: 10,
    height: 50,
  },
  score: {
    alignItems: 'flex-end',
    padding: 10,
    height: 50,
  },
  scoreBig: {
    fontSize: 20,
  },
});

export default PhotosMime;
