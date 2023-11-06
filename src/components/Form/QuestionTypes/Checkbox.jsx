import PropTypes from 'prop-types'
import React,{ useEffect } from 'react'
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Text, Square, CloseButton, Button } from '@chakra-ui/react'

const Checkbox = ({ options = [], onAddOption, onUpdateOption, onDeleteOption }) => {

    useEffect(() => {
        if (options.length === 0) onAddOption()
    }, [options, onAddOption])

    return (
        <>
            {options.map((option, index) =>
                <Stack key={index} gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                    <Square size='20px' border='2px' borderColor="gray">
                    </Square>
                    <Input value={option} onInput={(event) => onUpdateOption({ value: event.target.value, optionIndex: index })} w={'60%'} variant='flushed' placeholder='Option 1' />
                    {options.length > 1 && <CloseButton onClick={() => onDeleteOption({ optionIndex: index })} />}
                </Stack>
            )}

            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Square size='20px' border='2px' borderColor="gray">
                </Square>
                <Text cursor={'pointer'} w={"60%"}>
                    <Button colorScheme='gray' variant='link' onClick={() => onAddOption()} >
                        Add option
                    </Button>
                </Text>
            </Stack>
        </>
    )
}

Checkbox.propTypes = {
    options: PropTypes.array,
    onAddOption: PropTypes.func,
    onUpdateOption: PropTypes.func,
    onDeleteOption: PropTypes.func,
}

export default Checkbox;
