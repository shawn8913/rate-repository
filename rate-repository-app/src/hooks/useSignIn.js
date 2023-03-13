import { useMutation, useApolloClient } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import { useAuthStorage } from '../hooks/useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation(AUTHENTICATE)
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const payload = await mutate({ variables: { username, password } })

    if (payload.data && payload.data.authenticate) {
      await authStorage.setAccessToken(payload.data.authenticate.accessToken)
      apolloClient.resetStore()
    }

    return payload
  }

  return [signIn, result]
}

export default useSignIn
