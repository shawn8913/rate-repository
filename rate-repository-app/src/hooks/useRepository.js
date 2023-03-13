import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (repositoryId) => {
  const result = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  })

  if (result.loading) {
    return null
  }

  return result.data.repository
}

export default useRepository
