import React from 'react'
import { Link } from "react-router-dom";
import { DeleteIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons'
import { Button, Flex, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const FormList = () => {
    return (
        <div>
            <Flex px={{ base: "20", md: "40", lg: "60", xl: "80" }} align="center" justify="end" bg={'#f0ebf8'}>
                <Link to={'/manage-form'}>
                    <Button mt="4" size='md'><AddIcon mr="3" />  Add Form</Button>
                </Link>
            </Flex>
            <Stack h={'87vh'} bg={'#f0ebf8'}>
            <TableContainer my={6} mx={{ base: "20", md: "40", lg: "60", xl: "80" }} >
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th>Link</Th>
                            <Th>Created</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Jay Khant</Td>
                            <Td>Active</Td>
                            <Td><a rel="noreferrer" href="https://chakra-ui.com/docs/components/button" target='_blank'>Link</a></Td>
                            <Td>23/08/2023, 5:06 PM</Td>
                            <Td>
                                <Link to="/manage-form"> <Button size='sm'><SettingsIcon /></Button></Link>
                                <Button ml="4" colorScheme='red' size='sm'><DeleteIcon /></Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            </Stack>
        </div >
    )
}

export default FormList;
