import {Flex, Radio, Stack, Text} from '@sanity/ui'
import {PatchEvent, StringInputProps, set} from 'sanity'
import React, {useCallback} from 'react'

/**
 * Custom input for linkType field that resets other fields when switching between options
 */
export function LinkTypeInput(props: StringInputProps) {
  const {onChange, value} = props

  // Function to handle change
  const handleLinkTypeChange = useCallback(
    (newValue: string) => {
      // Create a patch event to update the linkType
      onChange(PatchEvent.from(set(newValue)))
    },
    [onChange],
  )

  return (
    <Stack space={2} marginTop={2}>
      <Flex gap={3}>
        <Radio
          id="href-radio"
          name="linkType"
          value="href"
          checked={value === 'href'}
          onChange={() => handleLinkTypeChange('href')}
        />
        <Text>External URL</Text>
      </Flex>

      <Flex gap={3}>
        <Radio
          id="page-radio"
          name="linkType"
          value="page"
          checked={value === 'page'}
          onChange={() => handleLinkTypeChange('page')}
        />
        <Text>Internal Page</Text>
      </Flex>
    </Stack>
  )
}

export default LinkTypeInput
