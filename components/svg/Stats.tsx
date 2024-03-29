import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const Stats = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Mask id="a" width={30} height={30} x={0} y={0} maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 .286h29.192v29.192H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.fill}
        d="m3.193 22.393-1.977-1.43 6.082-9.73 3.65 4.257 4.865-7.906 3.314 4.956c-.466.02-.907.076-1.323.168a7.849 7.849 0 0 0-1.231.38l-.67-1.004-4.621 7.511-3.68-4.287-4.41 7.085Zm23.05 5.869-3.801-3.802a4.493 4.493 0 0 1-1.354.64 5.563 5.563 0 0 1-1.535.212c-1.52 0-2.813-.532-3.877-1.597-1.065-1.064-1.597-2.356-1.597-3.877 0-1.52.532-2.812 1.597-3.877 1.064-1.064 2.356-1.596 3.877-1.596 1.52 0 2.813.532 3.877 1.596 1.064 1.065 1.596 2.357 1.596 3.877 0 .527-.07 1.04-.212 1.536a4.91 4.91 0 0 1-.639 1.384l3.801 3.77-1.733 1.734Zm-6.69-5.383c.851 0 1.571-.294 2.159-.882.588-.587.882-1.307.882-2.159 0-.851-.294-1.57-.882-2.159-.588-.587-1.308-.881-2.16-.881-.85 0-1.57.294-2.158.881-.588.588-.882 1.308-.882 2.16 0 .85.294 1.57.882 2.158.588.588 1.307.882 2.159.882Zm2.706-9.73a7.937 7.937 0 0 0-1.2-.396 6.739 6.739 0 0 0-1.293-.182L26 2.718l1.976 1.43-5.717 9Z"
      />
    </G>
  </Svg>
);
export default Stats;
