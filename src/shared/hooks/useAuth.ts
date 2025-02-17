import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import { useDispatch } from 'react-redux'
import { login } from '@/features/auth/model/authSlice'

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            try {
                const data = await authApi.getMe()
                if (!data) {
                    throw new Error('User not authenticated')
                }
                dispatch(login(data))
            } catch (error) {
                localStorage.removeItem('token')
                navigate('/sign-in')
            }
            setIsLoading(false)
        }

        checkToken()
    }, [navigate])

    return { isLoading }
}
