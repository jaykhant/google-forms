import React from 'react'
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Grid, Text, Circle, GridItem, CloseButton } from '@chakra-ui/react'

const MultipleChoiceGrid = () => {
    return (
        <>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <GridItem>
                    <Text fontWeight="semibold">Rows</Text>
                    <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="space-between">
                        <Text>1.</Text>
                        <Input variant='flushed' placeholder='Row 1' />
                    </Stack>
                    <Stack pt='2' gap="4" direction='row' alignItems="center" justifyContent="space-between">
                        <Stack gap="4" direction='row' alignItems="center" justifyContent="start">
                            <Text>2.</Text>
                            <Text>Add Row</Text>
                        </Stack>
                        <CloseButton />
                    </Stack>
                </GridItem>
                <GridItem>
                    <Text fontWeight="semibold">Columns</Text>
                    <Stack gap="4" direction='row' display="flex" alignItems="center" justifyContent="space-between">
                        <Circle size='20px' border='2px' borderColor="gray">
                        </Circle>
                        <Input variant='flushed' placeholder='Column 1' />
                    </Stack>
                    <Stack pt='2' gap="4" direction='row' alignItems="center" justifyContent="space-between">
                        <Stack gap="4" direction='row' alignItems="center" justifyContent="start">
                            <Circle size='20px' border='2px' borderColor="gray">
                            </Circle>
                            <Text>Add Column</Text>
                        </Stack>
                        <CloseButton />
                    </Stack>
                </GridItem>
            </Grid>

        </>
    )
}

export default MultipleChoiceGrid;
