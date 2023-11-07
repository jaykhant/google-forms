import PropTypes from 'prop-types'
import React,{ useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { ViewIcon } from '@chakra-ui/icons'
import { Tr, Td, Th, Thead, Tbody, Table, Button, TableContainer, Spinner, Center, Stack } from '@chakra-ui/react'
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

    useEffect(() => {
        clearResponse()
        findAll(formId)
    }, [findAll, formId, clearResponse])

    useEffect(() => {
        if (!isLoadingForGetResponse && totalData > responses.length) {
            findAll(formId)
        }
    }, [findAll, formId, loadMore.loadMore])

    return (
        <Stack>
            <TableContainer overflowY={'auto'} pt={6} px={{ base: "8", md: "14", lg: "28", xl: "44" }}>
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
                            : <></>
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
            </TableContainer>
            {(totalData > responses.length) || isLoadingForGetResponse ?
                <Center>
                    <Spinner />
                </Center>
                :
                <></>
            }
        </Stack>
    )
}

ResponseList.propTypes = {
    findAll: PropTypes.func,
    loadMore: PropTypes.object,
    responses: PropTypes.array,
    totalData: PropTypes.number,
    clearResponse: PropTypes.func,
    isLoadingForGetResponse: PropTypes.bool,
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
