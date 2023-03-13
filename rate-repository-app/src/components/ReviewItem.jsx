import { View, StyleSheet, Pressable } from 'react-native'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import alert from './Alert'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'
import { DELETE_REVIEW } from '../graphql/mutations'

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  topContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexGrow: 0,
    marginRight: 20,
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  blueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'blue',
    height: 50,
  },
  redButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'red',
    height: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

const ReviewItem = ({ review, context, refetch }) => {
  const navigate = useNavigate()
  const [mutate] = useMutation(DELETE_REVIEW)

  const viewRepository = () => {
    navigate(`/${review.repositoryId}`)
  }

  const deleteReview = async (deleteReviewId) => {
    try {
      const payload = await mutate({ variables: { deleteReviewId } })
      if (payload.data.deleteReview) {
        refetch()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteAlert = (deleteReviewId) => {
    alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => deleteReview(deleteReviewId) },
    ])
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <Text
            fontWeight="bold"
            style={{ marginTop: 8, color: theme.colors.primary }}
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold">
            {context === 'repo'
              ? review.user.username
              : review.repository.fullName}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'MM.dd.yyyy')}
          </Text>
          <Text style={{ marginTop: 3, flex: 1, flexWrap: 'wrap' }}>
            {review.text}
          </Text>
        </View>
      </View>

      {context === 'user' && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.blueButton} onPress={viewRepository}>
            <Text style={styles.text}>View Repository</Text>
          </Pressable>
          <Pressable
            style={styles.redButton}
            onPress={() => deleteAlert(review.id)}
          >
            <Text style={styles.text}>Delete Review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default ReviewItem
