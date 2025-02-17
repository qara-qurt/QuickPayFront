import { userApi } from '@/shared/api/user/userApi'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import { Alert, Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useState } from 'react'

interface ICreateUserProps {
    handleOpen(): void
    onUpdate(): void
}

export const CreateUser: React.FC<ICreateUserProps> = ({ onUpdate }) => {
    const { formState, handleInputChange } = useForm({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: 'USER',
    })

    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')

    const createUser = async () => {
        setErrors('')
        setSuccess('')

        const name = formState.name as string
        const surname = formState.surname as string
        const username = formState.username as string
        const email = formState.email as string
        const password = formState.password as string
        const role = formState.role as string

        if (!name || !surname || !username || !email || !password || !role) {
            setErrors('Please fill all fields')
            return
        }

        if (name.length < 3 || surname.length < 3 || username.length < 3) {
            setErrors('Name, Surname, and Username must be at least 3 characters')
            return
        }

        try {
            await userApi.createUser({ name, surname, username, email, password, roles: [role] })
            setSuccess('User created successfully')
            onUpdate()
        } catch (error: any) {
            setErrors(error?.response?.data?.messages[0] || 'Something went wrong')
        }
    }

    return (
        <Box
            sx={{
                padding: '20px 30px',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    marginBottom: '20px',
                }}
            >
                Create User
            </Typography>
            <Box>
                <CustomTextField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.name}
                    onChange={e => handleInputChange(e, 'name')}
                />
                <CustomTextField
                    id="surname"
                    label="Surname"
                    type="text"
                    placeholder="Surname"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.surname}
                    onChange={e => handleInputChange(e, 'surname')}
                />
                <CustomTextField
                    id="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.username}
                    onChange={e => handleInputChange(e, 'username')}
                />
                <CustomTextField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.email}
                    onChange={e => handleInputChange(e, 'email')}
                />
                <CustomTextField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.password}
                    onChange={e => handleInputChange(e, 'password')}
                />
                <Select
                    id="role"
                    value={formState.role}
                    onChange={e => handleInputChange(e as SelectChangeEvent<string>, 'role')}
                    fullWidth
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                >
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="ORGANIZATION_ADMIN">ORGANIZATION_ADMIN</MenuItem>
                    <MenuItem value="MANAGER">MANAGER</MenuItem>
                </Select>
                {errors && (
                    <Alert severity="error" sx={{ marginTop: 2 }}>
                        {errors}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ marginTop: 2 }}>
                        {success}
                    </Alert>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: '10px',
                            borderRadius: 3,
                            py: 1,
                            fontWeight: 700,
                            backgroundColor: COLORS.blue,
                            textTransform: 'none',
                        }}
                        onClick={createUser}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
