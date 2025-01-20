import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../model/authSlice'
import { AppDispatch } from '@/app/store'
import { useState } from 'react'

export const useAuth = () => {
    const dispatch: AppDispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')

    const handleSignIn = async (username: string, password: string) => {
        if (username && password) {
            const result = await dispatch(loginUser({ username, password }))

            if (loginUser.fulfilled.match(result)) {
                const user = result.payload
                if (user.token) {
                    localStorage.setItem('token', user.token)
                    setIsAuthenticated(true)
                }
            } else {
                setIsAuthenticated(false)
                setError('Incorrect username or password')
            }
        }
    }

    const handleRegister = async (userData: {
        name: string
        surname: string
        email: string
        username: string
        password: string
    }) => {
        const { name, surname, email, username, password } = userData

        if (name && surname && email && username && password) {
            const result = await dispatch(
                registerUser({ name, surname, email, username, password }),
            )

            if (registerUser.fulfilled.match(result)) {
                setIsAuthenticated(true)
            } else {
                setError('Failed to register. Please try again.')
            }
        }
    }

    return { isAuthenticated, error, handleSignIn, handleRegister }
}
