import PropTypes from 'prop-types'
import { connect } from "react-redux";
import React, { useEffect } from "react"
import ElementInput from '../Core/ElementInput'
import { moduleTypes } from "../../store/type";
import { EmailIcon, LinkIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareFormReducerTypes } from "../../store/ShareForm/type";
import {
    Tab, Text, Tabs, Flex, Modal, Stack, Button, Divider, useToast, TabList, TabPanel, ModalBody,
    TabPanels, ModalFooter, ModalOverlay, ModalHeader, ModalContent, TabIndicator, ModalCloseButton,
} from "@chakra-ui/react";

const ShareFormDialog = ({ isShareFormDialogOpen, updateForm, form, link, updateIsShareFormDialogOpen, isLoadingForShareForm, updateViewFormLink, isSelectEmail, updateIsSelectEmail, formId }) => {

    const toast = useToast()

    useEffect(() => {
        updateViewFormLink(process.env.REACT_APP_ENV === 'development' ? `http://localhost:3000/response/submit/${formId}` : `https://master.d1mzgxiygpvgso.amplifyapp.com/response/submit/${formId}`)
    }, [formId, updateViewFormLink])

    return (
        <Modal
            size={'xl'}
            onClose={() => {
                updateIsShareFormDialogOpen(false)
            }}
            isOpen={isShareFormDialogOpen}
            motionPreset='slideInBottom'
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Send form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs position="relative" variant="unstyled">
                        <Flex justifyContent={'start'} alignItems={'center'}>
                            <Text mr={5} fontSize={14} fontWeight={500}>Send via</Text>
                            <TabList>
                                <Tab w={'80px'} onClick={() => {
                                    updateIsSelectEmail(false)
                                }}><EmailIcon /></Tab>
                                <Tab w={'80px'} onClick={() => {
                                    updateIsSelectEmail(true)
                                }}><LinkIcon /></Tab>
                            </TabList>
                        </Flex>
                        <TabIndicator
                            mt="-1.5px"
                            height="3px"
                            bg="#4C2B87"
                            borderRadius="1px"
                        />
                        <Divider pt={'0.5px'} />
                        <TabPanels>
                            <TabPanel p={0} my={3}>
                                <Text fontWeight={'500'} py={2}>Email</Text>
                                <Stack gap={0} py={2}>
                                    <Text fontSize={14} color={'#70757a'}>To</Text>
                                    <ElementInput placeholder='Enter names or email addresses' value={form.to} onChange={(value) => {
                                        updateForm({ key: 'to', value })
                                    }} />
                                </Stack>
                                <Stack gap={0} py={2}>
                                    <Text fontSize={14} color={'#70757a'}>Subject</Text>
                                    <ElementInput value={form.subject} onChange={(value) => {
                                        updateForm({ key: 'subject', value })
                                    }} />
                                </Stack>
                                <Stack gap={0} py={2}>
                                    <Text fontSize={14} color={'#70757a'}>Message</Text>
                                    <ElementInput value={form.message} onChange={(value) => {
                                        updateForm({ key: 'message', value })
                                    }} />
                                </Stack>
                            </TabPanel>
                            <TabPanel p={0} mt={3}>
                                <Text fontWeight={'500'} py={2}>Link</Text>
                                <ElementInput value={link} onChange={(value) => {
                                    console.log(value);
                                }} onKeyDown={(e) => e.preventDefault()} />
                            </TabPanel>
                        </TabPanels>

                    </Tabs>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='gray' variant='ghost' onClick={() => {
                        updateIsShareFormDialogOpen(false)
                    }}>
                        Cancle
                    </Button>
                    {!isSelectEmail ?
                        <Button color={'#4C2B87'} px={6} ml={3} colorScheme='gray' variant='outline' isLoading={isLoadingForShareForm} onClick={() => {
                            console.log('send');
                        }}>
                            Send
                        </Button>
                        :
                        <CopyToClipboard text={link}
                            onCopy={() => {
                                toast({
                                    title: 'Copied tp clipboard.',
                                    status: 'success',
                                    position: 'bottom-left',
                                })
                            }}>
                            <Button color={'#4C2B87'} px={6} ml={3} colorScheme='gray' variant='outline'>
                                Copy
                            </Button>
                        </CopyToClipboard>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

ShareFormDialog.propTypes = {
    form: PropTypes.object,
    link: PropTypes.string,
    formId: PropTypes.string,
    updateForm: PropTypes.func,
    isSelectEmail: PropTypes.bool,
    updateViewFormLink: PropTypes.func,
    updateIsSelectEmail: PropTypes.func,
    isShareFormDialogOpen: PropTypes.bool,
    isLoadingForShareForm: PropTypes.bool,
    updateIsShareFormDialogOpen: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        form: state[moduleTypes.SHARE_FORM].form,
        link: state[moduleTypes.SHARE_FORM].viewFormLink,
        isSelectEmail: state[moduleTypes.SHARE_FORM].isSelectEmail,
        isShareFormDialogOpen: state[moduleTypes.SHARE_FORM].isShareFormDialogOpen,
        isLoadingForShareForm: state[moduleTypes.SHARE_FORM].isLoadingForShareForm,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        updateForm: ({ key, value }) => {
            dispatch({ type: ShareFormReducerTypes.UPDATE_FORM, key, value })
        },
        updateViewFormLink: (viewFormLink) => {
            dispatch({ type: ShareFormReducerTypes.UPDATE_VIEW_FORM_LINK, viewFormLink })
        },
        updateIsSelectEmail: (isSelectEmail) => {
            dispatch({ type: ShareFormReducerTypes.UPDATE_IS_SELECT_EMAIL, isSelectEmail })
        },
        updateIsShareFormDialogOpen: (isShareFormDialogOpen) => {
            dispatch({ type: ShareFormReducerTypes.UPDATE_IS_SHARE_FORM_DIALOG_OPEN, isShareFormDialogOpen })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareFormDialog);