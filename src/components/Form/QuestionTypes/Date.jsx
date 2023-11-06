import { Stack } from '@chakra-ui/layout';
import { CalendarIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const Date = () => {
    return (
        <Stack spacing={4}>
            <InputGroup w={'60%'}>
                <Input disabled variant='flushed' placeholder='Day,year,month' />
                <InputRightElement pointerEvents='none'>
                    <CalendarIcon />
                </InputRightElement>
            </InputGroup>
        </Stack>
    )
}

export default Date;
