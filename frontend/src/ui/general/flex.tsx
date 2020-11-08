import React, { memo} from 'react'
import styled from 'styled-components'
import { flexbox } from 'styled-system'

import { Block } from './block'

export const Flex = styled(Block)`
  ${flexbox}
`

Flex.defaultProps = {
  display: 'flex',
}


// Priklad michani styled components a klasickejch vlastnich reactich
export const FlexOut = styled(
  ({
    width,
    children,
    ...rest
}) => (
  <Block {...rest}>{children}</Block>
))`
  height: 120px;
`

// Tady s pouzitim memo to hazi chybu, nelibi se mu type
// export const FlexMemo = styled(memo(
//   ({
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     width,
//     children,
//     ...rest
// }) => (
//   <Block {...rest}>{children}</Block>
// )))`
//   height: 120px;
// `