import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';

const ShortAnswer = () => {
    return (
        <Stack spacing={4}>
            <Input w={'60%'} disabled variant='flushed' placeholder='Short-answer text' />
        </Stack>
    )
}

export default ShortAnswer;
