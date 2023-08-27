import React from 'react'
import { Stack } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Text, Menu, Switch, MenuItem, MenuList, MenuButton } from '@chakra-ui/react'

const FileUpload = () => {
    return (
        <>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text w={"60%"}>Allow only specific file types</Text>
                <Switch id='file-types' />
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text w={"60%"}>Maximum number of files</Text>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                    >
                        1 <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>1</MenuItem>
                        <MenuItem>5</MenuItem>
                        <MenuItem>10</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="start">
                <Text w={"60%"}>Maximum file size</Text>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                    >
                        1MB <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>1 MB</MenuItem>
                        <MenuItem>10 MB</MenuItem>
                        <MenuItem>100 MB</MenuItem>
                        <MenuItem>1 GB</MenuItem>
                        <MenuItem>10 GB</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
        </>
    )
}

export default FileUpload;
