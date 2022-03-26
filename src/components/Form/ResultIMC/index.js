import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

export default function ResultImc(props) {
    const onShare = async () => {
        const result = await Share.share({
            message: "Meu imc hoje é: " + props.resultImc,
        });
    };
    return (
        <View style={styles.resultImc}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberIMC}>{props.resultImc}</Text>
            <View style={styles.boxShareButton}>
                <TouchableOpacity onPress={onShare} style={styles.shared}>
                    <Text style={styles.textShared}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
