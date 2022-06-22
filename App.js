import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlaylistList from './components/playlist-list/PlaylistList';
import PlaylistsContextProvider from './store/context/playlists-context';


const App = () => {
  return (
    <PlaylistsContextProvider>
      <View style={styles.container}>
        <PlaylistList />
      </View>
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
