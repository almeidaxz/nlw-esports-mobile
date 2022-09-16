import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import instance from '../../../connection';
import { GameParams } from '../../@types/navigation';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const route = useRoute();
  const game = route.params as GameParams;
  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  }

  useEffect(() => {
    const loadGames = async () => {
      const { data } = await instance.get(`/games/${game.id}/ads`);
      setDuos(data)
    }
    loadGames();
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={LogoImg}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading
          title={game.title}
          subtitle='Conect-se para começar a jogar'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <DuoCard
                data={item}
                onConnect={() => {}}
              />
            )
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para este game.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}