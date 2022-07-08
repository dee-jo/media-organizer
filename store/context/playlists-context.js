import { createContext, useState } from 'react';

export const PlaylistsContext = createContext({
  playlists: [],
  categories: [],
  loadPlaylistState: () => {},
  loadCategoryState: () => {},
  addCategory: (category) => {},
  addPlaylist: (playlist) => {},
  addFilesToPlaylist: (playlistId, filelist) => {},
  changePlaylistName: (playlistId, newName) => {},
  removePlaylist: (playlistId, filelist) => {},
  addFileComment: (playlistId, fileId, comment) => {},
  addFileCategory: (playlistId, fileId, category) => {},
  addFileImage: (playlistId, fileId, imageURI) => {},
  deleteFile: (playlistId, fileId) => {},
  deletePlaylist: (playlistId) => {},
  deleteComment: (playlistId, fileId) => {}
});

const PlaylistsContextProvider = ({children}) => {
  const [ updatedFile, setUpdatedFile ] = useState(null);
  const [ categories, setCategories ] = useState([
    'rock', 'pop', 'dance', 'classical', 'house'
  ]);
  const [playlists, setPlaylists] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      playlistName: 'Playlist 1',
      dateCreated: new Date().toDateString(),
      description: 'blsdfjslkdfjiofosifjsiofjsddjsf hdasdfsifp  dfjaskfj jfklsjfkl',
      linkedFiles: []
    }, 
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad5888b28ba',
      playlistName: 'Playlist 2',
      dateCreated: new Date().toDateString(),
      description: 'blsdfjslkdfjiofosifjsiofjsdlk kfdjksdfjksjfksjfklsjfkl',
      linkedFiles: []
    }, 
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad70y3b28ba',
      playlistName: 'Playlist 3',
      dateCreated: new Date().toDateString(),
      description: 'blsdfjslkdffdsf sdfsdf',
      linkedFiles: []
  }
  ]);

  const loadPlaylistState = (playlists) => {
    setPlaylists(playlists);
  }

  const loadCategoryState = (categories) => {
    setCategories(categories);
  }

  const addCategory = (category) => {
    const categoryLower = category.toLowerCase();
    if (!categories.includes(categoryLower)) {
      setCategories([...categories, categoryLower])
      return true;
    }
    else {
      return false;
    }
  
  }

  const addPlaylist = (playlist) => {
    setPlaylists((currentPlaylists) => [...currentPlaylists, playlist]);
  }

  const removePlaylist = (id) => {
    setPlaylists((currentPlaylists) => 
      currentPlaylists.filter((playlist) => playlist.id !== id));
  }

  const filterFiles = (playlistId, filelist) => {
    const currentPlaylist = playlists.find(playlist => playlist.id === playlistId);
    const filteredFiles = [];
    filelist.forEach(newFile => {
      const found = currentPlaylist.linkedFiles.find(f => f.id === newFile.id);
      if (found === undefined) {
        filteredFiles.push(newFile);
      }
    })
    return filteredFiles;
    }

  const addFilesToPlaylist = (playlistId, filelist) => {
    const filteredFiles = filterFiles(playlistId, filelist); // don't add files twice
    const updatedFiles = [];
    filteredFiles.forEach((file) => {
      updatedFiles.push(
        {
          albumId: file.albumId,
          checked: 'false',
          creationTime: file.creationTime,
          duration: file.duration,
          filename: file.filename,
          id: file.id,
          mediaType: file.mediaType,
          modificationTime: file.modificationTime,
          uri: file.uri,
          category: [],
          comment: "",
          image: {
            name: "",
            imagePath: ""
          },
        },
      )
    });
    //console.log('playlist-context, addFiles, ', updatedFiles);
    
    //const updatedFiles = [];
    setPlaylists(currentPlaylists => {
      return currentPlaylists.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            linkedFiles: [
              ...playlist.linkedFiles,
              ...updatedFiles
            ]
          }
        } else {
          return {
            ...playlist
          }
        }
      });
    })

  }

  const changePlaylistName = (playlistId, newName) => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlistId === playlist.id) {
        return {
          ...playlist,
          playlistName: newName
        }
      }
      else {
        return {
          ...playlist
        }
      }
    })
    setPlaylists(updatedPlaylists);
  }

  const addFileCategory = (playlistId, fileId, categories) => {
    const updatedPlaylists = playlists.map(playlist => {
      //console.log('before updating category: ', playlist.linkedFiles);
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            linkedFiles: playlist.linkedFiles.map(lf => {
              if (lf.id === fileId) {
                return {
                  ...lf,
                  category: [
                    ...lf.category,
                    ...categories
                  ]
                }
              }
              else {
                return {
                  ...lf
                }
              }
            })
          }
        }
        else {
          return {
            ...playlist
          }
        }
      })
      //console.log(updatedFile);
      setPlaylists(updatedPlaylists);
      //return updatedFile;
  }

  const addFileComment = (playlistId, fileId, comment) => {
    const updatedPlaylists = playlists.map(playlist => {
      //console.log('before updating comment: ', playlist.linkedFiles);
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            linkedFiles: playlist.linkedFiles.map(lf => {
              if (lf.id === fileId) {
                const updated = {
                  ...lf,
                  comment
                }
                setUpdatedFile(updated)
                return updated;
              }
              else {
                return {
                  ...lf
                }
              }
            })
          }
        }
        else {
          return {
            ...playlist
          }
        }
      })
      console.log(updatedFile);
      setPlaylists(updatedPlaylists);
      return updatedFile;
  }
 
  const addFileImage = (playlistId, fileId, imageURI) => {
    const updatedPlaylists = playlists.map(playlist => {
     console.log('before updating image, imageURI: ', imageURI);
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            linkedFiles: playlist.linkedFiles.map(lf => {
              if (lf.id === fileId) {
                const updated = {
                  ...lf,
                  image: {
                    imagePath: imageURI
                  }
                }
                setUpdatedFile(updated)
                return updated;
              }
              else {
                return {
                  ...lf
                }
              }
            })
          }
        }
        else {
          return {
            ...playlist
          }
        }
      })
      //console.log('in addAddFileImage context, updatedFile: ', updatedFile);
      setPlaylists(updatedPlaylists);
      return updatedFile.image.imagePath;
  }

  const deleteFile = (playlistId, fileId) => {
    setPlaylists(currentPlaylists => {
        return currentPlaylists.map(playlist => {
          if (playlistId === playlist.id) {
              return {
                ...playlist,
                linkedFiles: playlist.linkedFiles.filter(file => file.id != fileId)
              }
          }
          else {
            return {
              ...playlist
            }
          }
        }
    )})

  }

  const deletePlaylist = (playlistId) => {
    setPlaylists(currentPlaylists => {
      return currentPlaylists.filter(playlist => playlist.id != playlistId);
    }
  )}

  const deleteComment = (playlistId, fileId) => {
    setPlaylists(currentPlaylists => {
      return currentPlaylists.map(playlist => {
        if (playlistId === playlist.id) {
          return {
            ...playlist,
            linkedFiles: playlist.linkedFiles.map(file => {
              if (file.id === fileId) {
                return {
                  ...file,
                  comment: ""
                }
              }
              else {
                return {
                  ...file
                }
              }

            })
          }
        } else {
          return {
            ...playlist
          }
        }
      })
    })
  }

  const value = {
    playlists: playlists,
    categories: categories,
    loadPlaylistState: loadPlaylistState,
    changePlaylistName: changePlaylistName,
    loadCategoryState: loadCategoryState,
    addCategory: addCategory,
    addPlaylist: addPlaylist,
    addFilesToPlaylist: addFilesToPlaylist,
    removePlaylist: removePlaylist,
    addFileCategory: addFileCategory,
    addFileComment: addFileComment,
    addFileImage: addFileImage,
    deleteFile: deleteFile,
    deletePlaylist: deletePlaylist,
    deleteComment: deleteComment
  };


  return (<PlaylistsContext.Provider value={value} >{children}</PlaylistsContext.Provider>);
}

export default PlaylistsContextProvider;