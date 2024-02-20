import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Bars = (props: SvgProps) => (
  <Svg width={22} height={20} fill="none" {...props}>
    <Path
      fill={props.fill}
      d="M.786 3.536h20.428A.786.786 0 0 0 22 2.75V.786A.786.786 0 0 0 21.214 0H.786A.786.786 0 0 0 0 .786V2.75c0 .434.352.786.786.786Zm0 7.857h20.428a.786.786 0 0 0 .786-.786V8.643a.786.786 0 0 0-.786-.786H.786A.786.786 0 0 0 0 8.643v1.964c0 .434.352.786.786.786Zm0 7.857h20.428a.786.786 0 0 0 .786-.786V16.5a.786.786 0 0 0-.786-.786H.786A.786.786 0 0 0 0 16.5v1.964c0 .434.352.786.786.786Z"
    />
  </Svg>
);
export default Bars;
