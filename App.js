import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlaylistList from './components/playlist-list/PlaylistList';
import PlaylistsContextProvider from './store/context/playlists-context';
import PlaylistListScreen from './screens/PlaylistListScreen';
import NewPlaylistScreen from './screens/NewPlaylistScreen';
import PlaylistViewScreen from './screens/PlaylistViewScreen';
import AddFileScreen from './screens/AddFileScreen';
import FileViewScreen from './screens/FileViewScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PlaylistsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PlaylistListScreen" component={PlaylistListScreen}/>
          <Stack.Screen name="NewPlaylistScreen" component={NewPlaylistScreen}/>
          <Stack.Screen name="PlaylistViewScreen" component={PlaylistViewScreen}/>
          <Stack.Screen name="AddFileScreen" component={AddFileScreen}/>
          <Stack.Screen name="FileViewScreen" component={FileViewScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PlaylistsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
