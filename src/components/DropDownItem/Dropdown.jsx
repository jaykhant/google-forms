import React from 'react'
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Text, CloseButton } from '@chakra-ui/react'

const DropDown = () => {
    return (
        <>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text>1.</Text>
                <Input w={'60%'} variant='flushed' placeholder='Option 1' />
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text>2.</Text>
                <Text w={"60%"}>Add option or Add "Others"</Text>
                <CloseButton />
            </Stack>
        </>
    )
}

export default DropDown;
