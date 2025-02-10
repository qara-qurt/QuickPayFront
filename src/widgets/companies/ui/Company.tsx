import { companyApi } from '@/shared/api'
import { Company as TCompany } from '@/shared/api/company/types'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    FormControlLabel,
    TableCell,
    TableRow,
} from '@mui/material'
import { useState } from 'react'

interface ICompanyProps {
    company: TCompany
    onUpdate: () => void
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString.replace(' ', 'T')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

export const Company: React.FC<ICompanyProps> = ({ company, onUpdate }) => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { formState, handleInputChange } = useForm({
        bin: company.bin,
        name: company.name,
        is_active: company.is_active,
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleUpdateCompany = async () => {
        const updatedCompany = {
            bin: formState.bin as string,
            name: formState.name as string,
            is_active: formState.is_active as boolean,
        }
        try {
            console.log(updatedCompany)
            await companyApi.updateCompany(updatedCompany, Number(company.id))
            setSuccess('Company updated')

            onUpdate()
            setTimeout(() => setOpen(false), 1000)
        } catch (error) {
            setError('Error updating company')
        }
    }

    return (
        <TableRow key={company.id}>
            <TableCell
                sx={{
                    borderLeft: company.is_active ? '5px solid #3fa944ba' : '5px solid #f13232',
                }}
            >
                {company.id}
            </TableCell>

            <TableCell>{company.name}</TableCell>
            <TableCell>{company.bin}</TableCell>
            <TableCell>{company.is_active ? 'YES' : 'NO'}</TableCell>
            <TableCell>{company.created_at ? formatDate(company.created_at) : 'Unknown'}</TableCell>
            <TableCell>{company.created_at ? formatDate(company.updated_at) : 'Unknown'}</TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        py: 1,
                        fontWeight: 700,
                        backgroundColor: COLORS.blue,
                        textTransform: 'none',
                    }}
                    onClick={handleOpen}
                >
                    Edit
                </Button>
            </TableCell>
            <Dialog
                open={open}
                onClose={handleOpen}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '20px',
                    },
                    padding: '20px',
                }}
            >
                <DialogTitle>Edit Company</DialogTitle>
                <Box sx={{ padding: '20px 30px' }}>
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
                    <FormControlLabel
                        sx={{ marginLeft: '0px', color: COLORS.gray }}
                        control={
                            <Checkbox
                                checked={Boolean(formState.is_active)}
                                onChange={e =>
                                    handleInputChange(
                                        {
                                            target: { name: 'is_active', value: e.target.checked },
                                        } as unknown as React.ChangeEvent<HTMLInputElement>,
                                        'is_active',
                                    )
                                }
                            />
                        }
                        label="Is Active"
                        labelPlacement="start"
                    />

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 3,
                                py: 1,
                                fontWeight: 700,
                                backgroundColor: COLORS.blue,
                                textTransform: 'none',
                            }}
                            onClick={handleUpdateCompany}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </TableRow>
    )
}
