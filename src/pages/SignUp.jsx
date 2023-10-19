import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {
    Box,
    Text,
    Flex,
    Input,
    Stack,
    Button,
    Heading,
    FormLabel,
    FormControl,
    useColorModeValue,
    FormErrorMessage,
    AlertIcon,
    Alert
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { AuthActionTypes, AuthReducerTypes } from '../store/Auth/type';
import { connect } from 'react-redux';

const SignUp = ({ signUp, signUpForm, updateForm, isFormLoading, formErrorMessage, reset }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <div>
            <form onSubmit={handleSubmit(signUp)}>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>&nbsp;&nbsp; Create your account &nbsp;&nbsp;</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                to enjoy all of our cool features ✌️
                            </Text>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                {formErrorMessage ? <Alert status='error'>
                                    <AlertIcon />
                                    {formErrorMessage}
                                </Alert> : ''}
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input id='name' value={signUpForm.name}
                                        onInput={(event) => updateForm({ key: 'name', value: event.target.value })} type="name"  {...register('name', {
                                            required: 'This is required',
                                        })} autoComplete='true' />
                                    <FormErrorMessage>
                                        {errors.name && errors.name.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel htmlFor='email'>Email address</FormLabel>
                                    <Input
                                        id='email'
                                        value={signUpForm.email}
                                        onInput={(event) => updateForm({ key: 'email', value: event.target.value })}
                                        type="email"
                                        {...register('email', {
                                            required: 'This is required',
                                        })}
                                        autoComplete='true' />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.password}>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input id='password' value={signUpForm.password}
                                        onInput={(event) => updateForm({ key: 'password', value: event.target.value })}
                                        type="password"
                                        {...register('password', {
                                            required: 'This is required',
                                        })} autoComplete='true' />
                                    <FormErrorMessage>
                                        {errors.password && errors.password.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Stack spacing={10}>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        type='submit'
                                        isLoading={isFormLoading}
                                    >
                                        Sign up
                                    </Button>
                                </Stack>
                                <Text align="center" fontSize={'lg'} color={'gray.600'}>
                                    or
                                </Text>
                                <Link to="/">
                                    <Stack spacing={10} pt='2'>
                                        <Button>
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Link>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </form>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        signUpForm: state.auth.signUpForm,
        formErrorMessage: state.auth.formErrorMessage,
        isFormLoading: state.auth.isFormLoading
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        updateForm: ({ key, value }) => {
            dispatch({ type: AuthReducerTypes.UPDATE_SIGN_UP_FORM, key, value })
        },
        reset: () => {
            dispatch({ type: AuthReducerTypes.RESET })
        },
        signUp: () => {
            dispatch({ type: AuthActionTypes.signUp })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);