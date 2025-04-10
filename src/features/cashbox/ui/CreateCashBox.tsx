import { cashBoxApi, companyApi } from '@/shared/api'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import { Alert, Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

interface ICreateCashBoxyProps {
    handleOpen(): void
    onUpdate(): void
}

export const CreateCashBox: React.FC<ICreateCashBoxyProps> = ({ onUpdate }) => {
    const { formState, handleInputChange } = useForm({
        cashbox_id: '',
        name: '',
        organization_id: '' as string,
    })

    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')

    const createCashbox = async () => {
        setErrors('')
        setSuccess('')

        const cashbox_id = formState.cashbox_id as string
        const name = formState.name as string
        const organization_id = Number(formState.organization_id as string)

        if (cashbox_id === '' || name === '' || organization_id === 0) {
            setErrors('Please fill all fields')
            return
        }

        if (name.length < 3) {
            setErrors('Name must be 3 characters')
            return
        }

        try {
            await cashBoxApi.createCashBox({
                cashbox_id,
                name,
                organization_id,
            })
            setSuccess('CashBox created')
            onUpdate()
        } catch (error) {
            setErrors('Cash with this cashbox_id or name already exists')
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
                Create CashBox
            </Typography>
            <Box>
                <CustomTextField
                    id="cashbox_id"
                    label="Cashbox ID"
                    type="cashbox_id"
                    placeholder="Cashbox ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.cashbox_id}
                    onChange={e => handleInputChange(e, 'cashbox_id')}
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
                <CustomTextField
                    id="organization_id"
                    label="Organization ID"
                    type="text"
                    placeholder="Organization ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.organization_id}
                    onChange={e => handleInputChange(e, 'organization_id')}
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
                        onClick={createCashbox}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
