import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { theme } from "../../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../../../../selectors";
import Text from "../../../../../components/Text";
import { Pressable, View } from "react-native";
import Layout from "../../../../../components/Layout";
import Animated from "react-native-reanimated";
import { TextVairants } from "../../../../../components/Text/Text";
import { API } from "../../../../../api/api";
import * as actions from "../../../../../actions";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FastImage from "react-native-fast-image";
import * as HomeRoutes from "../routes";

const RenderItem = memo(({ item }) => {
  const { Frame } = theme;
  const [preloading, setPreloading] = useState(true);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(HomeRoutes.PREVIEW_SCREEN, { ...item })
      }
      style={{ marginHorizontal: 10 }}
    >
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
    </Pressable>
  );
});

const HomeScreen = () => {
  const dispatch = useDispatch();
  const response = useSelector(getTrending);
  const navigation = useNavigation();

  const fetchTrendingGifs = useCallback(async () => {
    const result = await API.trending();
    if (result.data && result.data?.length) {
      dispatch({
        type: actions.SAVE_TRENDING_GIFS,
        payload: result.data,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      fetchTrendingGifs();
    });

    return () => {
      unsubscribe();
    };
  }, [fetchTrendingGifs, navigation]);

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

  const ListHeaderComponent = useMemo(
    () => (
      <View
        style={{
          justifyContent: "center",
          height: theme.Frame.height / 10,
        }}
      >
        <Text size={28} variant={TextVairants.BOLD}>
          Trending Gifs
        </Text>
      </View>
    ),
    []
  );

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={response}
          contentContainerStyle={[
            {
              gap: 10,
              paddingTop: 20,
            },
            !response.length && { flex: 1 },
          ]}
          style={{
            minHeight: theme.Frame.height / 1.25,
          }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1600}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderItem item={item} />}
        />
      </View>
    </Layout>
  );
};

export default HomeScreen;
