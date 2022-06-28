import { StyleSheet, Text, SafeAreaView, SectionList, FlatList, View, TouchableOpacity, StatusBar } from 'react-native';
import { useContext, useState } from 'react';
import { PlaylistsContext } from '../../store/context/playlists-context';


const PlaylistList = ({onPlaylistSelect}) => {
  const playlistsContext = useContext(PlaylistsContext);
  const playlists = playlistsContext.playlists;

  const [selectedId, setSelectedId] = useState(null);

  const onPlaylistClicked = (playlist) => {
    setSelectedId(playlist.id);
    onPlaylistSelect(playlist);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        playlistName={item.playlistName}
        item={item}
        onPress={() => onPlaylistClicked(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  }

  const Item = ({ item, onPress, backgroundColor, textColor, playlistName }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{playlistName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container_1}>
      <FlatList
        data={playlists}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container_1: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default PlaylistList;