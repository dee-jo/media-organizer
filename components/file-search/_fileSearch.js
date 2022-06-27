import * as MediaLibrary from 'expo-media-library';

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
    console.log('permission status: ', status);
    if (status === 'granted') {
      const localDirs = await MediaLibrary.getAlbumsAsync();
      //console.log(localDirs);
      return localDirs;
    }
   
  } catch(e) {
    console.log('error in fileSearch, getAllDirsOnDevice: ', e);
  }
}

  // console.log('all albums length: ', albums.length, albums);
  // console.log('----------');
  // let album = await MediaLibrary.getAlbumAsync(albums[0].title);
  // console.log('album[0]', album);
  // console.log('----------');


  // const findMediaFiles = async (mediaTypes, mediaSubtypes, dirID) => {
  //   try {
  //     let { status } = await MediaLibrary.requestPermissionsAsync()
  //     // getAllDirsOnDevice().then(albums => {
  //     //   console.log('all albums length: ', albums.length, albums);
  //     // console.log('----------');
  //     // }).catch(e => console.log('error while fetching device directories: ', e));
      
  //     // let album = await MediaLibrary.getAlbumAsync(albums[0].title);
  //     // console.log('album[0]', album);
  //     // console.log('----------');
  //     let mediaAssets = await MediaLibrary.getAssetsAsync({
  //       // album: dirID,
  //       mediaType: ['audio','video'],
  //     })
  //     let asset = await MediaLibrary.getAssetInfoAsync(mediaAssets.assets[0])
    
  //     console.log(asset);
  //     //return mediaAssets;
  //   } catch(e) {
  //     console.log(e)
  //   }
   
  // };

