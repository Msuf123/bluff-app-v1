import { useAtom } from 'jotai';
import {
  displayAnimation,
  playerCardChooseOnGameTable,
  playersGameTableInfo,
} from '../../../AppState/Atoms';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import PlayerSelectCardsPopUp from '../../PlayArea/SubComponents/PlayerSelectCardsPopUp/PlayerSelectCardsPopUp';
import ThrowShowOptions from '../../PlayArea/SubComponents/ThrowShowOptions/ThrowShowOptions';
import UserCards from '../../PlayArea/SubComponents/UserCards/UserCards';
import UserCenterTable from '../UserCenterTable/UserCenterTable';

export default function CenterTable({
  scaledImageSize,
  useAtomValue,
  valueOfContexts,
}) {
  const route = useRoute();
  const [cardChoose] = useAtom(playerCardChooseOnGameTable);
  const [displayCardThrowAnimation, setDiaplayA] = useAtom(displayAnimation);
  let layerOne = [];
  let layerTwo = [];
  let layerThree = [];

  if (!valueOfContexts) {
    return;
  }
  let numberOfPlayer = valueOfContexts.opponentDetails.length + 1;

  switch (numberOfPlayer) {
    case 2:
      {
        /**Form backend will get soemthing like this opponentDetails:  [{"opponentCards": 26, "opponentName": "my@gm.co"}] 
            now we asre pushing this obj to layers and accessign these using [0,or any other index] */
      }
      layerOne.push(valueOfContexts.opponentDetails[0]);
      layerThree.push(0);
      break;
    case 3:
      layerOne.push(valueOfContexts.opponentDetails[0]);
      layerTwo.push(valueOfContexts.opponentDetails[1]);
      layerThree.push(0);
      break;
    case 4:
      layerOne.push(valueOfContexts.opponentDetails[0]);
      layerTwo.push(valueOfContexts.opponentDetails[1]);
      layerTwo.push(valueOfContexts.opponentDetails[2]);
      layerThree.push(0);
      break;
    case 5:
      layerOne.push(valueOfContexts.opponentDetails[0]);
      layerTwo.push(valueOfContexts.opponentDetails[1]);
      layerTwo.push(valueOfContexts.opponentDetails[2]);
      layerThree.push(0);
      layerOne.push(valueOfContexts.opponentDetails[3]);
      break;
    case 6:
      layerOne.push(valueOfContexts.opponentDetails[0]);
      layerTwo.push(valueOfContexts.opponentDetails[1]);
      layerTwo.push(valueOfContexts.opponentDetails[2]);
      layerOne.push(valueOfContexts.opponentDetails[3]);
      layerOne.push(valueOfContexts.opponentDetails[4]);
      layerThree.push(0);
      break;
  }

  return (
    <View
      style={[
        style.div,
        scaledImageSize
          ? {
              height: scaledImageSize.height,
            }
          : {},
      ]}
    >
      <View
        style={[
          style.layers,
          scaledImageSize ? { width: scaledImageSize.width } : {},
          numberOfPlayer < 5
            ? {}
            : {
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                flexDirection: 'row',
              },
        ]}
      >
        {layerOne.map((i, k) => (
          <UserCards
            toShow={true}
            rotate={true}
            cardDetails={i}
            rotateValue={180}
            key={`${i.opponentName}-${valueOfContexts.currentPlayer}`}
            currentPlayer={valueOfContexts.currentPlayer}
            styles={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
          ></UserCards>
        ))}
      </View>
      <View
        style={[
          style.layers,
          style.middleLayer,
          scaledImageSize ? { width: scaledImageSize.width } : {},
        ]}
      >
        <UserCards
          toShow={layerTwo.length > 0}
          cardDetails={layerTwo[0]}
          rotate={true}
          rotateValue={90}
          currentPlayer={valueOfContexts.currentPlayer}
        ></UserCards>
        <UserCenterTable></UserCenterTable>
        <UserCards
          toShow={layerTwo.length > 1}
          rotate={true}
          cardDetails={layerTwo[1]}
          rotateValue={-90}
          currentPlayer={valueOfContexts.currentPlayer}
        ></UserCards>
      </View>
      <View
        style={[
          style.layers,
          scaledImageSize
            ? {
                width: scaledImageSize.width,
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                flexDirection: 'row',
                paddingBottom: '1%',
              }
            : {},
        ]}
      >
        {route.name === 'PlayTabel' ? (
          layerThree.map((i, k) => (
            <UserCards
              toShow={true}
              mainPlayer={true}
              key={k}
              cardDetails={i}
              currentPlayer={valueOfContexts.currentPlayer}
              yourName={valueOfContexts.yourName}
              styles={{
                justifyContent: 'flex-end',
              }}
              scaledImageSize={scaledImageSize}
            ></UserCards>
          ))
        ) : (
          <UserCards
            toShow={true}
            mainPlayer={false}
            rotate={true}
            cardDetails={{
              opponentCards: 26,
              opponentName: 'no@gm.co',
              nickName: 'jameKarme',
            }}
            rotateValue={180}
            key={'df'}
            currentPlayer={valueOfContexts.currentPlayer}
            styles={{
              justifyContent: 'flex-end',
            }}
          ></UserCards>
        )}
      </View>
      {cardChoose &&
      !displayCardThrowAnimation &&
      route.name === 'PlayTabel' ? (
        <PlayerSelectCardsPopUp></PlayerSelectCardsPopUp>
      ) : null}
      {!cardChoose &&
      !displayCardThrowAnimation &&
      valueOfContexts.yourName == valueOfContexts.currentPlayer &&
      useAtomValue ? (
        <View
          style={[
            scaledImageSize ? { width: scaledImageSize.width } : {},
            style.throwShowOptionDiv,
          ]}
        >
          <ThrowShowOptions></ThrowShowOptions>
        </View>
      ) : null}
    </View>
  );
}
const style = StyleSheet.create({
  div: {
    borderRadius: 50,

    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  vid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  playersDiv: {
    width: 100,
    backgroundColor: 'transparent',
    height: 100,
    margin: 10,
  },
  texts: {
    backgroundColor: 'white',
    width: 400,
    display: 'flex',
  },
  heightPlayers: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  layers: {
    width: 100,
    backgroundColor: '',
    height: '22%',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 0,
    overflow: 'visible',
  },
  middleLayer: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  throwShowOptionDiv: {
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
