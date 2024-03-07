import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Check = (props: SvgProps) => (
  <Svg width={22} height={17} fill="none" {...props}>
    <Path
      fill={props.fill}
      d="M7.472 16.37.322 9.22a1.1 1.1 0 0 1 0-1.556l1.556-1.556a1.1 1.1 0 0 1 1.555 0l4.817 4.817L18.567.607a1.1 1.1 0 0 1 1.555 0l1.556 1.556a1.1 1.1 0 0 1 0 1.555L9.028 16.37a1.1 1.1 0 0 1-1.556 0Z"
    />
  </Svg>
);
export default Check;
