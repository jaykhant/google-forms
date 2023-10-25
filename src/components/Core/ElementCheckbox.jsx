import { Checkbox, Stack } from "@chakra-ui/react"

const ElementCheckbox = ({ value, options, onChange }) => {

    return (
        <Stack spacing={3} direction='column'>
            {options.map((option, index) =>
                <Checkbox onChange={(event)=>{
                    if(event.target.checked)
                        value.push(option)
                    else value.splice(value.indexOf(option), 1);
                    onChange(value)
                }} key={index} size={'lg'} colorScheme='blue'> {option}</Checkbox>
            )}
        </Stack>
    )
}

export default ElementCheckbox