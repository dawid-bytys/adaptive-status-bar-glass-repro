import { AdaptiveStatusBar, useAdaptiveStatusBarStats } from '@rbayuokt/expo-adaptive-status-bar';
import { GlassView } from 'expo-glass-effect';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

AdaptiveStatusBar.enable();

function Repro() {
  const insets = useSafeAreaInsets();
  const stats = useAdaptiveStatusBarStats(250);
  const [glassVisible, setGlassVisible] = useState(false);

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top + 20,
        },
      ]}>
      <Text testID="status-bar-style">Style: {stats?.style ?? '-'}</Text>
      <Text testID="status-bar-lightness">Lightness: {stats?.lightness?.toFixed(2) ?? '-'}</Text>
      <Button
        title={glassVisible ? 'Hide glass' : 'Show glass'}
        onPress={() => setGlassVisible((visible) => !visible)}
      />
      {glassVisible && (
        <GlassView glassEffectStyle="regular" tintColor="#E5E7EB" style={styles.glass} />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Repro />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
    padding: 20,
  },
  glass: {
    width: 160,
    height: 48,
    marginTop: 200,
    borderRadius: 24,
  },
});
