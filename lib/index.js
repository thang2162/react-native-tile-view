import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
const {width} = Dimensions.get('window');

import initialStyle from 'styles';

const TileView = ({
  children,
  showChildren,
  tileContent,
  tiles,
  onTileTouch,
  customStyle,
  refreshControl,
}) => {
  const [currentStyle, setCurrentStyle] = useState(
    StyleSheet.create(initialStyle),
  );

  const touchableCallback = (index, obj) => {
    if (tiles.length > 0) {
      onTileTouch(index, obj);
    }
  };

  const calcTileDimensions = (deviceWidth, tpr) => {
    let margin = deviceWidth / (tpr * 50);
    if (tpr === 2) {
      margin = deviceWidth / (tpr * 30);
    } else if (tpr === 3) {
      margin = deviceWidth / (tpr * 15);
    } else if (tpr >= 4) {
      margin = deviceWidth / (4 * 10);
    }

    const size = (deviceWidth - margin * (tpr * 2)) / tpr;

    return {size, margin};
  };

  const TileItem = ({size, margin, touchable, data, index, obj}) => (
    <View key={index}>
      {touchable && touchable === true && (
        <TouchableOpacity onPress={() => touchableCallback(index, obj)}>
          <View
            style={[
              currentStyle.item,
              {width: size, height: size, marginHorizontal: margin},
            ]}>
            {tileContent(data)}
          </View>
        </TouchableOpacity>
      )}
      {(!touchable || touchable === false) && (
        <View
          style={[
            currentStyle.item,
            {width: size, height: size, marginHorizontal: margin},
          ]}>
          {tileContent(data)}
        </View>
      )}
    </View>
  );

  const tileDimensions = (tpr) => calcTileDimensions(width, tpr);

  useEffect(() => {
    if (customStyle && typeof customStyle === 'object') {
      setCurrentStyle(customStyle);
    }
  }, [customStyle]);

  return (
    <ScrollView
      refreshControl={refreshControl}
      >
      {showChildren === true && children}
      {(showChildren === false || !showChildren) && (
        <View style={currentStyle.container}>
          {tiles.map((i, ind) =>
            TileItem({
              ...tileDimensions(i.tpr),
              touchable: i.touchable,
              data: i.data,
              index: ind,
              obj: i,
            }),
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default TileView;
