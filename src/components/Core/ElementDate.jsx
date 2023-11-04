import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const ElementDate = ({ value, onChange, error }) => {
    
    const [date, setDate] = useState('')
    useEffect(() => {
        if (!isNaN(value)) {
            const date = new Date(value)
            setDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)
        } else {
            setDate('')
        }
    }, [value])

    return (
        <FormControl isInvalid={error}>
            <Input
                value={date}
                w={'20%'}
                onInput={(event) => {
                    const date = new Date(event.target.value)
                    onChange(date.getTime())
                }}
                onKeyDown={(e) => e.preventDefault()}
                type='date'
                variant='flushed'
            />
            {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

export default ElementDate