import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import EditorScreen from './screens/EditorScreen';
import { ROUTES } from './helpers/constants';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Editor: { templateUri: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <NavigationContainer>
        <SafeAreaProvider style={styles.AndroidSafeArea}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Stack.Screen name={ROUTES.EDITOR} component={EditorScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  rootView: { flex: 1 },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
