import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SingleRepository from './SingleRepository'
import SignIn from './SignIn'
import SignOut from './SignOut'
import theme from '../theme'
import CreateReview from './CreateReview'
import SignUp from './SignUp'
import ReviewList from './ReviewList'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/login" element={<SignIn />} exact />
        <Route path="/logout" element={<SignOut />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/reviews" element={<ReviewList />} exact />
        <Route path="/createReview" element={<CreateReview />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />{' '}
      </Routes>
    </View>
  )
}

export default Main
