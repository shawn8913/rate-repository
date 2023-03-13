import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation authorize($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repository {
        id
      }
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`
