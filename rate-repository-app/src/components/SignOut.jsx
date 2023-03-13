import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import AuthStorageContext from '../contexts/AuthStorageContext'
import { useContext } from 'react'
import { useApolloClient } from '@apollo/client'

const SignOut = () => {
  const authStorage = useContext(AuthStorageContext)
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const logout = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    navigate('/')
  }

  useEffect(() => {
    logout()
  }, [])

  return <></>
}

export default SignOut
