import React from 'react'
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Text, Square, CloseButton } from '@chakra-ui/react'

const Checkboxes = () => {
    return (
        <>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Square size='20px' border='2px' borderColor="gray">
                </Square>
                <Input w={'60%'} variant='flushed' placeholder='Option 1' />
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Square size='20px' border='2px' borderColor="gray">
                </Square>
                <Text w={"60%"}>Add option or Add "Others"</Text>
                <CloseButton />
            </Stack>
        </>
    )
}

export default Checkboxes;
