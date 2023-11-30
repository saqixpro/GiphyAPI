import { View, Share, Alert } from "react-native";
import Layout from "../../../../../components/Layout";
import Text from "../../../../../components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import { theme } from "../../../../../theme";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { TextVairants } from "../../../../../components/Text/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as actions from "../../../../../actions";

const Preview = () => {
  const route = useRoute();
  const [preloading, setPreloading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [markedFav, setMarkedFav] = useState(false);

  const onShare = useCallback(() => {
    Share.share({ url: route.params.url, title: route.params.title }).then(
      () => {
        console.log("SHARED");
      }
    );
  }, [route.params]);

  const onAddToFavorites = useCallback(() => {
    dispatch({ type: actions.MARK_AS_FAVORITE, payload: route.params });
    setMarkedFav(() => true);
    Alert.alert("Item added to favorites");
  }, [route.params]);

  const onRemoveFromFavorites = useCallback(() => {
    dispatch({ type: actions.UNMARK_AS_FAVORITE, payload: route.params });
    setMarkedFav(() => false);
    Alert.alert("Item removed from favorites", "", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  }, [route.params]);

  return (
    <Layout>
      <View>
        {preloading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={theme.Frame.width / 2.5}
              aspectRatio={1}
            />
          </SkeletonPlaceholder>
        )}
        <FastImage
          source={{ uri: route.params.images.original.url }}
          onLoadEnd={() => setPreloading(false)}
          style={[
            {
              width: theme.Frame.width / 1.1,
              aspectRatio: 1,
            },
            preloading && { display: "none" },
          ]}
        />
        <View style={{ paddingVertical: 20 }}>
          <Text size={18} variant={TextVairants.MEDIUM}>
            {route.params.title}
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 40,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={onShare}>
            <Ionicons
              name="share-outline"
              size={40}
              color={theme.Colors.accent}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              route.params.favorite || markedFav
                ? onRemoveFromFavorites
                : onAddToFavorites
            }
          >
            <Ionicons
              name={
                route.params.favorite || markedFav ? "star" : "star-outline"
              }
              size={40}
              color={theme.Colors.accent}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Preview;
