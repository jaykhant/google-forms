import React, { useEffect } from 'react'
import { Box, Flex, Text, Stack, Center, Spinner } from '@chakra-ui/react'
import { connect } from 'react-redux';
import { moduleTypes } from '../store/type';
import { ResponseViewActionTypes } from '../store/ResponseView/type';
import { useParams } from 'react-router-dom';

const ResponseView = ({ response, isLoadingForGetResponse, findOne }) => {

    const { id } = useParams()

    useEffect(() => {
        findOne(id)
    }, [findOne, id])

    return (
        <Flex
            flexDirection="column"
            px={{ base: "20", md: "40", lg: "60", xl: "80" }}
        >
            {/* <Stack spacing={8} py={12}>
                <Box
                    p={8}
                    rounded={'lg'}
                    borderTop='4px'
                    boxShadow={'lg'}
                    borderTopColor='blue'
                    bg={useColorModeValue('white', 'gray.700')}
                >
                    <Stack spacing={4}>
                        {response.form.title}
                        <Stack spacing={2}>
                            <Text fontWeight={'medium'}>{response.form.description}</Text>
                            <Text mt={2} p={2} bg={'gray.100'} borderRadius={5} fontSize={16}>Fine</Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack> */}

            <Stack spacing={8} py={6} >
                {!isLoadingForGetResponse ? response.answer.map((answer, index) =>
                    <Box
                        index={index}
                        p={4}
                        rounded={'lg'}
                        boxShadow={'lg'}
                        bg={'white'}
                    >
                        <Stack spacing={2}>
                            <Text fontWeight={'medium'}>{answer.question}</Text>
                            <Text mt={2} p={2} bg={'gray.100'} borderRadius={5} fontSize={16}>Fine</Text>
                        </Stack>
                    </Box>
                ) :
                    <Box
                        p={4}
                        rounded={'lg'}
                        boxShadow={'lg'}
                        bg={'white'}
                    >
                        <Center width={'100%'}>
                            <Spinner />
                        </Center>
                    </Box>

                }
            </Stack>

        </Flex >
    )
}

const mapStateToProps = (state) => {
    return {
        response: state[moduleTypes.RESPONSE_VIEW].response,
        isLoadingForGetResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForGetResponse
    };
};
function mapDispatchToProps (dispatch) {
    return ({
        findOne: (responseId) => {
            dispatch({ type: ResponseViewActionTypes.findOne, responseId })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseView);
