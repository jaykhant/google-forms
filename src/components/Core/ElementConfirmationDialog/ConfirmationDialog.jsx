import React from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';

const ConfirmationDialog = ({ isOpen, title, message, onClearForm, onCancle, isLoading }) => {
    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onCancle}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody fontWeight={500}>
                        {message}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button variant='ghost' onClick={onCancle}>
                            Cancel
                        </Button>
                        <Button variant='ghost' isLoading={isLoading} onClick={onClearForm} ml={3}>
                            Clear form
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ConfirmationDialog;