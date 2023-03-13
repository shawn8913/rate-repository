import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

import useReviews from '../hooks/useReview'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#e1e4e8',
    justifyContent: 'flex-start',
  },
  separator: {
    height: 10,
  },
  searchKeywordContainer: {
    paddingVertical: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export class ReviewListContainer extends React.Component {
  render() {
    const result = useReviews()
    if (result === null) {
      return
    }

    const reviews = result.data.me.reviews
    const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []
    const refetch = result.refetch

    return (
      <View style={styles.listContainer}>
        <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ReviewItem review={item} context={'user'} refetch={refetch} />
          )}
        />
      </View>
    )
  }
}

const ReviewList = () => {
  const container = new ReviewListContainer()
  return container.render()
}

export default ReviewList
