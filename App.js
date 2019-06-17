import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Card, Button } from 'react-native-elements'
import Deck from './src/Deck'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' }
]

export default class App extends React.Component {
  renderCard ({ id, text, uri }) {
    return (
      <Card
        key={id}
        title={text}
        image={{ uri }}
      >
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure then actual design
        </Text>
        <Button
          icon={{ name: 'code', color: 'white' }}
          backgroundColor='#03A9F4'
          title='View Now!'
        />
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return (
      <Card>
        <Text h2>No more cards left</Text>
      </Card>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Deck
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          data={DATA}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
