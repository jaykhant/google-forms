import React from 'react'
import { Input } from '@chakra-ui/input';
import { FILE_ACCEPT_TYPE } from '../../../Constants'

const ElementInput = ({ ext, name, type, value, onInput, variant, register, isRequired }) => {
    let acceptFileType = ''
    for (let index = 0; index < ext?.length; index++)  acceptFileType += FILE_ACCEPT_TYPE[ext[index]]

    return (
        <Input
            id={name}
            type={type}
            name={name}
            value={value}
            variant={variant}
            autoComplete='off'
            accept={acceptFileType}
            placeholder='Your answer'
            onInput={
                (event) =>
                    onInput(event)
            }
            {...register(name,
                isRequired ? {
                    required: 'This is a required question',
                } : '')
            }
        />
    )
}

export default ElementInput;