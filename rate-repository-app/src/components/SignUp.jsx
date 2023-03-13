import { View, Button } from 'react-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import { CREATE_USER } from '../graphql/mutations'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ margin: 15 }}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" />
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Confirm password"
        />
        <Button
          title="Sign up"
          onPress={onSubmit}
          testID="submitButton"
          style={{ margin: 10, padding: 10 }}
        />
      </View>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const payload = await mutate({ variables: { username, password } })
      if (payload.data) {
        const { data } = await signIn({ username, password })
        if (data) {
          navigate('/')
        }
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp
