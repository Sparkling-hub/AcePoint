import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Account = (props: SvgProps) => (
  <Svg width={26} height={30} fill="none" {...props}>
    <Path
      fill={props.fill}
      d="M18.2 17.643c-1.666 0-2.466.928-5.2.928-2.733 0-3.529-.928-5.2-.928a7.802 7.802 0 0 0-7.8 7.8v1.486a2.786 2.786 0 0 0 2.786 2.785h20.428A2.786 2.786 0 0 0 26 26.93v-1.486c0-4.306-3.494-7.8-7.8-7.8Zm5.014 9.286H2.786v-1.486A5.023 5.023 0 0 1 7.8 20.429c.847 0 2.223.928 5.2.928 3 0 4.347-.928 5.2-.928a5.023 5.023 0 0 1 5.014 5.014v1.486ZM13 16.714a8.36 8.36 0 0 0 8.357-8.357A8.36 8.36 0 0 0 13 0a8.36 8.36 0 0 0-8.357 8.357A8.36 8.36 0 0 0 13 16.714Zm0-13.928a5.58 5.58 0 0 1 5.571 5.571A5.58 5.58 0 0 1 13 13.93a5.58 5.58 0 0 1-5.571-5.572A5.58 5.58 0 0 1 13 2.786Z"
    />
  </Svg>
);
export default Account;