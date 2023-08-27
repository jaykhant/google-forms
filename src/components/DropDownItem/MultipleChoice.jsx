import React from 'react'
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Text, Circle, CloseButton } from '@chakra-ui/react'

const MultipleChoice = () => {
    return (
        <>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Circle size='20px' border='2px' borderColor="gray">
                </Circle>
                <Input w={'60%'} variant='flushed' placeholder='Option 1' />
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Circle size='20px' border='2px' borderColor="gray">
                </Circle>
                <Text w={"60%"}>Add option or Add "Others"</Text>
                <CloseButton />
            </Stack>
        </>
    )
}

export default MultipleChoice;
