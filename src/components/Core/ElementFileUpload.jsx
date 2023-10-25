import { Input } from "@chakra-ui/react"

const ElementFileUpload = ({ onChange }) => {

    return (
        <Input type='file' variant='flushed' onChange={(event) => {
            onChange(event.target.files[0])
        }} />
    )
}

export default ElementFileUpload