import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import instance from '../../../connection';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const { navigate } = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    const loadGames = async () => {
      const { data } = await instance.get('/games');
      setGames(data)
    }
    loadGames();
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={LogoImg}
          style={styles.logo}
        />

        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )
          }}
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.contentList}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}