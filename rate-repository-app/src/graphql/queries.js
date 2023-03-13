import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          id
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const GET_USER_INFO = gql`
  query Query {
    me {
      id
      username
    }
  }
`

export const GET_USER_REVIEWS = gql`
  query Me {
    me {
      reviews {
        edges {
          node {
            createdAt
            rating
            text
            id
            repository {
              fullName
            }
            user {
              username
            }
          }
        }
      }
    }
  }
`
