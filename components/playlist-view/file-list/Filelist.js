import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements';
import { useContext, useEffect, useState } from 'react';
import { PlaylistsContext } from '../../../store/context/playlists-context';
import { useIsFocused } from '@react-navigation/native';


const Filelist = ({ playlistId, onFileSelect }) => {
  const isFocused = useIsFocused();
  const playlistsContext = useContext(PlaylistsContext);
  const [ linkedFiles, setLinkedFiles ] = useState([]);
  const [ editPlaylistName, setEditPlaylistName ] = useState(false);
  

  useEffect(() => {
    if (isFocused) {
      const linkedFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
      const filterFiles = linkedFiles.sort((a,b) => (a.filename > b.filename) ? 1 : ((b.filename > a.filename) ? -1 : 0));
      setLinkedFiles(filterFiles);
    };
  }, [isFocused]);

  const onEditPlaylistName = () => {
    setEditPlaylistName(true);
  }

  const onUpdatePlaylistName = () => {
    setEditPlaylistName(false);
  }
  
  return(
    // <GenericSelectableList onItemSelect={onFileSelect} fileList={linkedFiles} playlistId={playlistId} />
    <Card>
    {linkedFiles.length > 0 ? <Card.Title onPress={onEditPlaylistName}>FILES ON THIS PLAYLIST</Card.Title> : <Card.Title>THERE ARE NO FILES ON THIS PLAYLIST</Card.Title>}
    <Card.Divider/>
    <ScrollView>
    {linkedFiles.length > 0 ?
      linkedFiles.map((file, i) => {
        const uri = file.uri.replace(/([^\/]*\/){6}/, '')
        return (
          <ListItem key={file.id} bottomDivider onPress={()=>onFileSelect(file)}>
            {file.image.imagePath ? <Avatar source={{uri: file.image.imagePath}} /> : null}
            <ListItem.Content>
              <ListItem.Title>{file.filename}</ListItem.Title>
              <ListItem.Subtitle>{uri}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      }) : <Text>There are no files on this playlist!</Text>
    }

    </ScrollView>

    </Card>
  )
}

export default Filelist;
