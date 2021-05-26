import React from 'react'
import { sizes } from '../ui/layout/sizes'

export default function Main({children}) {
  return (
    <div style={mainStyle}>
      {children}
    </div>
  )
}

const mainStyle = {
  margin: '0 auto',
  display: 'flex',
  width: '100%', 
  maxWidth: sizes.pageWidth, 
}