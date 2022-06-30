import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Card, CheckBox, Input } from 'react-native-elements';
import { useEffect, useState, useContext } from 'react';
import { findMediaFiles } from '../components/file-search/_fileSearch';
import { PlaylistsContext } from '../store/context/playlists-context';


const DirectoryViewScreen2 = ({route, navigation}) => {

  const { playlist } = route.params;
  const { assetCount, id, title, type } = route.params;

  const [ audioFiles, setAudioFiles ] = useState(null);
  const [ videoFiles, setVideoFiles ] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);
  
  const fetchMedia = async () => {
    try {
      const files = await findMediaFiles(id);
      // add checked property to files loaded from device
      if (files.assets) { 
        const filesWithChecked = files.assets.map(file => {
          return {
            ...file, 
            checked: false 
        }});
        //console.log('checked property added to files: ', filesWithChecked);
  
        setAudioFiles(filesWithChecked.filter(file => file.mediaType === 'audio'));
        setVideoFiles(filesWithChecked.filter(file => file.mediaType === 'video'));
      }
  
      //console.log('audio files: ', audioFiles);
      //console.log('video files: ', videoFiles);
        
    } catch (e) {
      console.log(`error while fetching files`);
    }
  }

  return (
    <ScrollView>
        {audioFiles ? <AudioFiles audioFiles={audioFiles} dirTitle={title} playlist={playlist} navigation={navigation} /> : null}
        {videoFiles ? <VideoFiles videoFiles={videoFiles} dirTitle={title} playlist={playlist} navigation={navigation} /> : null}
    </ScrollView>
  )
}



export default DirectoryViewScreen2;



export const AudioFiles = ({audioFiles, dirTitle, playlist, navigation}) => {
  const [ selectAllAudio, setSelectAllAudio ] = useState(false);
  const [ filteredAudio, setFilteredAudio ] = useState([]);
  const [ filterInput, setFilterInput ] = useState("");
  //const [ selected, setSelected ] = useState([]);
  const playlistsContext = useContext(PlaylistsContext);

  useEffect(() => {
    filterExtensions("");
  }, [])

  const filterExtensions = (text) => {
    console.log('filter extentions text', text)
    setFilterInput(text);
       
    if (text != "") {
      const filtered = audioFiles.filter(file => {
        const fileExtention = file.filename.split('.').pop();
        return text.toLowerCase() === fileExtention;
      })
      setFilteredAudio(filtered);
    }
    else  {
      // reset to show all autio whe input empty
      setFilteredAudio(audioFiles);
    }
  }
  

  const listFilteredAudio = () => {

      return (
        <View>
          {selectAllAudio ? 
            <TouchableOpacity style={styles.button} onPress={onAllSelectionChange}>
              <Text style={styles.button}>Clear All</Text>
            </TouchableOpacity>
          : <TouchableOpacity style={styles.button} onPress={onAllSelectionChange}>
              <Text style={styles.button}>Select All</Text>
            </TouchableOpacity>}
        
          
            <ScrollView>
                
                {filteredAudio && filteredAudio.length > 0 ? 
                  <>
                    {/* <Text style={styles.label}>Listing {mediaType} files in {dirTitle}</Text> */}
                    {filteredAudio.map(file => {
                      return (
                        <CheckBox
                        key={file.id}
                        title={file.filename}
                        checked={file.checked}
                        onPress={()=>onCheckBoxPress(file.id)}
                      />
                      )
                    })}
                  </>
                  : <Text> No audio files found in {dirTitle}</Text>}
          
            </ScrollView>
          </View> 
      )
    }

  const onSaveToPlaylist = () => {
      const selectedFiles = filteredAudio.filter(file => file.checked);
      playlistsContext.addFilesToPlaylist(playlist.id, selectedFiles);
      navigation.navigate("PlaylistViewScreen", {playlistId: playlist.id});
  }

  const onAllSelectionChange = () => {

      if (!selectAllAudio) {
        setSelectAllAudio(true);
        setFilteredAudio(filteredAudio.map(file => {
          return {
            ...file,
            checked: true
          }
        }
      ))
      }
      else {
        setSelectAllAudio(false);
        setFilteredAudio(filteredAudio.map(file => {
          return {
            ...file,
            checked: false
          }
        }))
      }
   }

  const onCheckBoxPress = (fileId) => {
    console.log('checkbox pressed: ', )
    const updatedAudio = filteredAudio.map(file => {
      if (file.id === fileId) {
        return {
          ...file,
          checked: file.checked ? false : true
        }
      }
      else {
        return {
          ...file
        }
      }
    })
    setFilteredAudio(updatedAudio);
  }

  return (
    <Card>
    <Card.Title style={styles.label}> AUDIO Files In {dirTitle}</Card.Title>

    <ExtTextInput
        numberOfLines={1}
        placeholder="TYPE TO FILTER FILES BY EXTENSION"
        onChangeText={text => filterExtensions(text)}
        onFocus={()=>setFilterInput("")}
        value={filterInput}
        style={{padding: 10, backgroundColor: '#f0f0ed'}}
      />
      <Card.Divider />

      <TouchableOpacity style={styles.button} onPress={onSaveToPlaylist}>
        <Text style={styles.text}>Save to {playlist.playlistName}</Text>
      </TouchableOpacity>
      <Card.Divider/>
    
    {listFilteredAudio()}
  
    </Card>
  )
}


export const VideoFiles = ({videoFiles, dirTitle, playlist, navigation}) => {
  
  const [ selectAllVideo, setSelectAllVideo ] = useState(false);
  const [ filteredVideo, setFilteredVideo ] = useState([]);
  const [ filterInput, setFilterInput ] = useState("");
  //const [ selected, setSelected ] = useState([]);
  const playlistsContext = useContext(PlaylistsContext);

  useEffect(() => {
    filterExtensions("");
  }, [])

  const filterExtensions = (text) => {
    console.log('filter extentions text', text)
    setFilterInput(text);
       
    if (text != "") {
      const filtered = videoFiles.filter(file => {
        const fileExtention = file.filename.split('.').pop();
        return text.toLowerCase() === fileExtention;
      })
      setFilteredVideo(filtered);
    }
    else  {
      setFilteredVideo(videoFiles);
    }
  }
  

  const listFilteredVideo = () => {

      return (
        <View>
          {selectAllVideo ? 
            <TouchableOpacity style={styles.button} onPress={onAllSelectionChange}>
              <Text style={styles.button}>Clear All</Text>
            </TouchableOpacity>
          : <TouchableOpacity style={styles.button} onPress={onAllSelectionChange}>
              <Text style={styles.button}>Select All</Text>
            </TouchableOpacity>}
        
          
            <ScrollView>
                
                {filteredVideo && filteredVideo.length > 0 ? 
                  <>
                    {/* <Text style={styles.label}>Listing {mediaType} files in {dirTitle}</Text> */}
                    {filteredVideo.map(file => {
                      return (
                        <CheckBox
                        key={file.id}
                        title={file.filename}
                        checked={file.checked}
                        onPress={()=>onCheckBoxPress(file.id)}
                      />
                      )
                    })}
                  </>
                  : <Text> No video files found in {dirTitle}</Text>}
          
            </ScrollView>
          </View> 
      )
    }

  const onSaveToPlaylist = () => {
    const selectedFiles = filteredVideo.filter(file => file.checked);
      playlistsContext.addFilesToPlaylist(playlist.id, filteredVideo);
      navigation.navigate("PlaylistViewScreen", {playlistId: playlist.id});
  }

  const onAllSelectionChange = () => {

      if (!selectAllVideo) {
        setSelectAllVideo(true);
        setFilteredVideo(filteredVideo.map(file => {
          return {
            ...file,
            checked: true
          }
        }
      ))
      }
      else {
        setSelectAllVideo(false);
        setFilteredVideo(filteredVideo.map(file => {
          return {
            ...file,
            checked: false
          }
        }))
      }
   }

  const onCheckBoxPress = (fileId) => {
    const updatedVideo = filteredVideo.map(file => {
      if (file.id === fileId) {
        return {
          ...file,
          checked: file.checked ? false : true
        }
      }
      else {
        return {
          ...file
        }
      }
    })
    setFilteredVideo(updatedVideo);
  }

  return (
    <Card>
    <Card.Title style={styles.label}> VIDEO Files In {dirTitle}</Card.Title>

    <ExtTextInput
        numberOfLines={1}
        placeholder="TYPE TO FILTER FILES BY EXTENSION"
        onChangeText={text => filterExtensions(text)}
        onFocus={()=>setFilterInput("")}
        value={filterInput}
        style={{padding: 10, backgroundColor: '#f0f0ed'}}
      />
      <Card.Divider />

      <TouchableOpacity style={styles.button} onPress={onSaveToPlaylist}>
        <Text style={styles.text}>Save to {playlist.playlistName}</Text>
      </TouchableOpacity>
      <Card.Divider/>
    
    {listFilteredVideo()}
  
    </Card>
  )
}

export const ExtTextInput = (props) => {

  return (
    <TextInput
      {...props} 
      editable
      maxLength={40}
    />)
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 20,
    fontSize: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  }

})