import { companyApi } from '@/shared/api'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import { Alert, Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

interface ICreateCompanyProps {
    handleOpen(): void
    onUpdate(): void
}

export const CreateCompany: React.FC<ICreateCompanyProps> = ({ onUpdate }) => {
    const { formState, handleInputChange } = useForm({
        bin: '',
        name: '',
    })

    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')

    const createCompany = async () => {
        setErrors('')
        setSuccess('')

        const bin = formState.bin as string
        const name = formState.name as string

        if (bin === '' || name === '') {
            setErrors('Please fill all fields')
            return
        }

        if (bin.length < 6 || name.length < 3) {
            setErrors('Bin must be 6 characters and Name must be 3 characters')
            return
        }

        try {
            await companyApi.createCompany({ bin, name })
            setSuccess('Company created')
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
                Create Company
            </Typography>
            <Box>
                <CustomTextField
                    id="bin"
                    label="Bin"
                    type="text"
                    placeholder="bin"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.bin}
                    onChange={e => handleInputChange(e, 'bin')}
                />
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
                {errors != '' && <Alert severity="error">{errors}</Alert>}
                {success != '' && <Alert severity="success">{success}</Alert>}
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
                        onClick={createCompany}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
