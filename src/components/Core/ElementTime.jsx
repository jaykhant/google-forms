import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ElementTime = ({ value, onChange, error }) => {

    const [date, setDate] = useState('')

    useEffect(() => {
        if (!isNaN(value)) {
            const date = new Date(value)
            setDate(`${date.getHours()}:${String(date.getMinutes())}`)
        } else {
            setDate('')
        }
    }, [value])

    return (
        <FormControl isInvalid={error}>
            <Input value={date} w={'20%'} onChange={(event) => {
                const time = event.target.value.split(':')
                const date = new Date()
                date.setHours(time[0])
                date.setMinutes(time[1])
                onChange(date.getTime())
            }} type='time' variant='flushed' />
            {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

export default ElementTime