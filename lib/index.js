import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

import initialStyle from "./styles";

const TileView = ({
  children,
  showChildren,
  tileContent,
  tiles,
  onTileTouch,
  customStyle,
  refreshControl,
  tileSize = 1,
}) => {

  const [currentStyle, setCurrentStyle] = useState(
    StyleSheet.create(initialStyle)
  );

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const touchableCallback = (index, obj) => {
    if (tiles.length > 0) {
      onTileTouch(index, obj);
    }
  };

  const calcMargin = (deviceWidth, tpr) => {
    if (tpr <= 4) {
      return deviceWidth / (100 * tileSize);
    } else if (tpr <= 8) {
      return deviceWidth / (95 * tileSize);
    } else if (tpr <= 12) {
      return deviceWidth / (90 * tileSize);
    } else if (tpr <= 16) {
      return deviceWidth / (85 * tileSize);
    } else {
      return deviceWidth / (80 * tileSize);
    }
  };

  const calcTileDimensions = (deviceWidth, tpr) => {
    const margin = calcMargin(deviceWidth, tpr);

    const size = (deviceWidth - margin * (tpr * 2)) / tpr;

    return { size, margin };
  };

  const TileItem = ({
    size,
    margin,
    touchable,
    data,
    index,
    obj,
    tileHeight,
    tileStyle,
  }) => (
    <View key={index}>
      {touchable && touchable === true && (
        <TouchableOpacity onPress={() => touchableCallback(index, obj)}>
          <View
            style={[
              tileStyle ? tileStyle : currentStyle.tile,
              {
                width: size,
                height: tileHeight ? tileHeight : size,
                marginHorizontal: margin,
              },
            ]}
          >
            {tileContent(data)}
          </View>
        </TouchableOpacity>
      )}
      {(!touchable || touchable === false) && (
        <View
          style={[
            tileStyle ? tileStyle : currentStyle.tile,
            {
              width: size,
              height: tileHeight ? tileHeight : size,
              marginHorizontal: margin,
            },
          ]}
        >
          {tileContent(data)}
        </View>
      )}
    </View>
  );

  const tileDimensions = (tpr) => calcTileDimensions(dimensions.window.width, tpr);

  useEffect(() => {
    if (customStyle && typeof customStyle === "object") {
      setCurrentStyle(customStyle);
    }

  }, [customStyle]);

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);


  return (
    <ScrollView refreshControl={refreshControl}>
      {showChildren === true && children}
      {(showChildren === false || !showChildren) && (
        <View style={currentStyle.container}>
          {tiles.map((i, ind) =>
            TileItem({
              ...tileDimensions(i.tpr),
              touchable: i.touchable,
              tileHeight: i.tileHeight,
              tileStyle: i.tileStyle,
              data: i.data,
              index: ind,
              obj: i,
            })
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default TileView;
