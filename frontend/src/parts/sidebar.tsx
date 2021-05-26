import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Flex } from '../ui/general/flex'

export default function Sidebar() {
  return (
    <Flex pt={100} pl={30} flexDirection='column' alignItems='flex-end' width='300px'>
      <Link to='/videoupload'>
        <Button variant='contained' color='primary'>Upload video</Button>
      </Link>
    </Flex>
  )
}
