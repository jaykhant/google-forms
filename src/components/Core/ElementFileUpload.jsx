import PropTypes from 'prop-types'
import React from "react"
import { FILE_TYPES_DISPLAY_NAMES } from '../../Constants';
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react"

const ElementFileUpload = ({ onChange, error, fileType }) => {
    let acceptFileType = ''
    fileType.forEach(element => {
        acceptFileType +=  FILE_TYPES_DISPLAY_NAMES[element]
    });

    return (
        <FormControl isInvalid={error}>
            <Input accept={acceptFileType} type='file' variant='flushed' onChange={(event) => {
                onChange(event.target.files[0])
            }} />
            {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

ElementFileUpload.propTypes = {
    onChange: PropTypes.func,
    error: PropTypes.object,
    fileType: PropTypes.array
}

export default ElementFileUpload