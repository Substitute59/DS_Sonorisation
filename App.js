import { Home, PhotosMime, LiveCamera } from './components/';
import { createStackNavigator } from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: Home },
  PhotosMime: { screen: PhotosMime },
  LiveCamera: { screen: LiveCamera },
});

export default App;
