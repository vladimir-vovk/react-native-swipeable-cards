# Swipable cards (React Native)

An expample of a swipable cards reusable component from the excellent "[React Native: Advanced Concepts](https://www.udemy.com/course/react-native-advanced/)" course by Stephen Grider.

![Cards example](./screen-1.gif)
![Loop scrolling](./screen-2.gif)

## Installation

1. Clone the repo
2. Change directory to the app `cd swipe`
3. Install all dependencies with `yarn install`
4. Run the app with `yarn start`

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
