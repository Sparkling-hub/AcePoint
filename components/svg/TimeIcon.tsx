import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TimeIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={21}
        fill="none"
        {...props}
    >
        <Path
            fill="#3A4D6C"
            d="M5 16h1.85l.575-1.75h3.1L11.1 16H13l-3-8.45H8L5 16Zm2.9-3.2L9 9.5l1.075 3.3H7.9ZM6 2V0h6v2H6Zm3 19a8.646 8.646 0 0 1-3.487-.712A9.192 9.192 0 0 1 2.65 18.35a9.193 9.193 0 0 1-1.938-2.863A8.646 8.646 0 0 1 0 12c0-1.233.237-2.396.713-3.488A9.193 9.193 0 0 1 2.65 5.65a9.193 9.193 0 0 1 2.863-1.938A8.646 8.646 0 0 1 9 3a8.92 8.92 0 0 1 2.975.5c.95.333 1.842.817 2.675 1.45l1.4-1.4 1.4 1.4-1.4 1.4a9.723 9.723 0 0 1 1.45 2.675c.333.95.5 1.942.5 2.975a8.646 8.646 0 0 1-.712 3.488 9.192 9.192 0 0 1-1.938 2.862 9.192 9.192 0 0 1-2.862 1.938A8.646 8.646 0 0 1 9 21Zm0-2c1.933 0 3.583-.683 4.95-2.05C15.317 15.583 16 13.933 16 12c0-1.933-.683-3.583-2.05-4.95C12.583 5.683 10.933 5 9 5c-1.933 0-3.583.683-4.95 2.05C2.683 8.417 2 10.067 2 12c0 1.933.683 3.583 2.05 4.95C5.417 18.317 7.067 19 9 19Z"
        />
    </Svg>
)
export default TimeIcon
