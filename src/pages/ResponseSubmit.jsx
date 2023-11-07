import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { Card, Button, Divider, CardBody, Spinner, Center } from '@chakra-ui/react'
import { connect } from 'react-redux';
import { moduleTypes } from '../store/type'
import { useParams } from 'react-router-dom';
import { QUESTION_TYPES } from '../Constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ElementInput from '../components/Core/ElementInput';
import ElementDropDown from '../components/Core/ElementDropdown';
import { ResponseViewActionTypes, ResponseViewReducerTypes } from '../store/ResponseView/type';
import ElementMultipleChoice from '../components/Core/ElementMultipleChoice';
import ElementCheckbox from '../components/Core/ElementCheckbox';
import ElementDate from '../components/Core/ElementDate';
import ElementTime from '../components/Core/ElementTime';
import ElementFileUpload from '../components/Core/ElementFileUpload';
import ConfirmationDialog from '../components/Core/ConfirmationDialog';

const ResponseSubmit = ({
    isLoadingForGetResponse, response, findOneForm, loggedInUser,
    validationSchema, updateAnswerInResponse, uploadFile, create, isLoadingForSubmitResponse, clearResponse,
    isLoadingForClearResponse, isClearResponseConfirmationDialogOpen, updateIsClearFormConfirmationDialogOpen
}) => {

    const { formId } = useParams()

    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(validationSchema)
    })

    useEffect(() => {
        findOneForm(formId)
    }, [findOneForm, formId])

    return (
        <Stack>
            {!isLoadingForGetResponse ?
                <Flex
                    py={5}
                    gap={4}
                    flexDirection="column"
                    px={{ base: "20", md: "40", lg: "60", xl: "80" }}
                >
                    <Stack>
                        <Card borderTop='8px'
                            boxShadow={'lg'}
                            borderTopColor='blue'>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Text fontSize={'28px'} fontWeight={'medium'}>{response.title}</Text>
                                    {response.description ? <Text>{response.description}</Text> : <></>}
                                </Stack>
                                <Divider p={2} />
                                <Text fontWeight={'medium'} py={2}>{loggedInUser.email}</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                    <Stack spacing={5}>
                        {response.answers?.map((question, questionIndex) => {
                            return (
                                <Controller
                                    key={questionIndex}
                                    name={`${questionIndex}`}
                                    control={control}
                                    render={({ field: { onChange }, fieldState: { error } }) => {
                                        return (
                                            <Card border={error ? '1px solid red' : ''}>
                                                <CardBody>
                                                    <Stack spacing={4}>
                                                        <Stack direction={'row'}>
                                                            <Text>{question.question}</Text>{response.questions[questionIndex].isRequired ? <Text color='red'>*</Text> : <></>}
                                                        </Stack>
                                                        {
                                                            question.type === QUESTION_TYPES.SHORT_ANSWER ? (
                                                                <ElementInput value={question.answer} maxWidth={'60'} error={error} onChange={(value) => {
                                                                    onChange(value)
                                                                    updateAnswerInResponse({ key: 'answer', value, questionIndex })
                                                                }} />
                                                            ) : question.type === QUESTION_TYPES.PARAGRAPH ? (
                                                                <ElementInput value={question.answer} error={error} onChange={(value) => {
                                                                    onChange(value)
                                                                    updateAnswerInResponse({ key: 'answer', value, questionIndex })
                                                                }} />
                                                            ) : question.type === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                                                                <ElementMultipleChoice options={question.options} value={question.answer} error={error} onChange={(value) => {
                                                                    onChange(value)
                                                                    updateAnswerInResponse({ key: 'answer', value, questionIndex })
                                                                }} />
                                                            ) : question.type === QUESTION_TYPES.CHECKBOX ? (
                                                                <ElementCheckbox value={question.answers} error={error}
                                                                    onChange={(value) => {
                                                                        onChange(value)
                                                                        updateAnswerInResponse({ key: 'answers', value, questionIndex })
                                                                    }}
                                                                    options={question.options} />
                                                            ) : question.type === QUESTION_TYPES.DROP_DOWN ? (
                                                                <ElementDropDown value={question.answer} options={question.options} error={error} onChange={(value) => {
                                                                    onChange(value)
                                                                    updateAnswerInResponse({ key: 'answer', value, questionIndex })
                                                                }} />
                                                            ) : question.type === QUESTION_TYPES.FILE_UPLOAD ? (
                                                                <ElementFileUpload value={question.fileName} error={error} fileType={response.questions[questionIndex].fileType} onChange={(file) => {
                                                                    onChange(file)
                                                                    uploadFile({ formId, file, questionIndex })
                                                                }} />
                                                            ) : question.type === QUESTION_TYPES.DATE ? (
                                                                <ElementDate value={question.dateTime} error={error} onChange={(value) => {
                                                                    onChange(value)
                                                                    updateAnswerInResponse({ key: 'dateTime', value, questionIndex })
                                                                }} />
                                                            ) : question.type === QUESTION_TYPES.TIME ? (
                                                                <ElementTime value={question.dateTime} error={error} onChange={(value) => {
                                                                    onChange(value)
                                                                    updateAnswerInResponse({ key: 'dateTime', value, questionIndex })
                                                                }} />
                                                            ) :
                                                                <></>
                                                        }
                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                        )
                                    }}
                                />
                            )
                        }
                        )}
                    </Stack>
                    <Stack>
                        <Flex justifyContent='space-between' align='center'>
                            <Button colorScheme='teal' variant='solid' isLoading={isLoadingForSubmitResponse} onClick={handleSubmit(() => {
                                create({ formId, response })
                            })}>Submit</Button>
                            <Text color={'blue'} cursor={'pointer'} onClick={(() => {
                                updateIsClearFormConfirmationDialogOpen(true)
                            })}>Clear form</Text>
                        </Flex>
                    </Stack>
                </Flex>
                :
                <Center py={10} width={'100%'}>
                    <Spinner />
                </Center>
            }
            <ConfirmationDialog
                title={'Clear form?'}
                message={'This will remove your answers from all questions and cannot be undone.'}
                isOpen={isClearResponseConfirmationDialogOpen}
                isLoading={isLoadingForClearResponse}
                onCancle={() => { updateIsClearFormConfirmationDialogOpen(false) }}
                onDelete={() => {
                    updateIsClearFormConfirmationDialogOpen(false)
                    reset()
                    clearResponse()
                    findOneForm(formId)
                }}
            />
        </Stack> 
    )
}

ResponseSubmit.propTypes = {
    response: PropTypes.object,
    findOneForm: PropTypes.func,
    loggedInUser: PropTypes.object,
    validationSchema: PropTypes.object,
    updateAnswerInResponse: PropTypes.func,
    uploadFile: PropTypes.func,
    create: PropTypes.func,
    clearResponse: PropTypes.func,
    isLoadingForGetResponse: PropTypes.bool,
    isLoadingForSubmitResponse: PropTypes.bool,
    isLoadingForClearResponse: PropTypes.bool,
    isClearResponseConfirmationDialogOpen: PropTypes.bool,
    updateIsClearFormConfirmationDialogOpen: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        response: state[moduleTypes.RESPONSE_VIEW].response,
        isLoadingForGetResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForGetResponse,
        isLoadingForSubmitResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForSubmitResponse,
        validationSchema: state[moduleTypes.RESPONSE_VIEW].validationSchema,
        isClearResponseConfirmationDialogOpen: state[moduleTypes.RESPONSE_VIEW].isClearResponseConfirmationDialogOpen,
        isLoadingForClearResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForClearResponse,
        loggedInUser: state[moduleTypes.APP].user
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        findOneForm: (formId) => {
            dispatch({ type: ResponseViewActionTypes.findOneForm, formId })
        },
        updateAnswerInResponse: ({ key, value, questionIndex }) => {
            dispatch({ type: ResponseViewReducerTypes.UPDATE_ANSWER_IN_RESPONSE, key, value, questionIndex })
        },
        updateFileInResponse: ({ fileName, fileType }) => {
            dispatch({ type: ResponseViewReducerTypes.UPDATE_ANSWER_IN_RESPONSE, key: 'fileName', value: fileName })
            dispatch({ type: ResponseViewReducerTypes.UPDATE_ANSWER_IN_RESPONSE, key: 'fileType', value: fileType })
        },
        uploadFile: ({ formId, file, questionIndex }) => {
            dispatch({ type: ResponseViewActionTypes.uploadFile, formId, file, questionIndex })
        },
        create: ({ formId, response }) => {
            dispatch({ type: ResponseViewActionTypes.create, formId, response })
        },
        clearResponse: () => {
            dispatch({ type: ResponseViewReducerTypes.CLEAR_RESPONSE })
        },
        updateIsClearFormConfirmationDialogOpen:(isClearResponseConfirmationDialogOpen) =>{
            dispatch({ type: ResponseViewReducerTypes.UPDATE_IS_CLEAR_RESPONSE_CONFIRMATION_DIALOG_OPEN,isClearResponseConfirmationDialogOpen })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseSubmit);
