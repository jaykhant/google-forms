import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import PropTypes from 'prop-types'
import React from "react"

const ConfirmationDialog = ({ isOpen, onDelete, onCancle, isLoading }) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onCancle}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can not undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onCancle}>
                            Cancel
                        </Button>
                        <Button isLoading={isLoading} colorScheme="red" onClick={onDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

ConfirmationDialog.propTypes = {
    isOpen: PropTypes.bool,
    onDelete: PropTypes.func,
    onCancle: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default ConfirmationDialog;