import styled from 'styled-components'
import {
  position,
  layout,
  space,
  color,
  border,
} from 'styled-system'

export const Block = styled.div`
  ${position}
  ${layout}
  ${space}
  ${color}
  ${border}
  box-sizing: ${({boxSizing}) => boxSizing || 'border-box'};
`

Block.defaultProps = {
  display: 'block',
  margin: 0,
  position: 'relative',
  boxSizing: 'border-box',
  minWidth: 0,
}