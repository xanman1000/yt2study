import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import StudyGuideScreen from './screens/StudyGuideScreen';
import SavedGuidesScreen from './screens/SavedGuidesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
        <Stack.Screen name="StudyGuide" component={StudyGuideScreen} />
        <Stack.Screen name="SavedGuides" component={SavedGuidesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
