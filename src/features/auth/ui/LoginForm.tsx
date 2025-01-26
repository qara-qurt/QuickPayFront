import { Box, Button, FormControlLabel, Checkbox, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '@/shared/style/colors'
import { useForm } from '@/features/auth/hooks/useForm'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { CustomTextField } from '@/shared/ui'

export const LoginForm = () => {
    const { formState, handleInputChange } = useForm({
        username: '',
        password: '',
    })
    const { isAuthenticated, error, handleSignIn } = useAuth()
    const navigate = useNavigate()

    const [checkbox, setCheckbox] = useState(false)

    const onSignIn = () => {
        handleSignIn(formState.username as string, formState.password as string)
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])

    return (
        <>
            <Box
                width={'100%'}
                maxWidth={'460px'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
            >
                <CustomTextField
                    id="login"
                    label="Username"
                    placeholder="your_username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.username}
                    onChange={e => handleInputChange(e, 'username')}
                />
                <CustomTextField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="******"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.password}
                    onChange={e => handleInputChange(e, 'password')}
                />
                {/* Show error message if user is not authenticated after login attempt */}
                {error != '' && <Alert severity="error">{error}</Alert>}

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    mt={2}
                >
                    <FormControlLabel
                        label="Remember me"
                        control={
                            <Checkbox
                                checked={checkbox}
                                onChange={(e, checked) => setCheckbox(checked)}
                            />
                        }
                    />

                    <Link to="#" style={{ textDecoration: 'none', color: COLORS.gray }}>
                        Forgot password?
                    </Link>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1,
                        fontWeight: 700,
                        backgroundColor: COLORS.blue,
                    }}
                    onClick={onSignIn}
                >
                    Sign in
                </Button>
                <Link
                    to="/sign-up"
                    style={{
                        marginTop: 20,
                        textDecoration: 'none',
                        color: COLORS.blue,
                    }}
                >
                    Don't have an account?
                </Link>
            </Box>
        </>
    )
}
