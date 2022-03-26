import React, { useState } from "react";
import {
    FlatList,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View,
} from "react-native";
import ResultImc from "./ResultIMC";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setIMC] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator() {
        let heightFormat = height.replace(",", ".");
        let weightFormat = weight.replace(",", ".");
        let totalImc = (weightFormat / (heightFormat * heightFormat)).toFixed(
            2
        );
        setImcList((arr) => [
            ...arr,
            { id: String(new Date().getTime()), imc: totalImc },
        ]);
        setIMC(totalImc);
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate();
            setErrorMessage("campo obrigatório*");
        }
    }

    function validationImc() {
        if (weight !== null && height !== null) {
            imcCalculator();
            setMessageImc("Seu IMC é igual:");
            setHeight(null);
            setWeight(null);
            setTextButton("Calcular Novamente");
            setErrorMessage(null);
        } else {
            verificationImc();
            setIMC(null);
            setTextButton("Calcular");
            setMessageImc("Preencha o peso e altura");
        }
    }

    return (
        <View style={styles.formContent}>
            {imc == null ? (
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex.: 1.75"
                        keyboardType="numeric"
                    />
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex.: 75.365"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.ButtonCalculator}
                        onPress={() => validationImc()}
                        title={textButton}
                    >
                        <Text style={styles.textButtonCalculator}>
                            {textButton}
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            ) : (
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity
                        style={styles.ButtonCalculator}
                        onPress={() => validationImc()}
                        title={textButton}
                    >
                        <Text style={styles.textButtonCalculator}>
                            {textButton}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>
                                Resultado IMC ={" "}
                            </Text>
                            {item.imc}
                        </Text>
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
