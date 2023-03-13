import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const result = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  })

  if (result.loading) {
    return null
  }

  return result.data.repositories
}

export default useRepositories
