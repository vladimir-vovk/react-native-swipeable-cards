# React Native Swipeable Cards

An expample of a swipeable cards reusable component from the excellent "[React Native: Advanced Concepts](https://www.udemy.com/course/react-native-advanced/)" course by Stephen Grider. Built with React Native, Expo and Animated module.

![Cards example](./screen-1.gif)
![Loop scrolling](./screen-2.gif)

## Installation

1. Clone the repo
2. Change directory to the app: `cd react-native-swipeable-cards`
3. Install all dependencies: `yarn install`
4. Run the app: `yarn start`

## Supported Props

```
type Props = {
  data: [any], // an array of any data you need to render a card
  onSwipeLeft: (card: any) => void, // on swipe left callback
  onSwipeRight: (card: any) => void, // on swipe right callback
  loopScrolling: boolean, // loop scrolling mode (go to the first card when no more cards left)
  renderCard: (any) => any, // take card data as a param, returns card component
  renderNoMoreCards: () => any // renders component when no more cards left
}
```
