import { Stack } from '@chakra-ui/layout';
import { TimeIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const Time = () => {
    return (
        <Stack spacing={4}>
            <InputGroup w={'60%'}>
                <Input disabled variant='flushed' placeholder='Time' />
                <InputRightElement pointerEvents='none'>
                    <TimeIcon />
                </InputRightElement>
            </InputGroup>
        </Stack>
    )
}

export default Time;
