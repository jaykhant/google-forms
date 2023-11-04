import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

const ElementInput = ({ onChange, value, error, maxWidth }) => {
    return (
        <FormControl isInvalid={error}>
            <Input value={value} onChange={(event) => onChange(event.target.value)} maxWidth={maxWidth} variant='flushed' placeholder='Your answer' />
            {error ? <FormErrorMessage>{error.message}</FormErrorMessage> : <></>}
        </FormControl>
    )
}

export default ElementInput;