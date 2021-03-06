import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Modal } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Camera, Permissions, FileSystem } from 'expo';
import { Text, Spinner } from 'native-base';

class LiveCamera extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      gestureName: 'none'
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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
    title: 'Live-Camera',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1
    }
  };

  onSwipeLeft() {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }

  onSwipeRight() {
    this.snap();
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
        .then(data => {
          const filename = new Date().getTime() + '.jpg';
          const image = Expo.FileSystem.documentDirectory + filename;
          console.log(image);

          Expo.FileSystem.copyAsync({
            from: data.uri,
            to: image
          });
        });
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
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
      return (
        <GestureRecognizer
          onSwipeLeft={() => this.onSwipeLeft()}
          onSwipeRight={() => this.onSwipeRight()}
          config={config}>
          <View style={{flex: 1}}>
            <Modal
              onRequestClose={() => {
              }}>
              <Camera ref={ref => {this.camera = ref;}} style={{flex: 1}} type={this.state.type}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                </View>
              </Camera>
            </Modal>
          </View>
        </GestureRecognizer>
      );
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LiveCamera;
