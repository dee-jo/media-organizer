import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlaylistList from './components/playlist-list/PlaylistList';
import PlaylistsContextProvider from './store/context/playlists-context';
import PlaylistListScreen from './screens/PlaylistListScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import FileCategoryScreen from './screens/FileCategoryScreen';
import NewPlaylistScreen from './screens/NewPlaylistScreen';
import PlaylistViewScreen from './screens/PlaylistViewScreen';
import AddFileScreen from './screens/AddFileScreen';
import FileViewScreen from './screens/FileViewScreen';
import DirectoryViewScreen2 from './screens/DirectoryViewScreen2';
import DirectoryListScreen from './screens/DirectoryListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PlaylistsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PlaylistListScreen" component={PlaylistListScreen}/>
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="FileCategoryScreen" component={FileCategoryScreen} />
          <Stack.Screen name="NewPlaylistScreen" component={NewPlaylistScreen}/>
          <Stack.Screen name="PlaylistViewScreen" component={PlaylistViewScreen}/>
          <Stack.Screen name="AddFileScreen" component={AddFileScreen}/>
          <Stack.Screen name="FileViewScreen" component={FileViewScreen}/>
          <Stack.Screen name="DirectoryViewScreen2" component={DirectoryViewScreen2}/>
          <Stack.Screen name="DirectoryListScreen" component={DirectoryListScreen}/>
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
