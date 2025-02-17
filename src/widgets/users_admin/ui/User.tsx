import { User as TUser } from '@/shared/api/user/types'
import { userApi } from '@/shared/api/user/userApi'
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
    MenuItem,
    Select,
    SelectChangeEvent,
    TableCell,
    TableRow,
} from '@mui/material'
import { useState } from 'react'

interface IUserProps {
    user: TUser
    onUpdate: () => void
}

export const User: React.FC<IUserProps> = ({ user, onUpdate }) => {
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { formState, handleInputChange } = useForm({
        id: user.id as unknown as string,
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        roles: user.roles[0],
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete)
    }
    const handleUpdateUser = async () => {
        const updatedUser = {
            name: formState.name as string,
            surname: formState.surname as string,
            username: formState.username as string,
            email: formState.email as string,
            roles: [formState.roles] as string[],
            is_active: formState.is_active as boolean,
        }

        try {
            await userApi.updateUser(updatedUser, Number(user.id))
            setSuccess('User updated')
            onUpdate()
            setTimeout(() => setOpen(false), 1000)
        } catch (error) {
            setError('Error updating user')
        }
    }

    const handleDelete = async () => {
        try {
            await userApi.deleteUser(Number(user.id))
            onUpdate()
        } catch (error) {
            setError('Error deleting cashbox')
        }
    }

    return (
        <TableRow key={user.id}>
            <TableCell
                sx={{
                    borderLeft: user.is_active ? '5px solid #3fa944ba' : '5px solid #f13232',
                }}
            >
                {user.id}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.surname}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.is_active ? 'YES' : 'NO'}</TableCell>
            <TableCell>{user.roles[0]}</TableCell>
            <TableCell>{user.created_at ? formatDate(user.created_at) : 'Unknown'}</TableCell>
            <TableCell>{user.created_at ? formatDate(user.updated_at) : 'Unknown'}</TableCell>
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
                <DialogTitle>Edit User</DialogTitle>
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
                        type="text"
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.email}
                        onChange={e => handleInputChange(e, 'email')}
                    />
                    <FormControlLabel
                        sx={{
                            marginLeft: '0px',
                            color: COLORS.gray,
                            marginBottom: '14px',
                            marginTop: '-10px',
                        }}
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
                    <Select
                        id="role"
                        value={formState.roles}
                        onChange={e => handleInputChange(e as SelectChangeEvent<string>, 'roles')}
                        fullWidth
                        variant="outlined"
                        sx={{ margin: '2px' }}
                    >
                        <MenuItem value="USER">User</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="ORGANIZATION_ADMIN">ORGANIZATION_ADMIN</MenuItem>
                        <MenuItem value="MANAGER">MANAGER</MenuItem>
                    </Select>
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
                            onClick={handleUpdateUser}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </TableRow>
    )
}
