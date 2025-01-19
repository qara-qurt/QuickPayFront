import { ChangeEvent, useState } from 'react'

export const useForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        rememberMe: false,
    })

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: string,
    ) => {
        setFormState({
            ...formState,
            [field]: e.target.value,
        })
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            rememberMe: e.target.checked,
        })
    }

    return {
        formState,
        handleInputChange,
        handleCheckboxChange,
    }
}
