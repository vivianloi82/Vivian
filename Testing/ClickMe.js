import React, { PureComponent } from 'react'
import {  Text, View, Button } from 'react-native'
//import Button from './packages/Button'

import ImageActionSheet from './packages/ImageActionSheet'

export default class ImageActionSheetWrapper extends PureComponent {
  state = {
    visible: false
  }

  render() {
    const { visible } = this.state

    return (
      <View style={{marginTop:100}} >
         
        <Button   onPress={() => {
            this.setState({ visible: true })
          }}
          color='black'
        
          title='Click me'></Button>
        <ImageActionSheet
          onDismiss={() => this.setState({ visible: false })}
          onSelect={image => console.log(image)}
          visible={visible}
        />
      </View>
    )
  }
}
