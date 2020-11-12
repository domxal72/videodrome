import React from 'react'

export default function Main({children}) {
  return (
    <div style={mainStyle}>
      {children}
    </div>
  )
}

const mainStyle = {
  margin: '0 auto',
  display: 'block',
  width: '100%', 
  maxWidth: '1000px', 
}