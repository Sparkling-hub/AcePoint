import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Level = (props: SvgProps) => (
  <Svg width={13} height={12} fill="none" {...props}>
    <Path fill="#fff" d="M10 0h3v12h-3zM5 5h3v7H5zM0 9h3v3H0z" />
  </Svg>
);
export default Level;
