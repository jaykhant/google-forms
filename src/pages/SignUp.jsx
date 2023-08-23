import React from 'react'
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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const SignUp = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>Create your account</Heading>
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
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input type="name"  {...register('name', {
                                        required: 'This is required',
                                    })} />
                                    <FormErrorMessage>
                                        {errors.name && errors.name.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel htmlFor='email'>Email address</FormLabel>
                                    <Input type="email"  {...register('email', {
                                        required: 'This is required',
                                    })} />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.password}>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input type="password" {...register('password', {
                                        required: 'This is required',
                                    })} />
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
                                        isLoading={isSubmitting}
                                    >
                                        Sign up
                                    </Button>
                                </Stack>
                                <Text align="center" fontSize={'lg'} color={'gray.600'}>
                                    or
                                </Text>
                                <Link to="/">
                                    <Stack spacing={10} pt='2'>
                                        <Button
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}
                                            isLoading={isSubmitting}
                                        >
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

export default SignUp;
