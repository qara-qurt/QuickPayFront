import { useDispatch } from 'react-redux'
import { loginUser } from '../model/authSlice'
import { AppDispatch } from '@/app/store'
import { useState } from 'react'

export const useAuth = () => {
    const dispatch: AppDispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')

    const handleSignIn = async (username: string, password: string) => {
        if (username !== '' && password !== '') {
            const result = await dispatch(loginUser({ username, password }))

            if (loginUser.fulfilled.match(result)) {
                const user = result.payload
                if (user.token) {
                    localStorage.setItem('token', user.token)
                    setIsAuthenticated(true)
                }
            } else if (loginUser.rejected.match(result)) {
                setIsAuthenticated(false)
                setError('incorrect username or password')
            }
        }
    }

    return { isAuthenticated, error, handleSignIn }
}
