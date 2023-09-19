import React, { useEffect, useState } from 'react'
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons'
import { Button, Center, Flex, Spinner, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FormActionTypes } from '../../store/Form/type'
import { connect } from 'react-redux'
import DeleteConfirmationDialog from '../Core/DeleteConfirmationDialog'

const FormList = ({ forms, findAll, isLoadingForGetForm, deleteForm }) => {

    useEffect(() => {
        findAll()
    }, [findAll])

    let [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] = useState(false)
    let [deleteIndex, setDeleteIndex] = useState(0)

    return (
        <Stack h={'87vh'} bg={'#f0ebf8'}>
            <div>
            </div>
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
                        {!isLoadingForGetForm ? forms.map(function (form, i) {
                            return (
                                <Tr key={i}>
                                    <Td>{form.title}</Td>
                                    <Td>{form.status}</Td>
                                    <Td><Link to={`/submit-form/${form.id}`}>Link</Link></Td>
                                    <Td>{form.createdAt}</Td>
                                    <Td>
                                        <Link to={`/manage-form/${form.id}`}> <Button size='sm'><SettingsIcon /></Button></Link>
                                        <Button ml="4" colorScheme='red' size='sm' onClick={() => {
                                            setIsDeleteConfirmationDialogOpen(true);
                                            setDeleteIndex(i)
                                        }}><DeleteIcon /></Button>
                                    </Td>
                                </Tr>
                            );
                        }) : <Tr>
                            <Td colSpan={5}><Flex>
                                <Center width={'100%'}>
                                    <Spinner />
                                </Center>
                            </Flex>
                            </Td>
                        </Tr>}

                    </Tbody>
                </Table>
            </TableContainer>
            <DeleteConfirmationDialog
                isOpen={isDeleteConfirmationDialogOpen}
                onCancle={() => { setIsDeleteConfirmationDialogOpen(false) }}
                onDelete={() => {
                    setIsDeleteConfirmationDialogOpen(false)
                    deleteForm(deleteIndex)
                }} />
        </Stack>
    )
}

const mapStateToProps = (state) => {
    return {
        forms: state.form.forms,
        isLoadingForGetForm: state.form.isLoadingForGetForm
    };
};
function mapDispatchToProps (dispatch) {
    return ({
        findAll: () => {
            dispatch({ type: FormActionTypes.findAll })
        },
        deleteForm: () => dispatch({
            type: FormActionTypes.delete
        })
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(FormList);