import { View, Text, Image, Input } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const FileCard = ({file}) => {

  return (
      <Card>
      <Card.Title>File Name: {file.filename}</Card.Title>
      <Card.Divider/>
      <Card.Title>Playlist Name: {file.playlistName}</Card.Title>
      <Card.Divider/>
      <Card.Title>Media Type: {file.mediaType}</Card.Title>
      <Card.Divider/>
      <Input
          onTextInput={onCategoryInput}
          placeholder={file.category ? file.category : 'Add File Category'}
        />
      <Card.Divider/>
      <Input
        onTextInput={onCommentInput}
        placeholder={file.comment ? file.comment : 'Add File Comment'}
      />
      {/* <Card.Image source={require('../images/pic2.jpg')} /> */}
      <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
      </Text>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='VIEW NOW' />
    </Card>
  )
 
}

export default FileCard;
