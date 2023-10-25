import { Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const ElementDate = ({ value, onChange }) => {

    const [date, setDate] = useState('')

    useEffect(() => {
        if (!isNaN(value)) {
            const date = new Date(value)
            setDate(`${date.getFullYear()}-${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`)
        } else {
            setDate('')
        }
    }, [value])

    return (
        <Input value={date} w={'20%'} onChange={(event) => {
            const date = new Date(event.target.value)
            onChange(date.getTime())
        }} type='date' variant='flushed' />
    )
}

export default ElementDate