import { RootState } from '@/app/store'
import { ProductsAdmin } from '@/widgets/products_admin'
import { useSelector } from 'react-redux'

export const Products = () => {
    const organization = useSelector((state: RootState) => state.users.organization)

    if (!organization || organization.id === null) {
        return <div>Loading...</div>
    }

    return <ProductsAdmin organization_id={organization.id} />
}
