import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Payment = (props: SvgProps) => (
    <Svg
        width={22}
        height={18}
        fill="none"
        {...props}
    >
        <Path
            fill="#3A4D6C"
            d="M2 16c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 0 1 0 14V2C0 1.45.196.98.588.587A1.926 1.926 0 0 1 2 0h16c.55 0 1.02.196 1.413.588C19.803.979 20 1.45 20 2v6H2v6h10v2H2ZM2 4h16V2H2v2Zm15 14v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2Z"
        />
    </Svg>
)
export default Payment
