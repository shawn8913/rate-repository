import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'
import useLoginInfo from '../hooks/useLoginInfo'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const authorizedUser = useLoginInfo()

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" url="/" />
        {authorizedUser ? (
          <>
            <AppBarTab text="Create a Review" url="/createReview" />
            <AppBarTab text="My reviews" url="/reviews" />
            <AppBarTab text="Sign out" url="/logout" />
          </>
        ) : (
          <>
            <AppBarTab text="Sign in" url="/login" />
            <AppBarTab text="Sign up" url="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
