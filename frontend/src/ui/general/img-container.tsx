import React from 'react'
import { Flex } from './flex'
import { Img } from './img'

export const ImgContainer = (props) => {
  return (
    <Flex alignItems='flex-start'>
      <Img {...props} />
    </Flex>
  )
}