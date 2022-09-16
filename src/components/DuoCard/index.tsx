import { View, TouchableOpacity, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';

export interface DuoCardProps {
    hourEnd: string,
    hourStart: string,
    id: string,
    name: string,
    useVoiceChat: boolean,
    weekDays: string,
    yearsPlaying: number,
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    const rawDays = data.weekDays.split(',');
    const days = rawDays.length;

    return (
        <View style={styles.container}>
            <DuoInfo
                label='Nome'
                value={data.name}
            />
            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} anos`}
            />
            <DuoInfo
                label='Disponibilidade'
                value={`${days} dia${days > 1 ? 's' : ''} \u2022 ${data.hourStart} - ${data.hourEnd} `}
            />
            <DuoInfo
                label='Chamada de áudio?'
                value={`${data.useVoiceChat ? 'Sim' : 'Não'}`}
                colorValue={data.useVoiceChat ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={20}
                />
                <Text style={styles.buttonTitle}>
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    );
}