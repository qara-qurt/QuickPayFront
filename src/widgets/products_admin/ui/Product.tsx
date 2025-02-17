import { productApi } from '@/shared/api/product/productApi'
import { Product as TProduct } from '@/shared/api/product/types'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import { formatDate } from '@/shared/utils/formatDate'
import { Alert, Box, Button, Dialog, DialogTitle, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { MarkModal } from './MarkModal'

interface IProductProps {
    product: TProduct
    onUpdate: () => void
}

export const Product: React.FC<IProductProps> = ({ product, onUpdate }) => {
    const [open, setOpen] = useState(false)
    const [openMark, setOpenMark] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { formState, handleInputChange } = useForm({
        id: product.id,
        name: product.name,
        price: product.price,
        sizes: product.sizes.join(', '),
        colors: product.colors.join(', '),
        image: product.image,
        description: product.description,
        organization_id: product.organization_id,
        created_at: product.created_at,
        updated_at: product.updated_at,
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleOpenMark = () => {
        setOpenMark(!openMark)
    }

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete)
    }
    const handleUpdateProduct = async () => {
        const updateProduct = {
            name: String(formState.name),
            price: Number(formState.price),
            sizes:
                typeof formState.sizes === 'string'
                    ? formState.sizes.split(',').map(s => s.trim())
                    : [],
            colors:
                typeof formState.colors == 'string'
                    ? formState.colors.split(', ').map(c => c.trim())
                    : [],
            image: String(formState.image),
            description: String(formState.description),
            organization_id: Number(formState.organization_id),
        }

        try {
            await productApi.updateProduct(updateProduct, Number(product.id))
            setSuccess('Product updated')
            onUpdate()
            setTimeout(() => setOpen(false), 1000)
        } catch (error: any) {
            setError(error?.response?.data?.messages[0] || 'Error updating product')
        }
    }

    const handleDelete = async () => {
        try {
            await productApi.deleteProduct(Number(product.id))
            onUpdate()
        } catch (error) {
            setError('Error deleting product')
        }
    }

    return (
        <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.sizes.join(', ')}</TableCell>
            <TableCell>{product.image}</TableCell>
            <TableCell>{product.colors.join(', ')}</TableCell>
            <TableCell>{product.organization_id}</TableCell>
            <TableCell>{product.created_at ? formatDate(product.created_at) : 'Unknown'}</TableCell>
            <TableCell>{product.created_at ? formatDate(product.updated_at) : 'Unknown'}</TableCell>
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
                        backgroundColor: COLORS.green,
                        textTransform: 'none',
                    }}
                    onClick={handleOpenMark}
                >
                    Mark
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
                <DialogTitle>Edit Product</DialogTitle>
                <Box sx={{ padding: '20px 30px' }}>
                    <CustomTextField
                        id="name"
                        label="Name"
                        type="text"
                        placeholder="Product Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.name}
                        onChange={e => handleInputChange(e, 'name')}
                    />
                    <CustomTextField
                        id="description"
                        label="Description"
                        type="text"
                        placeholder="Product Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.description}
                        onChange={e => handleInputChange(e, 'description')}
                    />
                    <CustomTextField
                        id="price"
                        label="Price"
                        type="number"
                        placeholder="Product Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.price}
                        onChange={e => handleInputChange(e, 'price')}
                    />
                    <CustomTextField
                        id="sizes"
                        label="Sizes"
                        type="text"
                        placeholder="Sizes (comma separated)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.sizes}
                        onChange={e => handleInputChange(e, 'sizes')}
                    />
                    <CustomTextField
                        id="colors"
                        label="Colors"
                        type="text"
                        placeholder="Colors (comma separated)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.colors}
                        onChange={e => handleInputChange(e, 'colors')}
                    />
                    <CustomTextField
                        id="image"
                        label="Image URL"
                        type="text"
                        placeholder="Product Image URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.image}
                        onChange={e => handleInputChange(e, 'image')}
                    />
                    <CustomTextField
                        id="organization_id"
                        label="Organization ID"
                        type="number"
                        placeholder="Organization ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formState.organization_id}
                        onChange={e => handleInputChange(e, 'organization_id')}
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
                            onClick={handleUpdateProduct}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog>
            <MarkModal open={openMark} handleOpen={handleOpenMark} product={product} />
        </TableRow>
    )
}
