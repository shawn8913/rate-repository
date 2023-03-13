import React, { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import parseSortBy from '../utils/parseSortBy'

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

const Dropdown = ({ sortBy, setSortBy }) => {
  return (
    <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue) => setSortBy(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="Latest repositories" />
      <Picker.Item label="Oldest repositories" value="Oldest repositories" />
      <Picker.Item
        label="Highest rated repositories"
        value="Highest rated repositories"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="Lowest rated repositories"
      />
    </Picker>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = (sortBy, setSortBy) => {
    return <Dropdown sortBy={sortBy} setSortBy={setSortBy} />
  }

  render() {
    const [sortBy, setSortBy] = useState('Latest repositories')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filter] = useDebounce(searchKeyword, 500)
    const { orderBy, orderDirection } = parseSortBy(sortBy)
    const repositories = useRepositories(orderBy, orderDirection, filter)

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <View style={styles.listContainer}>
        <SearchBar
          containerStyle={styles.searchKeywordContainer}
          lightTheme={true}
          placeholder="Filter"
          onChangeText={setSearchKeyword}
          value={searchKeyword}
        />
        <FlatList
          ListHeaderComponent={this.renderHeader(sortBy, setSortBy)}
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <RepositoryItem item={item} pressable={true} />
          )}
        />
      </View>
    )
  }
}

const RepositoryList = () => {
  const container = new RepositoryListContainer()
  return container.render()
}

export default RepositoryList
