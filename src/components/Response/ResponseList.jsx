import React from 'react'
import { Link } from "react-router-dom";
import { ViewIcon } from '@chakra-ui/icons'
import { Tr, Td, Th, Thead, Tbody, Table, Button, TableContainer, Stack } from '@chakra-ui/react'

const ResponseList = () => {
    return (
        <div>
            <Stack h={'93vh'} bg={'#f0ebf8'}>
                <TableContainer my={6} mx={{ base: "20", md: "40", lg: "60", xl: "80" }}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Jay Khant</Td>
                                <Td>jay.khant.79@gmail.com</Td>
                                <Td>
                                    <Link to="/response-view"> <Button size='sm'><ViewIcon /></Button></Link>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </div >
    )
}

export default ResponseList;
