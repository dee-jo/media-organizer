import { View, Text, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
//import DocumentPicker from 'react-native-document-picker';
import * as MediaLibrary from 'expo-media-library'
import ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
// import Permissions from 'react-native-permissions';
import PermissionsAndroidComponent from '../components/permissions/PermissionsAndroidComponent';

import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';



const AddFileScreen = ({route, navigation}) => {

  const { playlistId } = route.params;
  const [ file, setFile ] = useState('');
  const [ filePermission, setFilePermission ] = useState('');

// useEffect(()=> {
//   try {

//     const cUri = await FileSystem.getContentUriAsync(uri);
               
//     await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
//         data: cUri,
//         flags: 1,
//         type: "application/pdf",
//     });
//   }catch(e){
//       console.log(e.message);
//   }
// })


  

  // useEffect(() => {
  //   if(Platform.OS === 'ios') {
  //     const { status } = DocumentPicker.getDocumentAsync({
  //       copyToCacheDirectory: true,
  //       type: 'audio/*'
  //     });
  //   }
  // },[]);

  // useEffect(()=>{
  //   Permissions.request('storage').then(response => {
  //     setFilePermission(response)
  //   })
  // },[]);

  // const pickDirectory = async () => {
  //   try {
  //     const dirURI = await DocumentPicker.pickDirectory();
  //     console.log(dirURI);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  const selectFile = async () => {
    try {
      DocumentPicker.pickDirectory()
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: '*/*'
      }
    );

    const uri = FileSystem.documentDirectory+result.name;

    await FileSystem.moveAsync({
      from: result.uri,
      to: uri
    })

    // const fileInfo = await FileSystem.getContentUriAsync(uri);
    const fileInfo = await FileSystem.getContentUriAsync(uri);
    console.log(fileInfo);
    // result: {
    //   "mimeType": "audio/mp4",
    //   "name": "Wśród Nocnej Ciszy",
    //   "size": 2679567,
    //   "type": "success",
    //   "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmedia-organizer-1d12d077-fb12-4fb7-b287-6a3422246bee/DocumentPicker/1ea6bc7a-aa5a-4cd4-b264-13215670d233.",
    // }
    if (result.type !== 'cancel') {
      console.log(result.uri);
      setFile(result.file);
    }
  }

  const documentPick = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type:[DocumentPicker.types.allFiles]
      });
      console.log(
        res.uri, res.type, res.name, res.size
      )
    } catch (e) {
      console.log('documentPick error: ', e);
    }
  }


  return(
    <View>
      <Text>Hello from Pick File Screen</Text>
      {/* <PermissionsAndroidComponent /> */}
      <Button title="Pick File" type='outline' onPress={pickFile}/>
      {/* <PlaySound/> */}
    </View>
  )
}

export default AddFileScreen;