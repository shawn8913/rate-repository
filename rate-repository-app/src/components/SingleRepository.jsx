import { useParams } from 'react-router-native'
import { View, StyleSheet, FlatList } from 'react-native'

import theme from '../theme'
import ReviewItem from './ReviewItem'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'

const styles = StyleSheet.create({
  repoContainer: {
    backgroundColor: '#e1e4e8',
    justifyContent: 'flex-start',
  },
  reviewContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
  },
  separator: {
    height: 10,
  },
  ratingContainer: {
    flexGrow: 0,
    marginRight: 20,
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.repoContainer}>
      <RepositoryItem item={repository} pressable={false} />
    </View>
  )
}

const SingleRepository = () => {
  let { id } = useParams()
  const repository = useRepository(id)
  if (!repository) {
    return null
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node)

  return (
    <View style={styles.repoContainer}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} context={'repo'} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    </View>
  )
}

export default SingleRepository
