import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Sutitles = (props: SvgProps) => (
  <Svg
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#3A4D6C"
      d="M4 12h8v-2H4v2Zm10 0h2v-2h-2v2ZM4 8h2V6H4v2Zm4 0h8V6H8v2Zm-6 8c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 0 1 0 14V2C0 1.45.196.98.588.587A1.926 1.926 0 0 1 2 0h16c.55 0 1.02.196 1.413.588C19.803.979 20 1.45 20 2v12c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 0 1 18 16H2Zm0-2h16V2H2v12Z"
    />
  </Svg>
)
export default Sutitles