import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Text, Menu, Flex, MenuList, MenuItem, MenuButton, MenuDivider } from '@chakra-ui/react';

const ElementDropdown = ({ name, value, onInput, options }) => {

    const [show, setShow] = React.useState(false)
    const onFocus = () => setShow(true)
    const onBlur = () => setShow(false)

    return (
        <Menu id={name}>
            <MenuButton
                px={4}
                py={2}                
                type='button'
                borderRadius='md'
                borderWidth='1px'
                transition='all 0.2s'
            >
                <Flex gap={4} justifyContent='space-between' alignItems='center'>
                    <Text>{value ? value : 'Choose'}</Text>
                    {!show ? <ChevronDownIcon /> : <ChevronUpIcon />}
                </Flex>
            </MenuButton>
            <MenuList onClick={(event) => onInput(event)} onFocus={onFocus} onBlur={onBlur} defaultValue={value}>
                <MenuItem>Choose</MenuItem>
                <MenuDivider />
                {
                    options.map((item, index) => {
                        return (
                            <MenuItem key={index} py={2} value={`${item}`}> {item} </MenuItem>
                        )
                    })
                }
            </MenuList>
        </Menu>
    )
}

export default ElementDropdown;