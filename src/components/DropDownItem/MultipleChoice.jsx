import React from 'react'
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Text, Circle, CloseButton, Button } from '@chakra-ui/react'

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
                <Text cursor={'pointer'} w={"60%"}>
                    <Button colorScheme='gray' variant='link'>
                        Add option
                    </Button> or
                    <Button colorScheme='blue' color={'#1a73e8'} variant='ghost'>
                        Add "Others"
                    </Button>
                </Text>
                <CloseButton />
            </Stack>
        </>
    )
}

export default MultipleChoice;
