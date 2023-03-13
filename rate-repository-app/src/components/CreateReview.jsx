import { View, Button } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner Name is required'),
  repositoryName: yup.string().required('Repository Name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be above 0')
    .max(100, 'Rating must be below 100'),
  text: yup.string().required('Review is required'),
})

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ margin: 15 }}>
        <FormikTextInput name="ownerName" placeholder="Repository Owner Name" />
        <FormikTextInput name="repositoryName" placeholder="Repository Name" />
        <FormikTextInput name="rating" placeholder="Rating Between 0 and 100" />
        <FormikTextInput name="text" placeholder="Review" />
        <Button
          title="Create a Review"
          onPress={onSubmit}
          testID="createReviewButton"
          style={{ margin: 10, padding: 10 }}
        />
      </View>
    </View>
  )
}

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async (review) => {
    try {
      review = { ...review, rating: parseInt(review.rating, 10) }
      const payload = await mutate({ variables: { review } })
      if (payload.data) {
        const repositoryId = payload.data.createReview.repository.id
        navigate(`/${repositoryId}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default CreateReview
