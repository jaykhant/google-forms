import React from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import FormList from '../components/Form/FormList';
import { connect } from 'react-redux';
import { FormActionTypes } from '../store/Form/type';

const Dashboard = ({ createForm, isLoadingForCreateForm }) => {
    return (
        <>
            <Flex px={{ base: "20", md: "40", lg: "60", xl: "80" }} align="center" justify="end" >
                <Button isLoading={isLoadingForCreateForm} mt="4" size='md' onClick={createForm}><AddIcon mr="3" />  Add Form</Button>
            </Flex>
            <FormList />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoadingForCreateForm: state.form.isLoadingForCreateForm
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        createForm: () => {
            dispatch({ type: FormActionTypes.create })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
