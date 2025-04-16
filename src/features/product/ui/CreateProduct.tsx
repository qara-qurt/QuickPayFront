import { RootState } from '@/app/store'
import { productApi } from '@/shared/api/product/productApi'
import { useForm } from '@/shared/hooks/useForm'
import { COLORS } from '@/shared/style/colors'
import { CustomTextField } from '@/shared/ui'
import { Alert, Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface ICreateProductProps {
    onUpdate(): void
    handleOpen(): void
}

export const CreateProduct: React.FC<ICreateProductProps> = ({ onUpdate }) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const { formState, handleInputChange } = useForm({
        organization_id: '',
        name: '',
        price: '',
        sizes: '',
        colors: '',
        description: '',
    })

    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')

    const createProduct = async () => {
        setErrors('')
        setSuccess('')

        let organization_id = Number(formState.organization_id)
        const name = formState.name as string
        const price = Number(formState.price)
        const sizes = (formState.sizes as string).split(',').map(s => s.trim())
        const colors = (formState.colors as string).split(',').map(c => c.trim())
        const description = formState.description as string

        if (user?.roles[0] !== 'ADMIN') {
            organization_id = user?.organization_id || organization_id
        }

        if (
            !organization_id ||
            !name ||
            !price ||
            !sizes.length ||
            !colors.length ||
            !description
        ) {
            setErrors('Please fill all fields')
            return
        }

        try {
            await productApi.createProduct({
                name,
                price,
                sizes,
                colors,
                description,
                organization_id,
                image: '',
            })
            setSuccess('Product created successfully')
            onUpdate()
        } catch (error: any) {
            setErrors(error?.response?.data?.messages[0] || 'Something went wrong')
        }
    }

    return (
        <Box sx={{ padding: '20px 30px' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                Create Product
            </Typography>

            <Box>
                {user?.roles[0] === 'ADMIN' && (
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
                )}

                <CustomTextField
                    id="name"
                    label="Product Name"
                    type="text"
                    placeholder="Product Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.name}
                    onChange={e => handleInputChange(e, 'name')}
                />
                <CustomTextField
                    id="price"
                    label="Price"
                    type="number"
                    placeholder="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.price}
                    onChange={e => handleInputChange(e, 'price')}
                />
                <CustomTextField
                    id="sizes"
                    label="Sizes (comma separated)"
                    type="text"
                    placeholder="e.g. S, M, L"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.sizes}
                    onChange={e => handleInputChange(e, 'sizes')}
                />
                <CustomTextField
                    id="colors"
                    label="Colors (comma separated)"
                    type="text"
                    placeholder="e.g. red, blue"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.colors}
                    onChange={e => handleInputChange(e, 'colors')}
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                        onClick={createProduct}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
