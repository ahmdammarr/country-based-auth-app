import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  Text,
  TextStyle,
  ViewStyle,
  View,
  StatusBar,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyle: TextStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };


 
  const Stack = createNativeStackNavigator();


  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
