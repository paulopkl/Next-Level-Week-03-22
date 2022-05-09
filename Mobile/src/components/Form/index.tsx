import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import Button from "../Button";
import ScreenshotButton from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";

interface FormProps {
    feedbackType: FeedbackType;
}

export default function Form({ feedbackType }: FormProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const handleScreenshot = async () => {
        await captureScreen({
            format: "jpg",
            quality: 0.8
        })
            .then(uri => setScreenshot(uri))
            .catch(console.log);
    }
    
    const handleScreenshotRemove = () => {
        setScreenshot(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline={true}
                style={styles.input}
                placeholder={`Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...`}
                placeholderTextColor={theme.colors.text_secondary}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />

                <Button isLoading={false} />
            </View>

        </View>
    );
}
