import React from 'react'
import Date from '../DropDownItem/Date';
import Time from '../DropDownItem/Time';
import { Input } from '@chakra-ui/input';
import { Switch } from '@chakra-ui/switch';
import DropDown from '../DropDownItem/Dropdown';
import Checkboxes from '../DropDownItem/Checkboxes';
import FileUpload from '../DropDownItem/FileUpload';
import ShortAnswer from '../DropDownItem/ShortAnswer';
import LinearScale from '../DropDownItem/LinearScale';
import { Flex, Stack, Text, Box } from '@chakra-ui/layout';
import MultipleChoice from '../DropDownItem/MultipleChoice';
import ParagraphAnswer from '../DropDownItem/ParagraphAnswer';
import MultipleChoiceGrid from '../DropDownItem/MultipleChoiceGrid';
import { ChevronDownIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { Button, Card, CardBody, CardFooter, Divider, useColorModeValue } from '@chakra-ui/react';

const ManageQuestion = () => {
    return (
        <div>
            <Flex
                px={{ base: "20", md: "40", lg: "60", xl: "80" }}
                flexDirection="column"
                bg={'#f0ebf8'}>
                <Stack spacing={8} py={12} >
                    <Box
                        p={8}
                        rounded={'lg'}
                        borderTop='4px'
                        boxShadow={'lg'}
                        borderTopColor='blue'
                        bg={useColorModeValue('white', 'gray.700')}
                    >
                        <Stack spacing={4}>
                            <Input fontSize='24px' variant='flushed' placeholder='Untitled form' />
                            <Input variant='flushed' placeholder='From description' />
                        </Stack>
                    </Box>
                </Stack>

                <Card mb={12}>
                    <CardBody>
                        <Stack spacing={4}>
                            <Flex w={'100%'} justifyContent='space-between' align='center'>
                                <Input w={'60%'} fontSize='24px' variant='flushed' placeholder='Question' />
                                <Menu >
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
                                            <Text>Short Answer</Text>
                                            <ChevronDownIcon />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList spacing={8} >
                                        <MenuItem>
                                            Short Answer
                                        </MenuItem>
                                        <MenuItem>
                                            Paragraph
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem>
                                            Multiple choise
                                        </MenuItem>
                                        <MenuItem>
                                            Checkboxes
                                        </MenuItem>
                                        <MenuItem>
                                            Drop down
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem>
                                            File Upload
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem>
                                            Linear scale
                                        </MenuItem>
                                        <MenuItem>
                                            Multiple-choise-grid
                                        </MenuItem>
                                        <MenuItem>
                                            Tick box grid
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem>
                                            Date
                                        </MenuItem>
                                        <MenuItem>
                                            Time
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Stack>
                        <Stack py="5">
                            <ShortAnswer />
                            <ParagraphAnswer />
                            <MultipleChoice />
                            <Checkboxes />
                            <DropDown />
                            <FileUpload />
                            <LinearScale />
                            <MultipleChoiceGrid />
                            <Date />
                            <Time />
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

export default ManageQuestion;
