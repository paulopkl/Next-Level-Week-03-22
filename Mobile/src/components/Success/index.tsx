import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import successImg from "../../assets/success.png";
import Copyright from "../Copyright";

interface SuccessProps {}

export default function Success({}: SuccessProps) {
    return (
        <View style={styles.container}>
            <Image source={successImg} style={styles.image} />

            <Text style={styles.title}>Agradecemos o Feedback</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonTitle}>Quero enviar outro</Text>
            </TouchableOpacity>

            <Copyright />
        </View>
    );
}
