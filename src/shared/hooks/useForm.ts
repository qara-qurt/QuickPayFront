import { ChangeEvent, useState } from 'react'

export const useForm = (initialState: { [key: string]: string | boolean }) => {
    const [formState, setFormState] = useState<{ [key: string]: string | boolean }>(initialState)

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
