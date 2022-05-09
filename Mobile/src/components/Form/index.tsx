import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import Button from "../Button";
import ScreenshotButton from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";
import * as FileSystem from "expo-file-system";

interface FormProps {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export default function Form({
    feedbackType,
    onFeedbackCanceled,
    onFeedbackSent,
}: FormProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const handleScreenshot = async () => {
        await captureScreen({
            format: "jpg",
            quality: 0.8,
        })
            .then((uri) => setScreenshot(uri))
            .catch(console.log);
    };

    const handleScreenshotRemove = () => {
        setScreenshot(null);
    };

    const handleSendFeedback = async () => {
        if (isSendingFeedback) return;
        
        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { 
            encoding: "base64",
        });

        try {
            const data = {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            }

            await api.post("/feedbacks", data);

            onFeedbackSent();
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
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
                autoCorrect={false}
                onChangeText={text => setComment(text)}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />

                <Button
                    isLoading={isSendingFeedback}
                    onPress={handleSendFeedback}
                />
            </View>
        </View>
    );
}
