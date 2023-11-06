import PropTypes from 'prop-types'
import React from "react"
import { Checkbox, FormControl, FormErrorMessage, Stack } from "@chakra-ui/react"

const ElementCheckbox = ({ value, options, onChange,error }) => {
    return (
        <FormControl isInvalid={error}>
        <Stack spacing={3} direction='column'>
            {options.map((option, index) =>
                <Checkbox onChange={(event)=>{
                    if(event.target.checked)
                        value.push(option)
                    else value.splice(value.indexOf(option), 1);
                    onChange(value)
                }} key={index} size={'lg'} colorScheme='blue'> {option}</Checkbox>
            )}
        </Stack>
        {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

ElementCheckbox.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    error: PropTypes.object,
    value: PropTypes.array,
}

export default ElementCheckbox