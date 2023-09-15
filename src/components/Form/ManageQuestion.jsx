import React from 'react'
import Date from '../DropDownItem/Date';
import Time from '../DropDownItem/Time';
import { Input } from '@chakra-ui/input';
import { Switch } from '@chakra-ui/switch';
import DropDown from '../DropDownItem/Dropdown';
import Checkbox from '../DropDownItem/Checkbox';
import FileUpload from '../DropDownItem/FileUpload';
import ShortAnswer from '../DropDownItem/ShortAnswer';
import { Flex, Stack, Text, Box } from '@chakra-ui/layout';
import MultipleChoice from '../DropDownItem/MultipleChoice';
import Paragraph from '../DropDownItem/Paragraph';
import { ChevronDownIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { Button, Card, CardBody, CardFooter, Divider, useColorModeValue } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { FormReducerTypes } from '../../store/Form/type';
import { QUESTION_TYPES, QUESTION_TYPE_DISPLAY_NAMES } from '../../Constants'

const ManageQuestion = ({ form, updateForm, updateFormQuestion }) => {
    return (
        <div>
            <Flex
                px={{ base: "20", md: "40", lg: "60", xl: "80" }}
                flexDirection="column"
                bg={'#f0ebf8'}>
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
                            <Input value={form.title} onInput={(event) => updateForm({ key: 'title', value: event.target.value })} fontSize='24px' variant='flushed' placeholder='Name' />
                            <Input value={form.description} onInput={(event) => updateForm({ key: 'description', value: event.target.value })} variant='flushed' placeholder='Description' />
                        </Stack>
                    </Box>
                </Stack>

                {
                    form.questions.map((question, index) =>
                        <Card mb={12} key={index}>
                            <CardBody>
                                <Stack spacing={4}>
                                    <Flex w={'100%'} justifyContent='space-between' align='center'>
                                        <Input
                                            value={question.question}
                                            onInput={(event) => updateFormQuestion({
                                                key: 'question', value: event.target.value, index
                                            })}
                                            w={'60%'} fontSize='24px' variant='flushed' placeholder='Question'
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
                                                        key: 'type', value: QUESTION_TYPES.SHORT_ANSWER, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.short_answer}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.PARAGRAPH}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.PARAGRAPH, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.paragraph}
                                                </MenuItem>
                                                <MenuDivider />
                                                <MenuItem value={QUESTION_TYPES.MULTIPLE_CHOICE}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.MULTIPLE_CHOICE, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.multiple_choice}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.CHECKBOX}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.CHECKBOX, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.checkbox}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.DROP_DOWN}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.DROP_DOWN, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.drop_down}
                                                </MenuItem>
                                                <MenuDivider />
                                                <MenuItem value={QUESTION_TYPES.FILE_UPLOAD}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.FILE_UPLOAD, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.file_upload}
                                                </MenuItem>
                                                <MenuDivider />
                                                <MenuItem value={QUESTION_TYPES.DATE}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.DATE, index
                                                    })}
                                                >
                                                    {QUESTION_TYPE_DISPLAY_NAMES.date}
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPES.TIME}
                                                    onClick={() => updateFormQuestion({
                                                        key: 'type', value: QUESTION_TYPES.TIME, index
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
                                                question.type === QUESTION_TYPES.MULTIPLE_CHOICE ? <MultipleChoice /> :
                                                    question.type === QUESTION_TYPES.CHECKBOX ? <Checkbox /> :
                                                        question.type === QUESTION_TYPES.DROP_DOWN ? <DropDown /> :
                                                            question.type === QUESTION_TYPES.FILE_UPLOAD ? <FileUpload /> :
                                                                question.type === QUESTION_TYPES.DATE ? <Date /> :
                                                                    question.type === QUESTION_TYPES.TIME ? <Time />
                                                                        : <></>
                                    }
                                </Stack>
                                <Divider pt="5" />
                            </CardBody>
                            <CardFooter gap="4" display="flex" alignItems="center" justifyContent="end">
                                <CopyIcon />
                                <DeleteIcon />
                                <Divider orientation='vertical' h='30px' />
                                <Text>Required</Text>
                                <Switch id='email-alerts' />
                            </CardFooter>
                        </Card>
                    )
                }
            </Flex>
            <Box bg={'#f0ebf8'} px={{ base: "20", md: "40", lg: "60", xl: "80" }} position={'sticky'} bottom={0} zIndex={10}>
                <Flex h={16} alignItems={'center'} justifyContent={'end'}>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        type='submit'
                    >
                        Send
                    </Button>
                </Flex>
            </Box>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        form: state.form.form,
    };
};
function mapDispatchToProps (dispatch) {
    return ({
        updateForm: ({ key, value }) => {
            dispatch({ type: FormReducerTypes.UPDATE_FORM, key, value })
        },
        updateFormQuestion: ({ key, value, index }) => {
            dispatch({ type: FormReducerTypes.UPDATE_FORM_QUESTION, key, value, index })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestion);
