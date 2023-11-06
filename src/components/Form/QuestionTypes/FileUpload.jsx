import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@chakra-ui/layout';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, Grid, Text, Menu, Switch, MenuItem, GridItem, MenuList, MenuButton, Checkbox } from '@chakra-ui/react'
import { FILE_TYPES } from '../../../Constants';

const FileUpload = ({
    fileType, allowSpecificFileTypes, allowMaximumFileSize, onUpdateMaximumFilesize,
    onUpdateFileTypes, onUpdateAllowSpecificFileTypes
}) => {

    const [isShowMenu, setShowMenu] = useState(false)

    useEffect(() => {
        if (!fileType) onUpdateFileTypes([])
        if (!allowMaximumFileSize) onUpdateMaximumFilesize(1)
    }, [fileType, allowMaximumFileSize, onUpdateMaximumFilesize, onUpdateFileTypes])

    const onCheckChange = (event, type) => {
        if (event.target.checked) fileType.push(type)
        else fileType.splice(fileType.indexOf(type), 1)
        onUpdateFileTypes(fileType)
    }

    const onMaximumFilesizeChange = (allowMaximumFileSize) => {
        onUpdateMaximumFilesize(allowMaximumFileSize)
    }

    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            <GridItem w='100%'>
                <Stack>
                    <Flex gap="4" direction='row' alignItems="center" justifyContent="space-between">
                        <Text>Allow only specific file types</Text>
                        <Switch isChecked={allowSpecificFileTypes} onChange={() => {
                            onUpdateAllowSpecificFileTypes(!allowSpecificFileTypes)
                        }} />
                    </Flex>
                    {allowSpecificFileTypes ? <>
                        <Flex gap="4" direction='row' alignItems="center" justifyContent="space-between">
                            <Checkbox isChecked={fileType.includes(FILE_TYPES.DOCUMENT)} onChange={(event) => onCheckChange(event, FILE_TYPES.DOCUMENT)} size='lg'>Document</Checkbox>
                            <Checkbox isChecked={fileType.includes(FILE_TYPES.IMAGE)} onChange={(event) => onCheckChange(event, FILE_TYPES.IMAGE)} size='lg'>Image</Checkbox>
                        </Flex>
                        <Flex gap="4" direction='row' alignItems="center" justifyContent="space-between">
                            <Checkbox isChecked={fileType.includes(FILE_TYPES.VIDEO)} onChange={(event) => onCheckChange(event, FILE_TYPES.VIDEO)} size='lg'>Video</Checkbox>
                            <Checkbox isChecked={fileType.includes(FILE_TYPES.AUDIO)} onChange={(event) => onCheckChange(event, FILE_TYPES.AUDIO)} size='lg' pr={1}>Audio</Checkbox>
                        </Flex>
                    </> : <></>}
                </Stack>
                <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="space-between">
                    <Text>Maximum file size</Text>
                    <Menu>
                        <MenuButton py={4} onClick={() => setShowMenu(!isShowMenu)}>
                            <Flex gap={4} alignItems={'center'}>
                                <Text>{allowMaximumFileSize} MB</Text>
                                {isShowMenu ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </Flex>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => onMaximumFilesizeChange(1)}>1 MB</MenuItem>
                            <MenuItem onClick={() => onMaximumFilesizeChange(5)}>5 MB</MenuItem>
                            <MenuItem onClick={() => onMaximumFilesizeChange(10)}>10 MB</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </GridItem>
            <GridItem />
        </Grid>
    )
}

FileUpload.propTypes = {
    fileType: PropTypes.array,
    allowSpecificFileTypes: PropTypes.bool,
    allowMaximumFileSize: PropTypes.number,
    onUpdateMaximumFilesize: PropTypes.func,
    onUpdateFileTypes: PropTypes.func,
    onUpdateAllowSpecificFileTypes: PropTypes.func,
}

export default FileUpload;
