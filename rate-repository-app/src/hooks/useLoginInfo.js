import { useQuery } from '@apollo/client'
import { GET_USER_INFO } from '../graphql/queries'

const useLoginInfo = () => {
  const result = useQuery(GET_USER_INFO, {
    fetchPolicy: 'cache-and-network',
  })

  if (result.loading) {
    return null
  }

  return result.data.me
}

export default useLoginInfo
