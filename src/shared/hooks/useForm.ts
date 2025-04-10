import { ChangeEvent, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'

export const useForm = (initialState: { [key: string]: string | boolean | number }) => {
    const [formState, setFormState] = useState<{ [key: string]: string | boolean | number }>(
        initialState,
    )

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
        field: string,
    ) => {
        setFormState({
            ...formState,
            [field]: e.target.value,
        })
    }

    return {
        formState,
        handleInputChange,
    }
}
