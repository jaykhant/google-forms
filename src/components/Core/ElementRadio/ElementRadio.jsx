import React from 'react'
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/react';

const ElementRadio = ({ name, value, onInput, options, register, isRequired }) => {
    return (
        <RadioGroup onChange={(value) => onInput(value)} defaultValue={value}>
            <Stack spacing={5} direction='column'>
                {
                    options.map((item, index) => {
                        return (
                            <Radio
                                key={index}
                                size={'lg'}
                                value={`${item}`}
                                {...register(name,
                                    isRequired ? {
                                        required: 'This is a required question',
                                    } : '')
                                }
                            >
                                {item}
                            </Radio>
                        )
                    })
                }
            </Stack>
        </RadioGroup>
    )
}

export default ElementRadio;