import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { ViewIcon } from '@chakra-ui/icons'
import { Tr, Td, Th, Thead, Tbody, Table, Button, TableContainer, Spinner, Center, Flex } from '@chakra-ui/react'
import { connect } from 'react-redux';
import { moduleTypes } from '../../store/type';
import { ResponseViewActionTypes, ResponseViewReducerTypes } from '../../store/ResponseView/type';

const ResponseList = (
    {
        findAll,
        loadMore,
        responses,
        totalData,
        clearResponse,
        isLoadingForGetResponse,
    }
) => {
    const { formId } = useParams()
    let [allDataIsLoaded, SetAllDataIsLoaded] = useState(false)

    useEffect(() => {
        clearResponse()
        findAll(formId)
        if (totalData === responses.length + 1) SetAllDataIsLoaded(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findAll, formId, clearResponse])

    useEffect(() => {
        if (!isLoadingForGetResponse && totalData > responses.length) {
            findAll(formId)
            if (totalData === responses.length + 1) { SetAllDataIsLoaded(true) }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findAll, formId, loadMore.loadMore])

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
            {responses.length === 0 && !isLoadingForGetResponse ?
                <Center py={4}>
                    No Data Found
                </Center>
                :
                <></>
            }
            {(totalData !== -1 & !allDataIsLoaded) || isLoadingForGetResponse ?
                <Center py={4}>
                    Loading....
                </Center>
                :
                <></>
            }
        </TableContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        totalData: state[moduleTypes.RESPONSE_VIEW].totalData,
        responses: state[moduleTypes.RESPONSE_VIEW].responses,
        isLoadingForGetResponse: state[moduleTypes.RESPONSE_VIEW].isLoadingForGetResponse
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        findAll: (formId) => {
            dispatch({ type: ResponseViewActionTypes.findAll, formId })
        },
        clearResponse: () => {
            dispatch({ type: ResponseViewReducerTypes.CLEAR_RESPONSES })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);
