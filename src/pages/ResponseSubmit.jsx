import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { QUESTION_TYPES } from '../Constants';
import { Controller, useForm } from 'react-hook-form';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import ElementInput from "../components/Core/ElementInput/ElementInput";
import ElementRadio from "../components/Core/ElementRadio/ElementRadio";
import ElementDropdown from "../components/Core/ElementDropdown/ElementDropdown";
import ElementCheckbox from "../components/Core/ElementCheckbox/ElementCheckbox";
import { FormSubmitActionTypes, FormSubmitReducerTypes } from '../store/FormSubmit/type';
import ConfirmationDialog from "../components/Core/ElementConfirmationDialog/ConfirmationDialog";
import { Card, Button, Center, Divider, Spinner, CardBody, useToast, FormErrorMessage, FormControl } from '@chakra-ui/react'
import ResponseService from "../service/ResponseService";
let responseService = new ResponseService()

const ResponseSubmit = (
    {
        form,
        findOne,
        clearForm,
        currentUser,
        updateAnswer,
        submitResponse,
        uploadSignedUrl,
        updateIsSubmitResponseSuccessfully,
        isLoadingForGetForm,
        isLoadingForClearForm,
        isLoadingForSubmitForm,
        isSubmitResponseSuccessfully,
        isClearFormConfirmationDialogOpen,
        updateIsClearFormConfirmationDialogOpen
    }
) => {

    let {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const toast = useToast()

    const [containerHeight, setContainerHeight] = React.useState()
    const { formId } = useParams()
    useEffect(() => {
        setContainerHeight(window.innerHeight - 64)
        updateIsSubmitResponseSuccessfully(false)
        findOne(formId)
    }, [formId, findOne, updateIsSubmitResponseSuccessfully])

    let onMediaSelect = (event, index) => {
        const file = event.target.files[0]
        if (file) {
            updateAnswer({ key: 'fileName', value: file.name, index })
            const fileSizeMb = parseInt((file.size / 1048576).toFixed(2));
            const ext = file.name.split('.').pop();

            if (5 >= fileSizeMb) {
                responseService.generateSignedUrl(formId, ext).then((res) => {
                    updateAnswer({ key: 'fileName', value: res.name, index })
                    uploadSignedUrl({
                        signedUrl: res.signedUrl,
                        file,
                    });
                });
            } else {
                toast({
                    duration: 9000,
                    status: 'error',
                    position: 'top',
                    isClosable: true,
                    title: 'Uploaded file',
                    description: 'File size exceeded,You can upload max file of 5MB',
                })
            };
        }
    }

    return (
        <div>
            <Flex
                py={5}
                gap={4}
                flexDirection="column"
                px={{ base: "20", md: "40", lg: "60", xl: "80" }}
            >
                {isSubmitResponseSuccessfully ?
                    <Stack>
                        <Card
                            boxShadow='lg'
                            borderTop='8px'
                            borderTopColor='blue'
                        >
                            <CardBody>
                                <Stack spacing={4}>
                                    <Text fontSize='28px' fontWeight='medium'>{form.title}</Text>
                                    <Text>Your response has been recorded.</Text>
                                    <Button as='u' size='sm' color='#1a73e8' variant='link' cursor='pointer' justifyContent='start' onClick={() => { updateIsSubmitResponseSuccessfully(false); window.location.reload(); findOne(formId) }}>Submit another response</Button>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Stack>
                    :
                    <>
                        {!isLoadingForGetForm ?
                            <form onSubmit={handleSubmit(submitResponse)}>
                                <Stack spacing={6}>
                                    <Stack>
                                        <Card boxShadow='lg' borderTop='8px solid blue'>
                                            <CardBody>
                                                <Stack spacing={4}>
                                                    <Text fontSize='28px' fontWeight='medium'>{form.title}</Text>
                                                    <Text>{form.description}</Text>
                                                </Stack>
                                                <Divider py={2} />
                                                <Text py={2} fontWeight='bold'>{currentUser.email}</Text>
                                                <Divider />
                                                <Text pt={2} fontSize='14px' color='#D93025'>* Indicates required question</Text>
                                            </CardBody>
                                        </Card>
                                    </Stack>
                                    {
                                        form.questions?.map((question, index) =>
                                            <Card key={index} border={errors[`${question.type}${index}`] ? '1px solid red' : ''}>
                                                <CardBody>
                                                    <FormControl isInvalid={errors[`${question.type}${index}`]}>
                                                        <Stack pb={2} gap={2} display='flex' direction={'row'} alignItems={'center'}>
                                                            <Text>{question.question}</Text>
                                                            <span>{question.isRequired ? <Text color={'red'}>*</Text> : <></>}</span>
                                                        </Stack>
                                                        {
                                                            question.type === QUESTION_TYPES.SHORT_ANSWER ?
                                                                <ElementInput
                                                                    type='text'
                                                                    variant='flushed'
                                                                    register={register}
                                                                    name={`short_answer${index}`}
                                                                    value={question.answer || ''}
                                                                    isRequired={question.isRequired}
                                                                    onInput={(event) => updateAnswer({ key: 'answer', value: event.target.value, index })}
                                                                />
                                                                :
                                                                question.type === QUESTION_TYPES.PARAGRAPH ?
                                                                    <ElementInput
                                                                        type='text'
                                                                        variant='flushed'
                                                                        register={register}
                                                                        name={`paragraph${index}`}
                                                                        value={question.answer || ''}
                                                                        isRequired={question.isRequired}
                                                                        onInput={(event) => updateAnswer({ key: 'answer', value: event.target.value, index })}
                                                                    />
                                                                    :
                                                                    question.type === QUESTION_TYPES.MULTIPLE_CHOICE ?
                                                                        <ElementRadio
                                                                            register={register}
                                                                            value={question.answer}
                                                                            options={question.options}
                                                                            name={`multiple_choice${index}`}
                                                                            isRequired={question.isRequired}
                                                                            onInput={(value) => updateAnswer({ key: 'answer', value, index })}
                                                                        />
                                                                        :
                                                                        question.type === QUESTION_TYPES.CHECKBOX ?
                                                                            <ElementCheckbox
                                                                                register={register}
                                                                                name={`checkbox${index}`}
                                                                                options={question.options}
                                                                                value={question.answers}
                                                                                isRequired={question.isRequired}
                                                                                onInput={(value) => updateAnswer({ key: 'answers', value, index })}
                                                                            />
                                                                            :
                                                                            question.type === QUESTION_TYPES.DROP_DOWN ?
                                                                                <Controller
                                                                                    name={`${question.type}${index}`}
                                                                                    control={control}
                                                                                    defaultValue=""
                                                                                    render={({ field: { onChange } }) => (
                                                                                        <ElementDropdown
                                                                                            name={`${question.type}${index}`}
                                                                                            options={question.options}
                                                                                            value={question.answer || ''}
                                                                                            onInput={
                                                                                                (event) => {
                                                                                                    onChange(event)
                                                                                                    updateAnswer({ key: 'answer', value: event.target.value, index })
                                                                                                }
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                    rules={question.isRequired ? { required: 'This is a required question' } : ''}
                                                                                />
                                                                                :
                                                                                question.type === QUESTION_TYPES.FILE_UPLOAD ?
                                                                                    <ElementInput
                                                                                        type='file'
                                                                                        variant='flushed'
                                                                                        register={register}
                                                                                        ext={question.fileType}
                                                                                        value={question.answer}
                                                                                        name={`file_upload${index}`}
                                                                                        isRequired={question.isRequired}
                                                                                        onInput={(event) => onMediaSelect(event, index)}
                                                                                    />
                                                                                    :
                                                                                    question.type === QUESTION_TYPES.DATE ?
                                                                                        <ElementInput
                                                                                            type='date'
                                                                                            variant='flushed'
                                                                                            register={register}
                                                                                            name={`date${index}`}
                                                                                            value={question.dateTime || ''}
                                                                                            isRequired={question.isRequired}
                                                                                            onInput={(event) => updateAnswer({ key: 'dateTime', value: event.target.value, index })}
                                                                                        />
                                                                                        :
                                                                                        question.type === QUESTION_TYPES.TIME ?
                                                                                            <ElementInput
                                                                                                type='time'
                                                                                                variant='flushed'
                                                                                                register={register}
                                                                                                name={`time${index}`}
                                                                                                value={question.dateTime || ''}
                                                                                                isRequired={question.isRequired}
                                                                                                onInput={(event) => updateAnswer({ key: 'dateTime', value: event.target.value, index })}
                                                                                            />
                                                                                            : <></>
                                                        }
                                                        <FormErrorMessage>
                                                            {errors[`${question.type}${index}`] && errors[`${question.type}${index}`].message}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                </CardBody>
                                            </Card>
                                        )
                                    }
                                    <Stack>
                                        <Flex justifyContent='space-between' align='center'>
                                            <Button type='submit' colorScheme='teal' variant='solid' isLoading={isLoadingForSubmitForm}>Submit</Button>
                                            <Button color='blue' variant='ghost' onClick={() => { updateIsClearFormConfirmationDialogOpen(true) }}>Clear form</Button>
                                        </Flex>
                                    </Stack>
                                </Stack>
                            </form>
                            :
                            <Flex>
                                <Center width={'100%'} height={`${containerHeight}px`}>
                                    <Spinner />
                                </Center>
                            </Flex>
                        }
                    </>
                }
            </Flex>
            <ConfirmationDialog
                title={'Clear form?'}
                message={'This will remove your answers from all questions and cannot be undone.'}
                isOpen={isClearFormConfirmationDialogOpen}
                isLoading={isLoadingForClearForm}
                onCancle={() => { updateIsClearFormConfirmationDialogOpen(false) }}
                onClearForm={() => {
                    updateIsClearFormConfirmationDialogOpen(false)
                    reset()
                    clearForm()
                    findOne(formId)
                }}
            />
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.app.user,
        form: state.formSubmit.form,
        answer: state.formSubmit.answer,
        isLoadingForGetForm: state.formSubmit.isLoadingForGetForm,
        isLoadingForClearForm: state.formSubmit.isLoadingForClearForm,
        isLoadingForSubmitForm: state.formSubmit.isLoadingForSubmitForm,
        isSubmitResponseSuccessfully: state.formSubmit.isSubmitResponseSuccessfully,
        isClearFormConfirmationDialogOpen: state.formSubmit.isClearFormConfirmationDialogOpen
    };
};

function mapDispatchToProps(dispatch) {
    return ({
        findOne: (formId) => {
            dispatch({ type: FormSubmitActionTypes.findOne, formId })
        },
        updateAnswer: ({ key, value, index }) => {
            dispatch({ type: FormSubmitReducerTypes.SUBMIT_FORM_ANSWER, key, value, index })
        },
        updateIsClearFormConfirmationDialogOpen: (isClearFormConfirmationDialogOpen) => {
            dispatch({ type: FormSubmitReducerTypes.UPDATE_IS_CLEAR_CONFIRMATION_DIALOG_OPEN, isClearFormConfirmationDialogOpen })
        },
        submitResponse: () => {
            dispatch({ type: FormSubmitActionTypes.create })
        },
        uploadSignedUrl: ({ signedUrl, file }) => {
            dispatch({ type: FormSubmitActionTypes.uploadSignedUrl, signedUrl, file })
        },
        updateIsSubmitResponseSuccessfully: (isSubmitResponseSuccessfully) => {
            dispatch({ type: FormSubmitReducerTypes.UPDATE_IS_SUBMIT_RESPONSE_SUCCESSFULLY, isSubmitResponseSuccessfully })
        },
        clearForm: () => {
            dispatch({ type: FormSubmitReducerTypes.CLEAR_FORM })
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseSubmit);