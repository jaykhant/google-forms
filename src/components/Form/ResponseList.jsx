import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { ViewIcon } from '@chakra-ui/icons'
import { Tr, Td, Th, Thead, Tbody, Table, Button, TableContainer, Spinner, Center, Flex } from '@chakra-ui/react'
import { connect } from 'react-redux';
import { moduleTypes } from '../../store/type';
import { ResponseViewActionTypes } from '../../store/ResponseView/type';

const ResponseList = ({ responses, isLoadingForGetResponse, findAll }) => {

    const { formId } = useParams()

    useEffect(() => {
        findAll(formId)
    }, [findAll, formId])

    return (
        <TableContainer overflowY={'auto'} pt={6} px={{ base: "20", md: "40", lg: "60", xl: "80" }}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!isLoadingForGetResponse ? responses.map((response, index) =>
                        <Tr key={index}>
                            <Td>{response.user.name}</Td>
                            <Td>{response.user.email}</Td>
                            <Td>
                                <Link to={`/response/${response.id}`}> <Button size='sm'><ViewIcon /></Button></Link>
                            </Td>
                        </Tr>)
                        : <Tr>
                            <Td colSpan={5}>
                                <Flex>
                                    <Center width={'100%'}>
                                        <Spinner />
                                    </Center>
                                </Flex>
                            </Td>
                        </Tr>
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        responses: state[moduleTypes.RESPONSE_VIEW].responses,
        isLoadingForGetResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForGetResponse
    };
};
function mapDispatchToProps (dispatch) {
    return ({
        findAll: (formId) => {
            dispatch({ type: ResponseViewActionTypes.findAll, formId })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);
