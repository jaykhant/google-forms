import PropTypes from 'prop-types'
import React from "react"
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

const ElementInput = ({ onChange, value, error, maxWidth,placeholder }) => {
    return (
        <FormControl isInvalid={error}>
            <Input value={value} onChange={(event) => onChange(event.target.value)} maxWidth={maxWidth} variant='flushed' placeholder={placeholder} />
            {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

ElementInput.propTypes = {
    onChange: PropTypes.func,
    error: PropTypes.object,
    value: PropTypes.string,
    maxWidth: PropTypes.string,
    placeholder: PropTypes.string,
}

export default ElementInput;