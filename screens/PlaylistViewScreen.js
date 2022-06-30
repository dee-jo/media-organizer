import { View, Text, StyleSheet, Button as NativeButton, ScrollView } from 'react-native';
import Filelist from '../components/playlist-view/file-list/Filelist';
import { Button, Card, Input } from 'react-native-elements';
import { PlaylistsContext } from '../store/context/playlists-context';
import { useEffect, useContext, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const PlaylistViewScreen = ({route, navigation}) => {


  const { playlistId } = route.params;
  const isFocused = useIsFocused();
  const playlistContext = useContext(PlaylistsContext);
  const [currentPlaylist, setCurrentPlaylist ] = useState(playlistContext.playlists.find(list => list.id === playlistId));
  const [newName, setNewName] = useState("");
  const [ showPlaylistNameInput, setShowPlaylistNameInput ] = useState();

  useEffect(() => {
    isFocused && setCurrentPlaylist(playlistContext.playlists.find(list => list.id === playlistId))
  }, [isFocused, showPlaylistNameInput])

  //console.log('in PlaylistViewScreen, currentPlaylist: ', currentPlaylist);
  

  const onFindFilesPress = () => {
    //navigation.navigate("DirectoryListScreen", {playlistId: playlist.id});
    navigation.navigate("DirectoryListScreen", {playlist: currentPlaylist} );
  }

  const onFileSelect = (file) => {
    navigation.navigate("FileViewScreen", {...file, playlistId: currentPlaylist.id, playlistName: currentPlaylist.playlistName});
  }

  const saveNewPlaylistName = () => {
    //console.log("plalist id", playlistId);
    //console.log("new name: ", newName);
    if (showPlaylistNameInput) {
      playlistContext.changePlaylistName(playlistId, newName);
      // const updatedPlaylist = playlistContext.playlists.find(list => list.id === playlistId);
      // setCurrentPlaylist(updatedPlaylist);
      setShowPlaylistNameInput(false);
    }
    if (!showPlaylistNameInput) {
      setShowPlaylistNameInput(true);
    }
  }

  const onDeletePlaylist = () => {
    playlistContext.deletePlaylist(playlistId);
    navigation.navigate("PlaylistListScreen");
  }

  //console.log('after deleting a file on playlist:', playlistContext.playlists);
  return(
    <ScrollView>
    <Card>
      
      <Card.Title>Playlist Name: {currentPlaylist.playlistName}</Card.Title>
      {showPlaylistNameInput ? <Input
          onChangeText={(text)=>setNewName(text)}
          placeholder="Change name"
        /> : null}
      <NativeButton
        onPress={saveNewPlaylistName}
        title={showPlaylistNameInput ? "Save New Name":"Change Playlist Name"}
      />
      
      <Card.Divider/>
      {currentPlaylist.linkedFiles.length === 0
        ? <Card.Title>There are no files on this playlist</Card.Title>
        : null}
      <Card.Divider/>
      
      <NativeButton
        onPress={onDeletePlaylist}
        title="Delete Playlist"
        color="red"
      />
      <Card.Divider/>
      
      <Card.Divider/>
      <Button title={`Add Files`} type='outline' onPress={onFindFilesPress}/>
      <Card.Divider />
      {currentPlaylist.linkedFiles.length > 0 ? <Filelist playlistId={currentPlaylist.id} onFileSelect={onFileSelect} /> : null}

      </Card>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  }
});

export default PlaylistViewScreen;