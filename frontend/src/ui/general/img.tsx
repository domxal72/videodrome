import styled from 'styled-components';
import {
  layout,
  space,
  position,
} from 'styled-system';

export const Img = styled('img')`
  ${layout}
  ${space}
  ${position}
  cursor: ${({ cursor }) => cursor ? cursor : 'auto'};
`

Img.defaultProps = {
  display: 'block',
  maxWidth: '100%',
  width: '100%',
  alt: 'image failed to load',
}