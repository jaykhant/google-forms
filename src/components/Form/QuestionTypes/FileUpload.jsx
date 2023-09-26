import React from 'react'
import { Stack } from '@chakra-ui/layout';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, Grid, Text, Menu, Switch, MenuItem, GridItem, MenuList, MenuButton, Checkbox } from '@chakra-ui/react'

const FileUpload = () => {
    const [isShowMenu, setShowMenu] = React.useState(false)
    const handleChange = () => setShowMenu(!isShowMenu)

    return (
        <>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <GridItem w='100%'>
                    <Stack>
                        <Flex gap="4" direction='row' alignItems="center" justifyContent="space-between">
                            <Text>Allow only specific file types</Text>
                            <Switch id='file-types' />
                        </Flex>
                        <Flex gap="4" direction='row' alignItems="center" justifyContent="space-between">
                            <Checkbox size='lg'>Document</Checkbox>
                            <Checkbox size='lg'>Image</Checkbox>
                        </Flex>
                        <Flex gap="4" direction='row' alignItems="center" justifyContent="space-between">
                            <Checkbox size='lg'>Video</Checkbox>
                            <Checkbox size='lg' pr={1}>Audio</Checkbox>
                        </Flex>
                    </Stack>
                    <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="space-between">
                        <Text>Maximum file size</Text>
                        <Menu>
                            <MenuButton py={4} onClick={handleChange}>
                                <Flex gap={4} alignItems={'center'}>
                                    <Text>1MB</Text>
                                    {isShowMenu ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>1 MB</MenuItem>
                                <MenuItem>5 MB</MenuItem>
                                <MenuItem>10 MB</MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </GridItem>
                <GridItem />
            </Grid>
        </>
    )
}

export default FileUpload;
