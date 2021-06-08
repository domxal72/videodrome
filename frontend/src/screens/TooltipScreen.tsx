import React, { useState } from 'react'



const Table = ({ data, showTooltip, hideTooltip, moveTooltip }) => {
  return (
    <ul>
      {data.map((item) => (
        <Cell key={item.id} item={item} showTooltip={showTooltip} hideTooltip={hideTooltip} moveTooltip={moveTooltip} />
      ))}
    </ul>
  )
}

const Cell = ({ item, showTooltip, hideTooltip, moveTooltip }) => {
  return (
    <li
      key={item.id}
      style={{padding: '15px', boxSizing: 'border-box', height: '50px', border: '1px solid teal'}}
      onMouseEnter={(e) => {showTooltip(item, e)}}
      // onMouseLeave={hideTooltip}
      onMouseLeave={(e) => {hideTooltip(e)}}
      onMouseMove={(e) => {moveTooltip(e)}}
    >
      <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{item.id}</div>
      <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{item.name}</div>
    </li>
  )
}

const Tooltip = ({ position }) => {
  return (
    <div style={{
        display: position.display,
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {position.text}
    </div>
  )
}

const initialState = {
  x: 0,
  y: 0,
  text: '',
  display: 'none'
}

export default function TooltipScreen() {

  const data = [
    {id: 1, name: 'prvni vyhrani'},
    {id: 2, name: 'druhy vyhrani'},
    {id: 3, name: 'tretak vyhrani'},
    {id: 4, name: 'ctverka vyhrani'},
  ]

  const [position, setPosition] = useState(initialState)

  const showTooltip = (item, e) => {
    // console.log(e.clientX)
    setPosition(() => ({
      ...position,
      // x: e.clientX,
      text: item.name,
      display: 'block',
    }))
  }

  const hideTooltip = () => {
    setPosition(() => ({
      ...position,
      display: 'none',
    }))
  }

  const moveTooltip = (e) => {
    console.log('x: ', e.clientX)
    console.log('y: ', e.clientY)
    setPosition(() => ({
      ...position,
      x: e.clientX,
      y: e.clientY,
    }))
  }

  return (
    <div style={{position: 'relative'}}>
      <Table data={data} showTooltip={showTooltip} hideTooltip={hideTooltip} moveTooltip={moveTooltip} />
      <Tooltip position={position} />
    </div>
  )
}
