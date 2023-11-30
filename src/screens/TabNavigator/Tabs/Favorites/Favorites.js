import React, { memo, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import Layout from "../../../../components/Layout";
import { useSelector } from "react-redux";
import { getFavorites } from "../../../../selectors";
import Text from "../../../../components/Text";
import Animated from "react-native-reanimated";
import { theme } from "../../../../theme";
import { TextVairants } from "../../../../components/Text/Text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import * as HomeRoutes from "../HomeStack/routes";
import * as TabsRoutes from "../../routes";

const RenderItem = memo(({ item }) => {
  const { Frame } = theme;
  const [preloading, setPreloading] = useState(true);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(TabsRoutes.HOME_SCREEN, {
          screen: HomeRoutes.PREVIEW_SCREEN,
          params: { ...item, favorite: true },
        })
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

const FavoritesScreen = () => {
  const response = useSelector(getFavorites);

  const ListEmptyComponent = useMemo(
    () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          color={theme.Colors.gray}
          align="center"
          size={16}
          variant={TextVairants.MEDIUM}
        >
          No Favorite Items Found. The Gifs Marked as favorites will appear here
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

export default FavoritesScreen;
