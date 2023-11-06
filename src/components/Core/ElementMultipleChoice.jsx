import PropTypes from 'prop-types'
import React from "react"
import { FormControl, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react"

const ElementMultipleChoice = ({ value, options, onChange,error }) => {
    return (
        <FormControl isInvalid={error}>
        <RadioGroup value={value} onChange={(value) => {
            onChange(value)
        }}>
            <Stack spacing={3} direction='column'>
                {options.map((option, index) =>
                    <Radio key={index} size={'lg'} colorScheme='blue' value={option}>
                        {option}
                    </Radio>
                )}
            </Stack>
        </RadioGroup>
        {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

ElementMultipleChoice.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    error: PropTypes.object,
    value: PropTypes.string,
}

export default ElementMultipleChoice