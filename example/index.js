import React from 'react';

import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import TileView from '../lib';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  item: {
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  itemCustom: {
    backgroundColor: 'blue',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  itemText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
});

const tiles = [
  {
    tpr: 1,
    tileHeight: 200,
    touchable: true,
    tileStyle: styles.itemCustom,
    data: {text: 'hello', number: 5},
  },
  {tpr: 2, tileHeight: 200, data: {number: 5}},
  {tpr: 2, tileHeight: 200, touchable: true, data: {text: 'hello'}},
  {tpr: 3, data: {number: 5}},
  {tpr: 3, touchable: true, data: {text: 'hello'}},
  {tpr: 3, data: {text: 'hello', number: 5}},
  {tpr: 4, data: {text: 'hello'}},
  {tpr: 4, data: {number: 5}},
  {tpr: 4, data: {text: 'hello'}},
  {tpr: 4, data: {text: 'hello', number: 5}},
  {tpr: 5, data: {text: 'hello'}},
  {tpr: 5, data: {number: 5}},
  {tpr: 5, data: {text: 'hello'}},
  {tpr: 5, data: {text: 'hello'}},
  {tpr: 5, data: {text: 'hello', number: 5}},
  {tpr: 6, data: {text: 'hello'}},
  {tpr: 6, data: {text: 'hello', number: 5}},
  {tpr: 6, data: {number: 5}},
  {tpr: 6, data: {text: 'hello'}},
  {tpr: 6, data: {text: 'hello'}},
  {tpr: 6, data: {text: 'hello', number: 5}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello', number: 5}},
  {tpr: 7, data: {number: 5}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello', number: 5}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello', number: 5}},
  {tpr: 7, data: {number: 5}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello'}},
  {tpr: 7, data: {text: 'hello', number: 5}},
  {tpr: 8, data: {text: 'hello'}},
  {tpr: 8, data: {text: 'hello'}},
  {tpr: 8, data: {text: 'hello', number: 5}},
  {tpr: 8, data: {number: 5}},
  {tpr: 8, data: {text: 'hello'}},
  {tpr: 8, data: {text: 'hello'}},
  {tpr: 8, data: {text: 'hello', number: 5}},
  {tpr: 8, data: {text: 'hello', number: 5}},
  {tpr: 9, data: {text: 'hello'}},
  {tpr: 9, data: {text: 'hello'}},
  {tpr: 9, data: {text: 'hello', number: 5}},
  {tpr: 9, data: {number: 5}},
  {tpr: 9, data: {text: 'hello'}},
  {tpr: 9, data: {text: 'hello'}},
  {tpr: 9, data: {text: 'hello', number: 5}},
  {tpr: 9, data: {text: 'hello'}},
  {tpr: 9, data: {text: 'hello', number: 5}},
  {tpr: 10, data: {text: 'hello'}},
  {tpr: 10, data: {text: 'hello'}},
  {tpr: 10, data: {text: 'hello', number: 5}},
  {tpr: 10, data: {number: 5}},
  {tpr: 10, data: {text: 'hello'}},
  {tpr: 10, data: {text: 'hello'}},
  {tpr: 10, data: {text: 'hello', number: 5}},
  {tpr: 10, data: {text: 'hello'}},
  {tpr: 10, data: {text: 'hello'}},
  {tpr: 10, data: {text: 'hello', number: 5}},
  {tpr: 11, data: {text: 'hello'}},
  {tpr: 11, data: {text: 'hello'}},
  {tpr: 11, data: {text: 'hello', number: 5}},
  {tpr: 11, data: {text: 'hello'}},
  {tpr: 11, data: {text: 'hello'}},
  {tpr: 11, data: {text: 'hello', number: 5}},
  {tpr: 11, data: {number: 5}},
  {tpr: 11, data: {text: 'hello'}},
  {tpr: 11, data: {text: 'hello'}},
  {tpr: 11, data: {text: 'hello', number: 5}},
];

const tileContent = (data) => (
  <View>
    <Text style={styles.itemText}>{data.text}</Text>
    {data.number && <Text style={styles.itemText}>{data.number}</Text>}
  </View>
);

const TileView = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleTileTap = (index, obj) => {
    if (index === 0) {
      props.navigation.navigate('SplashScreen');
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <Tiles
        tiles={tiles}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        tileContent={tileContent}
        customStyle={styles}
        onTileTouch={handleTileTap}></Tiles>
    </SafeAreaView>
  );
};

export default TileView;
