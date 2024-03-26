import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Person = (props: SvgProps) => (
    <Svg
        width={16}
        height={18}
        fill="none"
        {...props}
    >
        <Path
            fill="#3A4D6C"
            d="M6 10a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 3 7c0-.367.058-.713.175-1.037.117-.325.292-.621.525-.888a2.72 2.72 0 0 1-.15-.525A3.07 3.07 0 0 1 3.5 4c0-.633.17-1.196.513-1.688A3.047 3.047 0 0 1 5.35 1.226a3.63 3.63 0 0 1 1.175-.9C6.975.108 7.467 0 8 0c.533 0 1.025.108 1.475.325.45.217.842.517 1.175.9.55.233.996.596 1.338 1.087.341.492.512 1.055.512 1.688 0 .183-.017.367-.05.55a2.715 2.715 0 0 1-.15.525c.233.267.408.563.525.888.117.324.175.67.175 1.037 0 .833-.292 1.542-.875 2.125A2.893 2.893 0 0 1 10 10H6Zm0-2h4c.283 0 .52-.1.713-.3A.98.98 0 0 0 11 7a.836.836 0 0 0-.063-.325c-.041-.1-.104-.2-.187-.3a1.726 1.726 0 0 1-.363-.638 2.185 2.185 0 0 1-.087-.587 2.1 2.1 0 0 1 .1-.688c.067-.191.1-.345.1-.462 0-.2-.058-.383-.175-.55a1.092 1.092 0 0 0-.45-.375 2.77 2.77 0 0 1-.412-.225 1.38 1.38 0 0 1-.338-.325c-.083-.1-.22-.212-.412-.337C8.52 2.062 8.283 2 8 2s-.52.067-.713.2c-.191.133-.329.25-.412.35-.1.117-.213.217-.338.3a2.77 2.77 0 0 1-.412.225 1.092 1.092 0 0 0-.45.375A.938.938 0 0 0 5.5 4c0 .117.033.27.1.463.067.191.1.42.1.687 0 .183-.03.38-.088.587-.058.209-.179.421-.362.638-.083.1-.146.2-.188.3A.836.836 0 0 0 5 7c0 .267.096.5.287.7.192.2.43.3.713.3ZM0 18v-2.8c0-.567.146-1.087.438-1.563.291-.475.679-.837 1.162-1.087a14.843 14.843 0 0 1 3.15-1.163A13.76 13.76 0 0 1 8 11c1.1 0 2.183.13 3.25.387 1.067.259 2.117.646 3.15 1.163.483.25.87.612 1.162 1.087.292.476.438.996.438 1.563V18H0Zm2-2h12v-.8a.973.973 0 0 0-.5-.85c-.9-.45-1.808-.787-2.725-1.012a11.6 11.6 0 0 0-5.55 0c-.917.225-1.825.562-2.725 1.012a.973.973 0 0 0-.5.85v.8Z"
        />
    </Svg>
)
export default Person
