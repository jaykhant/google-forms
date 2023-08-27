import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Text,
    Flex,
    Menu,
    Stack,
    Button,
    MenuList,
    MenuItem,
    MenuButton,
} from '@chakra-ui/react'
import React from 'react';

const Header = () => {
    const [show,setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <>
            <Box bg={'white'} px={4} position={'sticky'} top={0} zIndex={10}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>Google Form</Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant="unstyled"
                                    cursor={'pointer'}
                                    minW={0}
                                    onClick={handleClick}
                                    >
                                    <Flex gap={4} alignItems={'center'}>
                                        <Text>Jay Khant </Text>
                                        {!show ?  <ChevronDownIcon /> : <ChevronUpIcon />}
                                    </Flex>
                                </MenuButton>
                                <MenuList alignItems={'center'} >
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Header;