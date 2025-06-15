import {Box, Button, Card, Flex, Stack, Text, useToast} from '@sanity/ui'
import {ObjectInputProps, PatchEvent, unset} from 'sanity'
import React, {useCallback, useEffect, useRef} from 'react'

import {LinkIcon} from '@sanity/icons'

/**
 * Enhanced LinkInput component that provides a better UI for selecting links
 * in the Sanity Studio.
 */
export function LinkInput(props: ObjectInputProps) {
  const {renderDefault, onChange, value} = props
  const toast = useToast()

  // We can use useFormValue to get the current values directly from the value object
  const linkType = value?.linkType as string
  const href = value?.href as string
  const page = value?.page as Record<string, any> | null

  // Keep track of previous linkType value to detect changes
  const prevLinkTypeRef = useRef<string | null>(null)

  // Effect to reset values when linkType changes
  useEffect(() => {
    // Skip on initial render
    if (prevLinkTypeRef.current === null) {
      prevLinkTypeRef.current = linkType
      return
    }

    // Skip if linkType hasn't changed
    if (prevLinkTypeRef.current === linkType) {
      return
    }

    // Clear the field that's not currently selected
    if (linkType === 'href') {
      // Clear page field
      if (page) {
        onChange(PatchEvent.from(unset(['page'])))
      }
    } else if (linkType === 'page') {
      // Clear href field
      if (href) {
        onChange(PatchEvent.from(unset(['href'])))
      }
    }

    // Update the previous linkType ref
    prevLinkTypeRef.current = linkType
  }, [linkType, href, page, onChange])

  // Handler for testing URL links
  const handleTestUrl = useCallback(() => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      toast.push({
        status: 'warning',
        title: 'No URL provided',
        description: 'Please enter a URL first',
      })
    }
  }, [href, toast])

  const handleReset = useCallback(() => {
    onChange(PatchEvent.from(unset(['linkType'])))
    onChange(PatchEvent.from(unset(['href'])))
    onChange(PatchEvent.from(unset(['page'])))
  }, [onChange])

  return (
    <Stack space={4}>
      <Card padding={4} radius={2} shadow={1} tone="primary">
        <Flex align="center" gap={3} justify="space-between">
          <Flex align="center" gap={3}>
            <Box>
              <LinkIcon />
            </Box>
            <Text weight="semibold">Link Configuration</Text>
          </Flex>
          {linkType === 'href' && (
            <Button
              mode="ghost"
              tone="primary"
              text="Test URL"
              onClick={handleTestUrl}
              disabled={!href}
            />
          )}
          {/* rest the value of the whole object */}
          <Button mode="ghost" tone="primary" text="Reset" onClick={handleReset} />
        </Flex>
      </Card>

      {/* Render the default input UI */}
      {renderDefault(props)}
    </Stack>
  )
}

export default LinkInput
