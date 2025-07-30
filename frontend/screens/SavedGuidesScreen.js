import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SavedGuidesScreen({ navigation }) {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const { data } = await supabase.from('guides').select('*').order('id', { ascending: false });
      setGuides(data || []);
    };
    fetchGuides();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={guides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('StudyGuide', { guide: item.guide, video: { id: { videoId: item.video_id }, snippet: { title: item.title, thumbnails: { medium: { url: '' } } } } })} style={{ padding: 16 }}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
