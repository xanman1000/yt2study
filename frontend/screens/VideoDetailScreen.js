import React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function VideoDetailScreen({ route, navigation }) {
  const { video } = route.params;
  const videoId = video.id.videoId;

  const generate = async () => {
    const resp = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/guide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ video_id: videoId, title: video.snippet.title })
    });
    const data = await resp.json();
    navigation.navigate('StudyGuide', { guide: data.guide, video });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={{ width: 320, height: 180 }} />
      <Text style={{ fontSize: 18, marginVertical: 8 }}>{video.snippet.title}</Text>
      <Button title="Generate Study Guide" onPress={generate} />
    </View>
  );
}
