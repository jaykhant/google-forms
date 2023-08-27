import React from 'react'
import { Input } from '@chakra-ui/input';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
    Card,
    Menu,
    Radio,
    Button,
    Divider,
    CardBody,
    Checkbox,
    MenuItem,
    MenuList,
    MenuButton,
    RadioGroup,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';

const AnswerForm = () => {
    return (
        <div>
            <Flex
                py={5}
                gap={4}
                px={{ base: "20", md: "40", lg: "60", xl: "80" }}
                minH={'100vh'}
                flexDirection="column"
                bg={'#f0ebf8'}>

                <Stack>
                    <Card borderTop='8px'
                        boxShadow={'lg'}
                        borderTopColor='blue'>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text fontSize={'28px'} fontWeight={'medium'}>Google-Form</Text>
                                <Text>ABCDEFGHIJKLMNOPQRSTUVWXYZ</Text>
                            </Stack>
                            <Divider p={2} />
                            <Text fontWeight={'medium'} py={2}>sagarkankdiya@amylesoft.com</Text>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Short Answer</Text>
                                <Input variant='flushed' placeholder='Your answer' />
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Paragraph</Text>
                                <Input variant='flushed' placeholder='Your answer' />
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Multiple Choice</Text>
                                <RadioGroup >
                                    <Stack spacing={5} direction='column'>
                                        <Radio size={'lg'} colorScheme='blue' value='1'>
                                            Option 1
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Checkboxes</Text>
                                <Stack direction={'column'}>
                                    <Checkbox size={'lg'} colorScheme='blue'> Option 1</Checkbox>
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Dropdown</Text>
                                <Menu >
                                    <MenuButton
                                        px={4}
                                        py={2}
                                        w={'25%'}
                                        transition='all 0.2s'
                                        borderRadius='md'
                                        borderWidth='1px'
                                        _focus={{ boxShadow: 'outline' }}
                                    >
                                        <Flex justifyContent='space-between' align='center'>
                                            <Text>Choose</Text>
                                            <ChevronDownIcon />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList spacing={8} >
                                        <MenuItem>
                                            Option 1
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>File Upload</Text>
                                <Input type='file' variant='flushed' placeholder='Your answer' />
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Linear Scale</Text>
                                <Flex gap={10} direction={'row'} justifyContent='center' align='center'>
                                    <Text>1</Text>
                                    <Text>2</Text>
                                    <Text>3</Text>
                                    <Text>4</Text>
                                    <Text>5</Text>
                                </Flex>
                                <RadioGroup>
                                    <Stack spacing={'30px'} direction='row' justifyContent='center' align='center'>
                                        <Radio size={'lg'} colorScheme='blue' value='1'>
                                        </Radio>
                                        <Radio size={'lg'} colorScheme='blue' value='2'>
                                        </Radio>
                                        <Radio size={'lg'} colorScheme='blue' value='3'>
                                        </Radio>
                                        <Radio size={'lg'} colorScheme='blue' value='4'>
                                        </Radio>
                                        <Radio size={'lg'} colorScheme='blue' value='5'>
                                        </Radio>
                                    </Stack>
                                </RadioGroup>

                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Multiple choice grid</Text>
                                <Flex
                                    align='center'
                                    justifyContent='space-between'
                                >
                                    <Text></Text>
                                    <Text pr={20}>column 1</Text>
                                </Flex>
                                <Flex
                                    px={2}
                                    h={12}
                                    gap={4}
                                    align='center'
                                    borderRadius={8}
                                    direction={'row'}
                                    justifyContent='space-between'
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                >
                                    <Text>Row 1</Text>
                                    <Radio pr={24} size={'lg'} colorScheme='blue' value='3'></Radio>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Tick box grid</Text>
                                <Flex
                                    align='center'
                                    justifyContent='space-between'
                                >
                                    <Text></Text>
                                    <Text pr={20}>column 1</Text>
                                </Flex>
                                <Flex
                                    px={2}
                                    h={12}
                                    gap={4}
                                    align='center'
                                    borderRadius={8}
                                    direction={'row'}
                                    justifyContent='space-between'
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                >
                                    <Text>Row 1</Text>
                                    <Checkbox pr={24} size={'lg'} colorScheme='blue'></Checkbox>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Date</Text>
                                <Stack direction={'column'}>
                                    <Input w={'20%'} type='date' variant='flushed' placeholder='Your answer' />
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Card>
                        <CardBody>
                            <Stack spacing={4}>
                                <Text>Time</Text>
                                <Stack direction={'column'}>
                                    <Input w={'20%'} type='time' variant='flushed' placeholder='Your answer' />
                                </Stack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>

                <Stack>
                    <Flex justifyContent='space-between' align='center'>
                        <Button colorScheme='teal' variant='solid'>Submit</Button>
                        <Text color={'blue'}>Clear form</Text>
                    </Flex>
                </Stack>

            </Flex>
        </div >
    )
}

export default AnswerForm;
