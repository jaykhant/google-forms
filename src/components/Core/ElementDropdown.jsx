import PropTypes from 'prop-types'
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";

const ElementDropDown = ({ value, options, onChange, error }) => {

    return (
        <Stack spacing={1}>
            <Menu>
                <MenuButton
                    px={4}
                    py={2}
                    w={'25%'}
                    transition='all 0.2s'
                    borderRadius='md'
                    borderWidth='1px'
                    borderColor={error ? 'red' : 'gray.200'}
                    _focus={{ boxShadow: 'outline' }}
                >
                    <Flex justifyContent='space-between' align='center'>
                        <Text>{value ? value : 'Choose'}</Text>
                        <ChevronDownIcon />
                    </Flex>
                </MenuButton>
                <MenuList spacing={8}>
                    {options.map((option, index) =>
                        <MenuItem onClick={() => { onChange(option) }} key={index}>
                            {option}
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
            {error ? <Text color={'red'} fontSize={'sm'}>{error.message}</Text> : <></>}
        </Stack>
    )
}

ElementDropDown.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array,
    error: PropTypes.object,
    value: PropTypes.string,
}

export default ElementDropDown;