import React from 'react'
import { Block } from '../general/block'

export default function Cell({width, height, ...props}) {
  return (
    <Block width={width} height={height} {...props}>

    </Block>
  )
}
