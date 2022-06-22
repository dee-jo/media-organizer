import { View, Text, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { PlaylistsContext } from '../../../store/context/playlists-context';
import GenericSelectableList from '../../generic/GenericSelectableList';


const Filelist = ({ playlistId, onFileSelect }) => {
  const playlistsContext = useContext(PlaylistsContext);
  const linkedFiles = playlistsContext.playlists.find(playlist => playlist.id === playlistId).linkedFiles;
  
  return(
    <GenericSelectableList onItemSelect={onFileSelect} list={linkedFiles} />
  )
}

export default Filelist;
