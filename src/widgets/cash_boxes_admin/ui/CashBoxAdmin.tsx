import { cashBoxApi } from '@/shared/api'
import { CashBox } from '@/shared/api/cashbox/types'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import { formatDate } from '@/shared/utils/formatDate'
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
    cashBox: CashBox
    onUpdate: () => void
}

export const CashBoxAdmin: React.FC<ICompanyProps> = ({ cashBox, onUpdate }) => {
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { formState, handleInputChange } = useForm({
        name: cashBox.name,
        is_active: cashBox.is_active,
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete)
    }
    const handleUpdateCompany = async () => {
        const updatedCashBox = {
            name: formState.name as string,
            is_active: formState.is_active as boolean,
        }
        try {
            await cashBoxApi.updateCashBox(updatedCashBox, Number(cashBox.id))
            setSuccess('CashBox updated')
            onUpdate()
            setTimeout(() => setOpen(false), 1000)
        } catch (error) {
            setError('Error updating cashbox')
        }
    }

    const handleDelete = async () => {
        try {
            await cashBoxApi.deleteCashBox(Number(cashBox.id))
            onUpdate()
        } catch (error) {
            setError('Error deleting cashbox')
        }
    }

    return (
        <TableRow key={cashBox.id}>
            <TableCell
                sx={{
                    borderLeft: cashBox.is_active ? '5px solid #3fa944ba' : '5px solid #f13232',
                }}
            >
                {cashBox.id}
            </TableCell>
            <TableCell>{cashBox.cashbox_id}</TableCell>
            <TableCell>{cashBox.name}</TableCell>
            <TableCell>{cashBox.organization_id}</TableCell>
            <TableCell>{cashBox.is_active ? 'YES' : 'NO'}</TableCell>
            <TableCell>{cashBox.created_at ? formatDate(cashBox.created_at) : 'Unknown'}</TableCell>
            <TableCell>{cashBox.created_at ? formatDate(cashBox.updated_at) : 'Unknown'}</TableCell>
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
            <TableCell>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        py: 1,
                        fontWeight: 700,
                        backgroundColor: COLORS.red,
                        textTransform: 'none',
                    }}
                    onClick={handleOpenDelete}
                >
                    Delete
                </Button>
            </TableCell>
            <Dialog
                open={openDelete}
                onClose={handleOpenDelete}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '20px',
                        margin: '20px',
                    },
                }}
            >
                <DialogTitle>Are you sure?</DialogTitle>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginBottom: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 3,
                            py: 1,
                            fontWeight: 700,
                            backgroundColor: COLORS.red,
                            textTransform: 'none',
                        }}
                        onClick={handleDelete}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 3,
                            py: 1,
                            fontWeight: 700,
                            backgroundColor: COLORS.blue,
                            textTransform: 'none',
                        }}
                        onClick={handleOpenDelete}
                    >
                        No
                    </Button>
                </Box>
            </Dialog>
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
                <DialogTitle>Edit CashBox</DialogTitle>
                <Box sx={{ padding: '20px 30px' }}>
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
