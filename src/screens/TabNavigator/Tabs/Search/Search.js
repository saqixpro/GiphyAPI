import React, { memo, useCallback, useMemo, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Layout from "../../../../components/Layout";
import Search from "../../../../components/Search";
import { API } from "../../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../actions";
import { getResponse } from "../../../../selectors";
import Text from "../../../../components/Text";
import Animated from "react-native-reanimated";
import { theme } from "../../../../theme";
import { TextVairants } from "../../../../components/Text/Text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FastImage from "react-native-fast-image";

const Touchable = Animated.createAnimatedComponent(TouchableOpacity);

const RenderItem = memo(({ item }) => {
  const { Frame } = theme;
  const [preloading, setPreloading] = useState(true);

  return (
    <Touchable style={{ marginHorizontal: 10 }}>
      {preloading && (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={Frame.width / 2.5} aspectRatio={1} />
        </SkeletonPlaceholder>
      )}
      <FastImage
        source={{ uri: item.images.downsized.url }}
        onLoadEnd={() => setPreloading(false)}
        style={[
          {
            width: Frame.width / 2.5,
            aspectRatio: 1,
          },
          preloading && { display: "none" },
        ]}
      />
    </Touchable>
  );
});

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const response = useSelector(getResponse);

  const searchGifs = useCallback(async () => {
    const result = await API.search(query);
    if (result.data && result.data?.length) {
      dispatch({
        type: actions.SAVE_GIPHY_RESPONSE,
        payload: result.data,
      });
    }
  }, [query, dispatch]);

  const onLoadMore = useCallback(async () => {
    if (response.length === 50) {
      Alert.alert(
        "Limit Exceeded",
        "The Current Giphy API only supports upto maximum 50 results, upgrade to production to load more."
      );
      return;
    }

    const result = await API.search(query, response.length);
    if (result.data && result.data?.length) {
      console.log(result.data.length);
      dispatch({
        type: actions.SAVE_GIPHY_RESPONSE,
        payload: result.data,
      });
    }
  }, [query, dispatch, response]);

  const ListEmptyComponent = useMemo(
    () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          color={theme.Colors.gray}
          align="center"
          size={16}
          variant={TextVairants.MEDIUM}
        >
          Start exploring GIFs by entering a search term above
        </Text>
      </View>
    ),
    []
  );

  const ListFooterComponent = useMemo(
    () => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: theme.Frame.height / 10,
        }}
      >
        <Touchable onPress={onLoadMore}>
          <Text
            color={theme.Colors.accent}
            size={16}
            variant={TextVairants.MEDIUM}
          >
            Load More
          </Text>
        </Touchable>
      </View>
    ),
    [onLoadMore]
  );

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <Search
          onChangeText={(text) => setQuery(text)}
          onBlur={searchGifs}
          placeholder="Search Giphy"
        />
        <Animated.FlatList
          data={response}
          contentContainerStyle={[
            {
              gap: 10,
              paddingVertical: 20,
            },
            !response.length && { flex: 1 },
          ]}
          numColumns={2}
          style={{
            minHeight: theme.Frame.height / 1.25,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1600}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={response.length && ListFooterComponent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderItem item={item} />}
        />
      </View>
    </Layout>
  );
};

export default SearchScreen;
