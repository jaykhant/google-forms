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
import { connect } from 'react-redux';
import { AppReducerTypes } from '../../store/App/type.js';
import { Link } from 'react-router-dom';

const Header = ({ logout, user }) => {
    const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false)
    return (
        <>
            <Box bg={'white'} px={4} position={'sticky'} top={0} zIndex={10}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Link to={'/'}><Box>Google Form</Box></Link>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant="unstyled"
                                    cursor={'pointer'}
                                    minW={0}
                                    onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
                                >
                                    <Flex gap={4} alignItems={'center'}>
                                        <Text>{user.name} </Text>
                                        {!isContextMenuOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                                    </Flex>
                                </MenuButton>
                                <MenuList alignItems={'center'} >
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.app.user,
    };
};
function mapDispatchToProps (dispatch) {
    return ({
        logout: () => {
            dispatch({ type: AppReducerTypes.LOGOUT })
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);