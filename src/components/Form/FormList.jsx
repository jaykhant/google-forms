import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons'
import { FormActionTypes, FormReducerTypes } from '../../store/Form/type'
import ConfirmationDialog from '../Core/ConfirmationDialog'
import { useToast, Button, Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { moduleTypes } from '../../store/type'

const FormList = ({
    forms,
    error,
    deleteForm,
    clearErrorMessage,
    isLoadingForGetForm,
    isLoadingForDeleteForm,
    isDeleteConfirmationDialogOpen,
    updateIsDeleteConfirmationDialogOpen
}) => {

    const toast = useToast()

    let [deleteIndex, setDeleteIndex] = useState(0)

    useEffect(() => {
        if (error.message != '') {
            toast({
                position: 'top',
                description: error.message,
                status: error.type,
                isClosable: true,
                duration: 2000
            })
        }
        clearErrorMessage()
    }, [error.message, error.type, clearErrorMessage])

    return (
        <>
            <TableContainer py={6}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Created</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {!isLoadingForGetForm ? forms.map(function (form, i) {
                            return (
                                <Tr key={i}>
                                    <Td>{form.title}</Td>
                                    <Td>{form.createdAt}</Td>
                                    <Td>
                                        <Link to={`/form/${form.id}`}> <Button size='sm'><SettingsIcon /></Button></Link>
                                        <Button ml="4" colorScheme='red' size='sm' onClick={() => {
                                            updateIsDeleteConfirmationDialogOpen(true);
                                            setDeleteIndex(i)
                                        }}><DeleteIcon /></Button>
                                    </Td>
                                </Tr>
                            );
                        }) : <></>}
                    </Tbody>
                </Table>
                {forms.length === 0 && !isLoadingForGetForm ?
                    <Center py={4}>
                        No Data Found
                    </Center>
                    :
                    <></>
                }
            </TableContainer>
            <ConfirmationDialog
                isOpen={isDeleteConfirmationDialogOpen}
                isLoading={isLoadingForDeleteForm}
                onCancle={() => { updateIsDeleteConfirmationDialogOpen(false) }}
                onDelete={() => {
                    deleteForm(deleteIndex)
                }} />
        </>
    )
}

FormList.propTypes = {
    forms: PropTypes.array,
    deleteForm: PropTypes.func,
    error: PropTypes.object,
    clearErrorMessage: PropTypes.func,
    isLoadingForGetForm: PropTypes.bool,
    isLoadingForDeleteForm: PropTypes.bool,
    isDeleteConfirmationDialogOpen: PropTypes.bool,
    updateIsDeleteConfirmationDialogOpen: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        forms: state[moduleTypes.FORM].forms,
        error: state[moduleTypes.FORM].error,
        isLoadingForGetForm: state[moduleTypes.FORM].isLoadingForGetForm,
        isLoadingForDeleteForm: state[moduleTypes.FORM].isLoadingForDeleteForm,
        isDeleteConfirmationDialogOpen: state[moduleTypes.FORM].isDeleteConfirmationDialogOpen
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        deleteForm: (deleteIndex) => dispatch({
            type: FormActionTypes.delete,
            deleteIndex
        }),
        updateIsDeleteConfirmationDialogOpen: (isDeleteConfirmationDialogOpen) => dispatch({
            type: FormReducerTypes.UPDATE_IS_DELETE_CONFIRMATION_DIALOG_OPEN,
            isDeleteConfirmationDialogOpen
        }),
        clearErrorMessage: () => {
            dispatch({ type: FormReducerTypes.CLEAR_ERROR_MESSAGE })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(FormList);