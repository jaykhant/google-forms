import React from 'react'
import { Box, Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react'

const ResponseView = () => {
    return (
        <>
            <Flex
                px={{ base: "20", md: "40", lg: "60", xl: "80" }}
                h={'93vh'}
                flexDirection="column"
                bg={'#f0ebf8'}>
                <Stack spacing={8} minW={'70vh'} py={6} >
                    <Box
                        p={4}
                        rounded={'lg'}
                        boxShadow={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                    >
                        <Stack spacing={2}>
                            <Text fontWeight={'medium'}>How Are U?</Text>
                            <Text mt={2} p={2} bg={'gray.50'} borderRadius={5} fontSize={16}>Fine</Text>
                        </Stack>
                    </Box>
                </Stack>
                <Stack spacing={8} minW={'70vh'} py={6} >
                    <Box
                        p={4}
                        rounded={'lg'}
                        boxShadow={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                    >
                        <Stack spacing={2}>
                            <Text fontWeight={'medium'}>What Do You Do?</Text>
                            <Text fontSize={16}>No responses yet for this question.</Text>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default ResponseView;
