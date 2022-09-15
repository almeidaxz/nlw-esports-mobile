import { FlatList, Image, View } from 'react-native';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';

import { GameCard } from '../../components/GameCard';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={LogoImg}
        style={styles.logo}
      />

      <Heading
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
      />

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <GameCard
              data={item}
            />
          )
        }}
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.contentList}
        horizontal
      />
    </View>
  );
}