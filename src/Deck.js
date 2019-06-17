/* @flow */

import React from 'react'
import { Dimensions, PanResponder, Animated } from 'react-native'

type Props = {
  data: [any],
  onSwipeLeft: (any) => void,
  onSwipeRight: (any) => void,
  loopScrolling: boolean,
  renderCard: (any) => void,
  renderNoMoreCards: () => void
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH / 4

export default class Deck extends React.Component<Props> {
  props: Props

  static defaultProps = {
    data: [],
    loopScrolling: true,
    renderCard: () => null,
    renderNoMoreCards: () => null,
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
  }

  constructor (props) {
    super(props)

    this.state = { index: 0 }

    this.position = new Animated.ValueXY()
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture
        this.position.setValue({ x: dx, y: dy })
      },
      onPanResponderRelease: (event, gesture) => {
        const { dx, vx } = gesture
        this._onPanResponderRelease({ dx, vx })
      }
    })
  }

  componentDidUpdate (prevProps) {
    const { data: prevData } = prevProps
    const { data } = this.props

    // Move to the first card if data prop was changed
    if (data !== prevData) {
      this.setState({ index: 0 })
    }
  }

  _onPanResponderRelease = ({ dx, vx }) => {
    const direction = dx > 0 ? 'right' : 'left'
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      const width = SCREEN_WIDTH * 1.5
      const duration = Math.min(400, width / Math.abs(vx))
      Animated.timing(this.position, {
        toValue: { x: (direction === 'right' ? 1 : -1) * width, y: 0 },
        duration
      }).start(() => this._onSwipeComplete(direction))
    } else {
      Animated.spring(this.position, {
        toValue: { x: 0, y: 0 },
        duration: 1500
      }).start()
    }
  }

  _onSwipeComplete = direction => {
    const { onSwipeLeft, onSwipeRight, data, loopScrolling } = this.props
    const { index } = this.state
    const item = data[index]

    let nextIndex = index + 1
    if (loopScrolling) {
      nextIndex = index + 1 > data.length - 1 ? 0 : index + 1
    }

    this.setState({ index: nextIndex })
    this.position.setValue({ x: 0, y: 0 })
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
  }

  _getCardStyle = () => {
    const { position } = this
    const { data } = this.props

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 3, 0, SCREEN_WIDTH * 3],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      // ...position.getLayout(),
      position: 'absolute',
      width: '100%',
      zIndex: data.length,
      left: position.x,
      transform: [{ rotate }]
    }
  }

  render () {
    const { data, loopScrolling, renderCard, renderNoMoreCards } = this.props
    const { index } = this.state

    /* All cards scrolled and loop scrolling off */
    if (index === data.length) {
      return renderNoMoreCards()
    }

    const indexes = []
    for (let i = index; i < data.length; i++) {
      indexes.push(i)
    }
    for (let i = 0; i < index; i++) {
      indexes.push(i)
    }

    return data.map((card, i) => {
      /* Do not render previous cards if loop scrolling off */
      if (!loopScrolling && i < index) {
        return null
      }

      if (i === index) {
        return (
          <Animated.View
            key={String(i)}
            style={this._getCardStyle()}
            {...this.panResponder.panHandlers}
          >
            {renderCard(card)}
          </Animated.View>
        )
      }

      return (
        <Animated.View
          key={String(i)}
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: data.length - indexes.indexOf(i)
          }}
        >
          {renderCard(card)}
        </Animated.View>
      )
    })
  }
}
