import { useQuery } from '@apollo/client'
import { GET_USER_REVIEWS } from '../graphql/queries'

const useReviews = () => {
  const result = useQuery(GET_USER_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  })

  if (result.loading) {
    return null
  }

  return result
}

export default useReviews
