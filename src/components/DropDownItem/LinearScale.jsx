import React from 'react'
import { Text } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Input, Menu, MenuItem, MenuList, MenuButton } from '@chakra-ui/react'

const LinearScale = () => {
    return (
        <>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                    >
                        1 <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>0</MenuItem>
                        <MenuItem>1</MenuItem>
                    </MenuList>
                </Menu>
                <Text>to</Text>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                    >
                        5 <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                        <MenuItem>4</MenuItem>
                        <MenuItem>5</MenuItem>
                        <MenuItem>6</MenuItem>
                        <MenuItem>6</MenuItem>
                        <MenuItem>7</MenuItem>
                        <MenuItem>8</MenuItem>
                        <MenuItem>9</MenuItem>
                        <MenuItem>10</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text>1</Text>
                <Input w={'30%'} variant='flushed' placeholder='Label (Option)' />
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text>2</Text>
                <Input w={'30%'} variant='flushed' placeholder='Label (Option)' />
            </Stack>
        </>
    )
}

export default LinearScale;
