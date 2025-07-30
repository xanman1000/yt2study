import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, Text, TouchableOpacity } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const key = process.env.EXPO_PUBLIC_YOUTUBE_KEY;
    const resp = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${key}`);
    const data = await resp.json();
    setResults(data.items || []);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput value={query} onChangeText={setQuery} placeholder="Search" style={{ borderWidth: 1, marginBottom: 8, padding: 4 }} />
      <Button title="Search" onPress={search} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('VideoDetail', { video: item })} style={{ flexDirection: 'row', padding: 8 }}>
            <Image source={{ uri: item.snippet.thumbnails.default.url }} style={{ width: 80, height: 60, marginRight: 8 }} />
            <Text style={{ flex: 1 }}>{item.snippet.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
