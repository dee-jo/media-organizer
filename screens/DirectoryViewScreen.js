import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { useEffect, useState, useContext } from 'react';
import { findMediaFiles } from '../components/file-search/_fileSearch';
import { PlaylistsContext } from '../store/context/playlists-context';
// import { selectDirectory } from 'react-native-directory-picker';
// import { FilesInDirectoryList } from '../components/local-directories/FilesInDirectoryList';


const DirectoryViewScreen = ({route, navigation}) => {

  const playlistsContext = useContext(PlaylistsContext);
  const { playlistId } = route.params;
  console.log('playlistId in DirectoryViewScreen: ', playlistId);
  console.log('route.params: ', route.params);
  const { assetCount, id, title, type } = route.params;
  const [ dirId, setDirId ] = useState(id.toString());
  const [ dirTitle, setDirTitle ] = useState(title);
  const [ mediaType, setMediaType ] = useState('audio');
  const [ audioFiles, setAudioFiles ] = useState(null);
  const [ videoFiles, setVideoFiles ] = useState(null);
  const [ buttonValue, setButtonValue ] = useState('video');
  const [ audioAllSelected, setAudioAllSelected ] = useState(false);
  const [ videoAllSelected, setVideoAllSelected ] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, [])

  const fetchMedia = async () => {
    try {
      const files = await findMediaFiles(dirId);
      //console.log('fetched files', files);
      
      if (files.assets) { // check if 
        const filesWithChecked = files.assets.map(file => {
          return {
            ...file, 
            checked: false 
        }});
        console.log('checked property added to files: ', filesWithChecked);
        setAudioFiles(filesWithChecked.filter(file => file.mediaType === 'audio'));
        setVideoFiles(filesWithChecked.filter(file => file.mediaType === 'video'));
        // setVideoFiles(vf => {
        //   return files.assets.filter(file => file.mediaType === 'video');
        // });
      }

      //console.log('audio files: ', audioFiles);
      //console.log('video files: ', videoFiles);
        
    } catch (e) {
      console.log(`error while fetching files`);
    }
  }

  const onSelectAll = () => {
    if (mediaType === 'audio') {
      const audioFilesUpdated = audioFiles.map(af => {
        return {
          ...af,
          checked: af.checked ? af.checked = false : af.checked = true
        }
      })
      setAudioAllSelected(audioAllSelected ? false : true);
      setAudioFiles(audioFilesUpdated);
    }
    else if (mediaType === 'video') {
      const videoFilesUpdated = videoFiles.map(af => {
        return {
          ...af,
          checked: af.checked ? af.checked = false : af.checked = true
        }
      })
      setVideoAllSelected(videoAllSelected ? false : true);
      setVideoFiles(videoFilesUpdated);
    } 
   }

  const onCheckBoxPress = (file) => {
    console.log('file value in press handler:', file);
      if (file.mediaType === 'audio') {
        const audioFilesUpdated = audioFiles.map(af => {
          if (af.id === file.id) {
            return {
              ...af,
              checked: af.checked ? af.checked = false : af.checked = true
            }
          }
          return {...af}
          
        })
        console.log('audio files after changed checked status: ', audioFilesUpdated);
        setAudioFiles(audioFilesUpdated); 
        
      }
      else if (file.mediaType === 'video'){
        const videoFilesUpdated = videoFiles.map(af => {
          if (af.id === file.id) {
            return {
              ...af,
              checked: af.checked ? af.checked = false : af.checked = true
            }
          }
          return {...af}
          
        })
        console.log('video files after changed checked status: ', videoFilesUpdated);
        setVideoFiles(videoFilesUpdated); 
        
      }
  }
  
  const listAudio = () => {
    //console.log('in listAudio()');
    //console.log('audioFiles: ', audioFiles);
    return (
      <View>
        {audioAllSelected ? 
          <TouchableOpacity style={styles.button} onPress={onSelectAll}>
            <Text style={styles.button}>Clear All {mediaType}</Text>
          </TouchableOpacity>
        : <TouchableOpacity style={styles.button} onPress={onSelectAll}>
            <Text style={styles.button}>Select All {mediaType}</Text>
          </TouchableOpacity>}
      
        
          <ScrollView>
              
              {audioFiles && audioFiles.length > 0 ? 
                <>
                  {/* <Text style={styles.label}>Listing {mediaType} files in {dirTitle}</Text> */}
                  {audioFiles.map(file => {
                    return (
                      <CheckBox
                      //right
                      key={file.id}
                      title={file.filename}
                      // checkedIcon='dot-circle-o'
                      // uncheckedIcon='circle-o'
                      checked={file.checked}
                      onPress={()=>onCheckBoxPress({...file})}
                    />
                    // <Text key={file.id}>{file.filename}</Text>
                    )
                  })}
                </>
                : <Text> No audio files found in {dirTitle}</Text>}
        
          </ScrollView>
        </View>

      
    )
  }

  const listVideo = () => {
    return (
      <View>
        {videoAllSelected ? 
          <TouchableOpacity style={styles.button} onPress={onSelectAll}>
            <Text style={styles.text}>Clear All {mediaType}</Text>
          </TouchableOpacity>
        : <TouchableOpacity style={styles.button} onPress={onSelectAll}>
            <Text style={styles.text}>Select All {mediaType}</Text>
          </TouchableOpacity>}
      
        <ScrollView>
        {videoFiles && videoFiles.length > 0 ? 
            <>
              {videoFiles.map(file => {
                return (
                  <CheckBox
                  //right
                  key={file.id}
                  title={file.filename}
                  // checkedIcon='dot-circle-o'
                  // uncheckedIcon='circle-o'
                  checked={file.checked}
                  onPress={()=>onCheckBoxPress(file)}
                />
                // <Text key={file.id}>{file.filename}</Text>
                )
              } )}
            </>
            : <Text> No video files found in {dirTitle}</Text>}
        </ScrollView>
      </View>
    )
  }

  const onSaveToPlaylist = () => {
    if (mediaType === 'audio' && audioFiles.length > 0) {
      playlistsContext.addFilesToPlaylist(playlistId, audioFiles)
    }
    if (mediaType === 'video' && videoFiles.length > 0) {
      playlistsContext.addFilesToPlaylist(playlistId, videoFiles)
    }
  }

  const onMediaTypeChange = async() => {
    buttonValue === 'audio' ? setButtonValue('video') : setButtonValue('audio');
    mediaType === 'audio' ? setMediaType('video') : setMediaType('audio');
  }

  return(
    <View>
      <Text style={styles.label}>Listing {mediaType} files in {'\n'} {dirTitle}</Text>
      <TouchableOpacity style={styles.button} onPress={onMediaTypeChange}>
        <Text style={styles.text}>List {buttonValue} Files in {'\n'} {title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSaveToPlaylist}>
        <Text style={styles.text}>Save Selected to Playlist</Text>
      </TouchableOpacity>
      <Input
        placeholder='TYPE FILE EXTENTION TO FILTER FILES'
      />
      
      { mediaType === 'audio' ? listAudio() :listVideo() }
    </View>
  )
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

export default DirectoryViewScreen;