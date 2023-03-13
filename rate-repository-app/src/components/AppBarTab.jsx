import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const styles = StyleSheet.create({
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabText: {
    color: 'white',
  },
})

const AppBarTab = ({ text, url }) => {
  return (
    <Link to={url} component={TouchableWithoutFeedback}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {text}
        </Text>
      </View>
    </Link>
  )
}

export default AppBarTab
