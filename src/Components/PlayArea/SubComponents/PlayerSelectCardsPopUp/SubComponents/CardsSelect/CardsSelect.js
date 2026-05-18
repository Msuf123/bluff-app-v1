import { useAtom } from 'jotai';
import { useScreenDimensions } from '../../../../../../Hooks/useScreenDimensions';
import {
  backendUrlAtom,
  playersGameTableInfo,
} from '../../../../../../AppState/Atoms';
import formatArrayForDisplay from './formatArrayForDisplay';
import { FlatList, StyleSheet } from 'react-native';
import SelectCardToThrow from './SelectCardsToThrow/SelectCardsToThrow';

export default function CardsSelect() {
  const { width } = useScreenDimensions();

  let cardsPerRow = width < 766 ? 3 : 5;
  if (width < 470) {
    cardsPerRow = 1;
  } else if (width < 644) {
    cardsPerRow = 2;
  } else if (width < 954) {
    cardsPerRow = 3;
  } else if (width < 1002) {
    cardsPerRow = 4;
  }

  const [urls] = useAtom(backendUrlAtom);
  const [cards] = useAtom(playersGameTableInfo);
  const formattedData = formatArrayForDisplay(cards.cards, cardsPerRow);

  return (
    <FlatList
      style={style.div}
      data={formattedData}
      renderItem={({ item, index }) => (
        <SelectCardToThrow data={item} urls={urls} />
      )}
    />
  );
}

const style = StyleSheet.create({
  div: {
    flex: 1,
    width: '60%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    paddingTop: 10,
    borderRadius: 10,
  },
});
