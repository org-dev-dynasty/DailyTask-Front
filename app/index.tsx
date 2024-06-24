import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
    return (
        <>
            <View style={{flex: 1, width: '100%', height: '100%', justifyContent: "center", padding:16, gap:16}}>
                <Link href="/home" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para as telas principais</Link>
                <Link href="/login" style={{textAlign: "center", fontSize: 32, borderColor: "black", borderWidth: 2, borderRadius: 15, padding:2}}>Ir para o Login</Link>
            </View>
        </>
    );
}