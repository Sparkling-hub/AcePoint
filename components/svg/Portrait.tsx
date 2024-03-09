import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Portrait = (props: SvgProps) => (
  <Svg
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#3A4D6C"
      d="M14 20H2c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 0 18V2C0 1.45.196.98.588.587A1.926 1.926 0 0 1 2 0h12c.55 0 1.02.196 1.412.588C15.804.979 16 1.45 16 2v16c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0 1 14 20ZM2 18h12V2H2v16Z"
    />
  </Svg>
)
export default Portrait
