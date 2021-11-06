import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { AuthContext } from '../contexts/auth'

const Login = () => {
    const context = useContext(AuthContext)

    const history = useHistory()

    const [errors, serErrors] = useState({})

    const initialState = {
        username: '',
        password: '',
    }

    const { values, onChange, onSubmit } = useForm(loginUserCallback, initialState)

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData)
            history.push('/')
        },
        onError(err) {
            serErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser()
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder="Username..."
                    name="username"
                    type='text'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    placeholder="Password..."
                    name="password"
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors)?.length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ){
            id email token username createdAt
        }
    }
`

export default Login
