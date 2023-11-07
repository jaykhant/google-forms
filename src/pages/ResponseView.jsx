import moment from 'moment';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import React,{ useEffect } from 'react'
import { moduleTypes } from '../store/type';
import { QUESTION_TYPES, FILE_TYPES } from '../Constants';
import { Link, useParams } from 'react-router-dom';
import { ResponseViewActionTypes } from '../store/ResponseView/type';
import { Box, Flex, Text, Stack, Center, Spinner } from '@chakra-ui/react';

const ResponseView = ({ response, isLoadingForGetResponse, findOne }) => {

    const { responseId } = useParams()

    useEffect(() => {
        findOne(responseId)
    }, [findOne, responseId])

    return (
        <Stack>
            {!isLoadingForGetResponse ?
                <Flex
                    flexDirection="column"
                    px={{ base: "20", md: "40", lg: "60", xl: "80" }}
                >
                    <Box
                        p={8}
                        mt={8}
                        rounded={'lg'}
                        borderTop='8px'
                        boxShadow={'lg'}
                        borderTopColor='blue'
                        bg={'white'}
                    >
                        <Stack>
                            <Text fontSize={28} fontWeight={'medium'}>{response.form?.title}</Text>
                            <Text fontWeight={'medium'}>{response.form?.description}</Text>
                        </Stack>
                    </Box>
                    <Stack spacing={8} py={8}>
                        {response.answers ? response.answers.map(function (answer, index) {
                            return (
                                <Stack key={index}>
                                    {
                                        <Box
                                            p={4}
                                            bg={'white'}
                                            rounded={'lg'}
                                            boxShadow={'lg'}
                                        >
                                            {
                                                answer.type === QUESTION_TYPES.PARAGRAPH ||
                                                    answer.type === QUESTION_TYPES.DROP_DOWN ||
                                                    answer.type === QUESTION_TYPES.SHORT_ANSWER ||
                                                    answer.type === QUESTION_TYPES.MULTIPLE_CHOICE
                                                    ?
                                                    <Stack>
                                                        <Text fontWeight={'medium'}>{answer.question}</Text>
                                                        <Text mt={2} p={2} bg={'#F8F9FA'} borderRadius={5} fontSize={16}>
                                                            {answer.answer}
                                                        </Text>
                                                    </Stack>
                                                    :
                                                    answer.type === QUESTION_TYPES.CHECKBOX ?
                                                        <Stack>
                                                            <Text fontWeight={'medium'}>{answer.question}</Text>
                                                            {answer.answers ? answer.answers.map(function (ans, i) {
                                                                return (
                                                                    <Text key={i} mt={2} p={2} bg={'#F8F9FA'} borderRadius={5} fontSize={16}>{i}. {ans}</Text>
                                                                )
                                                            }) : <></>
                                                            }
                                                        </Stack>
                                                        :
                                                        answer.type === QUESTION_TYPES.DATE ?
                                                            <Stack>
                                                                <Text fontWeight={'medium'}>{answer.question}</Text>
                                                                <Text mt={2} p={2} bg={'#F8F9FA'} borderRadius={5} fontSize={16}>
                                                                    {moment(answer.dateTime).format('DD MMM YYYY')}
                                                                </Text>
                                                            </Stack>
                                                            :
                                                            answer.type === QUESTION_TYPES.TIME ?
                                                                <Stack>
                                                                    <Text fontWeight={'medium'}>{answer.question}</Text>
                                                                    <Text mt={2} p={2} bg={'#F8F9FA'} borderRadius={5} fontSize={16}>
                                                                        {moment(answer.dateTime).format('LT')}
                                                                    </Text>
                                                                </Stack>
                                                                :
                                                                answer.type === QUESTION_TYPES.FILE_UPLOAD ?
                                                                    <Stack>
                                                                        <Text fontWeight={'medium'}>{answer.question}</Text>
                                                                        {
                                                                            answer.fileType === FILE_TYPES.IMAGE ?
                                                                                <Stack>
                                                                                    <img width={'300px'} src={answer.fileName.signedUrl} alt='broken' />
                                                                                    <Text
                                                                                        mt={2}
                                                                                        p={2}
                                                                                        bg={'#F8F9FA'}
                                                                                        borderRadius={5}
                                                                                        textDecoration={'underline'}
                                                                                        _hover={{
                                                                                            textColor: 'blue.500',
                                                                                        }}
                                                                                    >
                                                                                        <Link to={answer.fileName.signedUrl} target='_blank'>{answer.fileName.name}</Link>
                                                                                    </Text>
                                                                                </Stack>
                                                                                :
                                                                                answer.fileType === FILE_TYPES.DOCUMENT ?
                                                                                    <Stack>
                                                                                        <Text
                                                                                            mt={2}
                                                                                            p={2}
                                                                                            bg={'#F8F9FA'}
                                                                                            borderRadius={5}
                                                                                            textDecoration={'underline'}
                                                                                            _hover={{
                                                                                                textColor: 'blue.500',
                                                                                            }}
                                                                                        >
                                                                                            <Link to={answer.fileName.signedUrl} target='_blank'>{answer.fileName.name}</Link>
                                                                                        </Text>
                                                                                    </Stack>
                                                                                    :
                                                                                    answer.fileType === FILE_TYPES.AUDIO ?
                                                                                        <Stack>
                                                                                            <audio controls><source src={answer.fileName.signedUrl} /></audio>
                                                                                            <Text
                                                                                                mt={2}
                                                                                                p={2}
                                                                                                bg={'#F8F9FA'}
                                                                                                borderRadius={5}
                                                                                                textDecoration={'underline'}
                                                                                                _hover={{
                                                                                                    textColor: 'blue.500',
                                                                                                }}
                                                                                            >
                                                                                                <Link to={answer.fileName.signedUrl} target='_blank'>{answer.fileName.name}</Link>
                                                                                            </Text>
                                                                                        </Stack>
                                                                                        :
                                                                                        answer.fileType === FILE_TYPES.VIDEO ?
                                                                                            <Stack>
                                                                                                <video controls><source src={answer.fileName.signedUrl} /></video>
                                                                                                <Text
                                                                                                    mt={2}
                                                                                                    p={2}
                                                                                                    bg={'#F8F9FA'}
                                                                                                    borderRadius={5}
                                                                                                    textDecoration={'underline'}
                                                                                                    _hover={{
                                                                                                        textColor: 'blue.500',
                                                                                                    }}
                                                                                                >
                                                                                                    <Link to={answer.fileName.signedUrl} target='_blank'>{answer.fileName.name}</Link>
                                                                                                </Text>
                                                                                            </Stack> :
                                                                                            <></>
                                                                        }

                                                                    </Stack>
                                                                    :
                                                                    <></>
                                            }
                                        </Box>
                                    }
                                </Stack>
                            )
                        }) : <></>
                        }
                    </Stack>
                </Flex >
                :
                <Center py={16}>
                    <Spinner />
                </Center>
            }
        </Stack>
    )
}

ResponseView.propTypes = {
    response: PropTypes.object,
    findOne: PropTypes.func,
    isLoadingForGetResponse: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        response: state[moduleTypes.RESPONSE_VIEW].response,
        isLoadingForGetResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForGetResponse
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        findOne: (responseId) => {
            dispatch({ type: ResponseViewActionTypes.findOne, responseId })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseView);
