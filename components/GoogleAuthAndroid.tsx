import { authAndroid } from "@/services/auth"
import { Button } from "react-native"

export default function GoogleAuthAndroid() {
    return (
        <Button
            title="Google Sign-In in android" onPress={() => {
                authAndroid()
            }}
        />
    )
}