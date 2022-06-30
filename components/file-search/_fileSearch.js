import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export const findMediaFiles = async (dirId) => {
  //console.log('dirId: ', dirId)
  //console.log('type: ', typeof dirId)
  const options = {
    album: dirId,
    mediaType: ['audio', 'video'],
  }
  try {
    let mediaAssets = await MediaLibrary.getAssetsAsync(options)
  let asset = await MediaLibrary.getAssetInfoAsync(mediaAssets.assets[0])

  //console.log(asset);
  return mediaAssets;
  } catch (e) {
    console.log('error in fileSearch: ', e);
  } 
  
};

export const getAllDirsOnDevice = async () => {
  try {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    //console.log('permission status: ', status);
    if (status === 'granted') {
      const localDirs = await MediaLibrary.getAlbumsAsync();
      //console.log(localDirs);
      return localDirs;
    }
   
  } catch(e) {
    console.log('error in fileSearch, getAllDirsOnDevice: ', e);
  }
}




export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  return result;
};
