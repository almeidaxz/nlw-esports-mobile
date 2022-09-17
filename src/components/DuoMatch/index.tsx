import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { CheckCircle } from 'phosphor-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { styles } from './styles';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState(false)

    const handleCopyDiscordToClipboard = async () => {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);
        Alert.alert('', 'Discord copiado para área de transferência');
        setIsCopping(false);
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            animationType='fade'
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeIcon}
                    >
                        <MaterialIcons
                            name='close'
                            size={26}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />
                    <Heading
                        title={`Let's Play!`}
                        subtitle='Agora é só começar a jogar!'
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />
                    <Text style={styles.label}>
                        Adicione seu Discord
                    </Text>
                    <TouchableOpacity
                        style={styles.discordBtn}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator /> : discord}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </Modal >
    );
}