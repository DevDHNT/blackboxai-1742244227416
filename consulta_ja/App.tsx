import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { Navigation } from './src/navigation';
import { colors } from './src/themes/colors';
import { metrics } from './src/utils/dimensions';
import { AuthProvider } from './src/contexts/AuthContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={colors.white}
          translucent
        />
        <Navigation />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'android' ? metrics.statusBarHeight : 0
  }
});

export default App;
