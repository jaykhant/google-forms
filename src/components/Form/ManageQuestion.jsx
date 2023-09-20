import React, { useEffect } from 'react'
import Date from '../Form/QuestionTypes/Date';
import Time from '../Form/QuestionTypes/Time';
import { Input } from '@chakra-ui/input';
import { Switch } from '@chakra-ui/switch';
import DropDown from '../Form/QuestionTypes/Dropdown';
import Checkbox from '../Form/QuestionTypes/Checkbox';
import FileUpload from '../Form/QuestionTypes/FileUpload';
import ShortAnswer from '../Form/QuestionTypes/ShortAnswer';
import { Flex, Stack, Text, Box } from '@chakra-ui/layout';
import MultipleChoice from '../Form/QuestionTypes/MultipleChoice';
import Paragraph from '../Form/QuestionTypes/Paragraph';
import { ChevronDownIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { Button, Card, CardBody, CardFooter, Divider, useColorModeValue } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { FormActionTypes, FormReducerTypes } from '../../store/Form/type';
import { QUESTION_TYPES, QUESTION_TYPE_DISPLAY_NAMES } from '../../Constants'
import { useParams } from 'react-router-dom';

const ManageQuestion = ({
    form, updateForm, updateFormQuestion, update, findOne,
    addFormQuestion, deleteFormQuestion, copyFormQuestion,
    addFormQuestionOption, deleteFormQuestionOption, updateFormQuestionOption
}) => {
    const [containerHeight, setContainerHeight] = React.useState()
    useEffect(() => {
        setContainerHeight(window.innerHeight - 170)
    }, [])

    const { id } = useParams()

    useEffect(() => {
        findOne(id)
    }, [id, findOne])

    return (
        <>
            <Flex
                bg={'#f0ebf8'}
                overflowY={'auto'}
                flexDirection="column"
                height={`${containerHeight}px`}
                px={{ base: "10", md: "40", lg: "60", xl: "80" }}
            >
                <Stack spacing={8} py={12}>
                    <Box
                        p={8}
                        rounded={'lg'}
                        borderTop='4px'
                        boxShadow={'lg'}
                        borderTopColor='blue'
                        bg={useColorModeValue('white', 'gray.700')}
                    >
                        <Stack spacing={4}>
                            {form.title}
                            <Input
                                value={form.title}
                                onInput={(event) => updateForm({ key: 'title', value: event.target.value })} fontSize='32px'
                                variant='flushed'
                                placeholder='Form title'
                                fontWeight={'medium'}
                            />
                            <Input value={form.description} onInput={(event) => updateForm({ key: 'description', value: event.target.value })} variant='flushed' placeholder='Form description' />
                        </Stack>
                    </Box>
                </Stack>

                {
                    form.questions.map((question, questionIndex) =>
                        <Card mb={12} key={questionIndex}>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Flex w={'100%'} justifyContent='space-between' align='center'>
                                        <Input
                                            value={question.question}
                                            onInput={(event) => updateFormQuestion({
                                                key: 'question', value: event.target.value, questionIndex
                                            })}
                                            bgColor={'#F8F9FA'}
                                            w={'60%'}
                                            px={4}
                                            height={'50px'}
                                            variant='flushed'
                                            placeholder='Question'
                                        />
                                        <Menu>
                                            <MenuButton
                                                px={4}
                                                py={2}
                                                w={'35%'}
                                                transition='all 0.2s'
                                                borderRadius='md'
                                                borderWidth='1px'
                                                _focus={{ boxShadow: 'outline' }}
                                            >
                                                <Flex justifyContent='space-between' align='center'>
                                                    <Text>{QUESTION_TYPE_DISPLAY_NAMES[question.type]}</Text>
                                                    <ChevronDownIcon />
                                                </Flex>
                                            </MenuButton>
                                            <MenuList spacing={8}>
                                                <MenuItem value={QUESTION_TYPES.SHORT_ANSWER}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.SHORT_ANSWER, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.short_answer}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.PARAGRAPH}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.PARAGRAPH, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.paragraph}
                                                </MenuItem>
                                                <MenuDivider />
                                                <MenuItem value={QUESTION_TYPES.MULTIPLE_CHOICE}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.MULTIPLE_CHOICE, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.multiple_choice}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.CHECKBOX}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.CHECKBOX, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.checkbox}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.DROP_DOWN}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.DROP_DOWN, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.drop_down}
                                                </MenuItem>
                                                <MenuDivider />
                                                <MenuItem value={QUESTION_TYPES.FILE_UPLOAD}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.FILE_UPLOAD, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.file_upload}
                                                </MenuItem>
                                                <MenuDivider />
                                                <MenuItem value={QUESTION_TYPES.DATE}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.DATE, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.date}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.TIME}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.TIME, questionIndex
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.time}
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Flex>
                                </Stack>
                                <Stack py="5">
                                    {
                                        question.type === QUESTION_TYPES.SHORT_ANSWER ? <ShortAnswer /> :
                                            question.type === QUESTION_TYPES.PARAGRAPH ? <Paragraph /> :
                                                question.type === QUESTION_TYPES.MULTIPLE_CHOICE ?
                                                    <MultipleChoice
                                                        options={question.options}
                                                        onAddOption={() => addFormQuestionOption({ questionIndex })}
                                                        onUpdateOption={({ value, optionIndex }) => updateFormQuestionOption({ option: value, questionIndex, optionIndex })}
                                                        onDeleteOption={({ optionIndex }) => deleteFormQuestionOption({ questionIndex, optionIndex })}
                                                    /> :
                                                    question.type === QUESTION_TYPES.CHECKBOX ?
                                                        <Checkbox
                                                            options={question.options}
                                                            onAddOption={() => addFormQuestionOption({ questionIndex })}
                                                            onUpdateOption={({ value, optionIndex }) => updateFormQuestionOption({ option: value, questionIndex, optionIndex })}
                                                            onDeleteOption={({ optionIndex }) => deleteFormQuestionOption({ questionIndex, optionIndex })}
                                                        /> :
                                                        question.type === QUESTION_TYPES.DROP_DOWN ?
                                                            <DropDown
                                                                options={question.options}
                                                                onAddOption={() => addFormQuestionOption({ questionIndex })}
                                                                onUpdateOption={({ value, optionIndex }) => updateFormQuestionOption({ option: value, questionIndex, optionIndex })}
                                                                onDeleteOption={({ optionIndex }) => deleteFormQuestionOption({ questionIndex, optionIndex })}
                                                            /> :
                                                            question.type === QUESTION_TYPES.FILE_UPLOAD ? <FileUpload /> :
                                                                question.type === QUESTION_TYPES.DATE ? <Date /> :
                                                                    question.type === QUESTION_TYPES.TIME ? <Time />
                                                                        : <></>
                                    }
                                </Stack>
                                <Divider pt="5" />
                            </CardBody>
                            <CardFooter display="flex" alignItems="center" justifyContent="end">
                                <Button onClick={copyFormQuestion} borderRadius={'30px'} bg={'white'}>
                                    <CopyIcon />
                                </Button>
                                <Button
                                    onClick={deleteFormQuestion}
                                    borderRadius={'30px'} bg={'white'}>
                                    <DeleteIcon />
                                </Button>
                                <Divider orientation='vertical' h='30px' />
                                <Text px={4}>Required</Text>
                                <Switch id='email-alerts' />
                            </CardFooter>
                        </Card>
                    )
                }
            </Flex>

            <Box bg={'#f0ebf8'} px={{ base: "20", md: "40", lg: "60", xl: "80" }} position={'sticky'} bottom={0} zIndex={10}>
                <Flex gap={4} h={16} alignItems={'center'} justifyContent={'end'}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={addFormQuestion}
                    >
                        Add Question
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        type='submit'
                        onClick={update}
                    >
                        Save
                    </Button>
                </Flex>
            </Box>
        </ >
    )
}

const mapStateToProps = (state) => {
    return {
        form: state.form.form,
    };
};
function mapDispatchToProps (dispatch) {
    return ({
        findOne: (id) => {
            dispatch({ type: FormActionTypes.findOne, id })
        },
        updateForm: ({ key, value }) => {
            dispatch({ type: FormReducerTypes.UPDATE_FORM, key, value })
        },
        updateFormQuestion: ({ key, value, questionIndex }) => {
            dispatch({ type: FormReducerTypes.UPDATE_FORM_QUESTION, key, value, questionIndex })
        },
        addFormQuestion: () => {
            dispatch({ type: FormReducerTypes.ADD_FORM_QUESTION })
        },
        deleteFormQuestion: ({ deleteIndex }) => {
            dispatch({ type: FormReducerTypes.DELETE_FORM_QUESTION, deleteIndex })
        },
        copyFormQuestion: ({ copyIndex, question }) => {
            dispatch({ type: FormReducerTypes.COPY_FORM_QUESTION, copyIndex, question })
        },
        addFormQuestionOption: ({ questionIndex }) => {
            dispatch({ type: FormReducerTypes.ADD_FORM_QUESTION_OPTION, questionIndex })
        },
        deleteFormQuestionOption: ({ questionIndex, optionIndex }) => {
            dispatch({ type: FormReducerTypes.DELETE_FORM_QUESTION_OPTION, questionIndex, optionIndex })
        },
        updateFormQuestionOption: ({ questionIndex, optionIndex, option }) => {
            dispatch({ type: FormReducerTypes.UPDATE_FORM_QUESTION_OPTION, questionIndex, optionIndex, option })
        },
        update: () => {
            dispatch({ type: FormActionTypes.update })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestion);
