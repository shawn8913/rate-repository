import { View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { useNavigate } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import formatInThousands from '../utils/FormatInThousands'
import * as Linking from 'expo-linking'

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  profileContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  profileDescriptionContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    flexGrow: 0,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    borderWidth: 5,
    borderColor: theme.colors.primary,
  },
  languageText: {
    color: 'white',
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const CountItem = ({ count }) => {
  return (
    <View style={styles.countItem}>
      <Text fontWeight="bold">{formatInThousands(count)}</Text>
    </View>
  )
}

const RepositoryItem = ({ item, pressable }) => {
  const nav = useNavigate()
  const repositoryPress = () => {
    nav(`/${item.id}`)
  }

  const onPress = () => {
    Linking.openURL(item.url)
  }

  const repoView = (
    <View style={styles.itemContainer} testID="repositoryItem">
      <View style={styles.profileContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.profileDescriptionContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statText}>
          <CountItem count={item.stargazersCount}></CountItem>
          <Text>Stars</Text>
        </View>
        <View style={styles.statText}>
          <CountItem count={item.forksCount}></CountItem>
          <Text>Forks</Text>
        </View>
        <View style={styles.statText}>
          <CountItem count={item.reviewCount}></CountItem>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statText}>
          <CountItem count={item.ratingAverage}></CountItem>
          <Text>Rating</Text>
        </View>
      </View>
      {!pressable && <Button title="Open in GitHub" onPress={onPress} />}
    </View>
  )

  return pressable ? (
    <TouchableOpacity onPress={repositoryPress}>{repoView}</TouchableOpacity>
  ) : (
    <>{repoView}</>
  )
}

export default RepositoryItem
