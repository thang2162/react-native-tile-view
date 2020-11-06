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

const tiles = [
  {tpr: 1, tileHeight: 200, touchable: true, data: {text: 'hello', number: 5}},
  {tpr: 2, tileHeight: 200, data: {number: 5}},
  {tpr: 2, tileHeight: 200, touchable: true, data: {text: 'hello'}},
  {tpr: 3, data: {number: 5}},
  {tpr: 3, touchable: true, data: {text: 'hello'}},
  {tpr: 3, data: {text: 'hello', number: 5}},
  {tpr: 4, data: {text: 'hello'}},
  {tpr: 4, data: {number: 5}},
  {tpr: 4, data: {text: 'hello'}},
  {tpr: 4, data: {text: 'hello', number: 5}},
];

const tileContent = (data) => (
  <View>
    <Text style={styles.itemText}>{data.text}</Text>
    {data.number && <Text style={styles.itemText}>{data.number}</Text>}
  </View>
);

const App = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleTileTap = (index, obj) => {
    console.log('handleTileTap', index + ' : ' + obj)
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <TileView
        tiles={tiles}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        tileContent={tileContent}
        customStyle={styles}
        onTileTouch={handleTileTap}></TileView>
    </SafeAreaView>
  );
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
  itemText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center'
  },
});

export default App;
