import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'

export default class Ball extends React.PureComponent {
  componentWillMount () {
    this.position = new Animated.ValueXY(0, 0)
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 }
    }).start()
  }

  render () {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.container} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green'
  }
})
