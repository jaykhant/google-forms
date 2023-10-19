import React from 'react'
import { Stack } from '@chakra-ui/layout';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';

const ElementCheckbox = ({ name, value, onInput, options, register, isRequired }) => {
    return (
        <CheckboxGroup onChange={(value) => onInput(value)} defaultValue={value}>
            <Stack spacing={3} direction={['column']}>
                {
                    options.map((item, index) => {
                        return (
                            <Checkbox
                                id={`${name}${index}`}
                                key={index}
                                size={'lg'}
                                value={`${item}`}
                                {...register(name,
                                    isRequired ? {
                                        required: 'This is a required question',
                                    } : false)
                                }
                            >
                                {item}
                            </Checkbox>
                        )
                    })
                }
            </Stack>
        </CheckboxGroup>
    )
}

export default ElementCheckbox;