import React from "react"
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';

const Paragraph = () => {
    return (
        <Stack spacing={4}>
            <Input w={'60%'} disabled variant='flushed' placeholder='Long-answer text' />
        </Stack>
    )
}

export default Paragraph;
