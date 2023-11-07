import React,{ useEffect } from 'react'
import PropTypes from 'prop-types'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Center, Flex, Spinner } from '@chakra-ui/react'
import FormList from '../components/Form/FormList';
import { connect } from 'react-redux';
import { FormActionTypes, FormReducerTypes } from '../store/Form/type';

const Dashboard = ({
    forms,
    findAll,
    loadMore,
    totalData,
    clearForm,
    createForm,
    isLoadingForGetForm,
    isLoadingForCreateForm,
}) => {

    useEffect(() => {
        clearForm()
        findAll()
    }, [clearForm, findAll])

    useEffect(() => {
        if (!isLoadingForGetForm && totalData > forms.length) findAll()
    }, [findAll, loadMore, isLoadingForGetForm, totalData, forms.length])

    return (
        <div>
            <Flex px={{ base: "20", md: "40", lg: "60", xl: "80" }} align="center" justify="end" >
                <Button isLoading={isLoadingForCreateForm} mt="4" size='md' onClick={createForm}><AddIcon mr="3" />  Add Form</Button>
            </Flex>
            <FormList />
            {(totalData > forms.length) || isLoadingForGetForm ?
                <Center>
                    <Spinner />
                </Center>
                :
                <></>
            }
        </div>
    )
}

Dashboard.propTypes = {
    forms: PropTypes.array,
    findAll: PropTypes.func,
    loadMore: PropTypes.bool,
    totalData: PropTypes.number,
    clearForm: PropTypes.func,
    createForm: PropTypes.func,
    isLoadingForGetForm: PropTypes.bool,
    isLoadingForCreateForm: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        forms: state.form.forms,
        totalData: state.form.totalData,
        isLoadingForGetForm: state.form.isLoadingForGetForm,
        isLoadingForCreateForm: state.form.isLoadingForCreateForm
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        findAll: () => {
            dispatch({ type: FormActionTypes.findAll })
        },
        createForm: () => {
            dispatch({ type: FormActionTypes.create })
        },
        clearForm: () => {
            dispatch({ type: FormReducerTypes.CLEAR_FORMS })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
