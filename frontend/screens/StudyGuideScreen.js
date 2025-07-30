import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function StudyGuideScreen({ route }) {
  const { guide, video } = route.params;

  const save = async () => {
    await supabase.from('guides').insert({
      video_id: video.id.videoId,
      title: video.snippet.title,
      guide
    });
    alert('Saved!');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text>{guide}</Text>
      <Button title="Save Guide" onPress={save} />
    </ScrollView>
  );
}
