import { Box, Button, Alert } from '@mui/material'
import { useForm } from '@/features/auth/hooks/useForm'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { CustomTextField } from '@/shared/ui'
import { COLORS } from '@/shared/style/colors'

export const RegisterForm = () => {
    const { error, handleRegister } = useAuth()
    const { formState, handleInputChange } = useForm({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        code: '',
    })

    const [isNextStep, setIsNextStep] = useState(false)

    const onRegister = () => {
        handleRegister({
            name: formState.name,
            surname: formState.surname,
            email: formState.email,
            username: formState.username,
            password: formState.password,
        })
        setIsNextStep(true)
    }

    const verifyCode = () => {
        console.log('Code verified')
    }

    return (
        <>
            <Box
                width={'100%'}
                maxWidth={'460px'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
            >
                {isNextStep ? (
                    <>
                        <CustomTextField
                            id="code"
                            label="We sent you a code to your email"
                            placeholder="4990"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formState.code}
                            onChange={e => handleInputChange(e, 'code')}
                        />

                        <Alert severity="info">
                            Code was sent to your email address, please confirm it
                        </Alert>

                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1,
                                fontWeight: 700,
                                mt: 3,
                                alignSelf: 'flex-end',
                            }}
                            onClick={verifyCode}
                        >
                            Sign Up
                        </Button>
                    </>
                ) : (
                    <>
                        <CustomTextField
                            id="name"
                            label="Name"
                            placeholder="Ramazan"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formState.name}
                            onChange={e => handleInputChange(e, 'name')}
                        />
                        <CustomTextField
                            id="surname"
                            label="Surname"
                            placeholder="Sartaev"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formState.surname}
                            onChange={e => handleInputChange(e, 'surname')}
                        />
                        <CustomTextField
                            id="email"
                            label="Email"
                            placeholder="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formState.email}
                            onChange={e => handleInputChange(e, 'email')}
                        />
                        <CustomTextField
                            id="username"
                            label="Username"
                            placeholder="username"
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
                        {error != '' && (
                            <Alert severity="error" sx={{ my: 1 }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1,
                                fontWeight: 700,
                                mt: 3,
                                alignSelf: 'flex-end',
                                backgroundColor: COLORS.blue,
                            }}
                            onClick={onRegister}
                        >
                            Next Step
                        </Button>
                    </>
                )}
            </Box>
        </>
    )
}
