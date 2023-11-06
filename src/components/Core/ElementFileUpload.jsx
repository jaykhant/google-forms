import PropTypes from 'prop-types'
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react"

const ElementFileUpload = ({ onChange, error }) => {

    return (
        <FormControl isInvalid={error}>
            <Input type='file' variant='flushed' onChange={(event) => {
                onChange(event.target.files[0])
            }} />
            {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

ElementFileUpload.propTypes = {
    onChange: PropTypes.func,
    error: PropTypes.object,
}

export default ElementFileUpload