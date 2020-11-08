import React, { useState } from 'react'
import styled from 'styled-components'

import { Block } from '../general/block'
import { Flex } from '../general/flex'
import Cell from './cell'

const Row = styled(Flex)`

`
interface IgridConf {
  rowsNo: number,
  colsNo: number,
  cellWidth: number,
  cellHeight: number,
  newRowsNo: number,
  newColsNo: number,
}

const initialState:IgridConf = {
  rowsNo: 14,
  colsNo: 8,
  cellWidth: 50,
  cellHeight: 50,
  newRowsNo: 0,
  newColsNo: 0,
}


export default function Grid() {

  const [gridConf, setGridConf] = useState(initialState)

  const { rowsNo, colsNo, cellHeight, cellWidth, newRowsNo, newColsNo } = gridConf

  const generateEnemy = () => {
    let enemyArr: string[] = [];
    for (let e = 0; e < rowsNo; e++ ){
      enemyArr.push(((Math.floor(Math.random() * colsNo) + 1) + ',' + (Math.floor(Math.random() * rowsNo) + 1)).toString())
      // console.log(enemyArr)
    }
    return enemyArr
  }

  let enemyArr = generateEnemy()

  const generateCols = (colID) => {

    let colArr = []
    for (let c = 1; c <= colsNo; c++ ){

      let enemy = enemyArr.includes(`${c},${colID}`);

      colArr.push(
        <Cell
          key={`${c},${colID}`}
          id={`${c},${colID}`}
          width={cellWidth}
          height={cellHeight}
          border='1px solid teal'
          bg={enemy ? 'teal' : 'transparent'}
        />
      )
    }
    return colArr
  } 

  
  const generateRows = () => {
    let rowArr = []
    for (let r = 1; r <= rowsNo; r++ ){
      rowArr.push(<Row key={r}>{generateCols(r)}</Row>)
    }
    return rowArr
  } 

  const generateGrid = () => {
    setGridConf({
      ...gridConf,
      rowsNo: newRowsNo,
      colsNo: newColsNo,
    })
  }

  const setRows = (e) => {
    setGridConf({...gridConf, newRowsNo: Number(e.target.value)})
  }
  const setCols = (e) => {
    setGridConf({...gridConf, newColsNo: Number(e.target.value)})
  }

  return (
    <Block bg='#ccc'>
      tady je grid
      <Flex flexDirection='column'>
        {generateRows()}
      </Flex>
      <label>rows:</label><input type="text" onChange={setRows} /><br />
      <label>cols:</label><input type="text" onChange={setCols} />
      <button onClick={generateGrid}>Generate grid</button>
    </Block>
  )
}
