import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Welcome } from './screens/Welcome';
import { SignUp } from './screens/SignUp';
import { DoctorSignUp } from './screens/DoctorSignUp';
import { colors } from './themes/colors';
import { moderateScale } from './utils/dimensions';
import { useAuth } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { isAdmin } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray[200],
          height: 60
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[600]
      }}
    >
      <Tab.Screen
        name="Home"
        component={Welcome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={moderateScale(size)} color={color} />
          ),
          tabBarLabel: 'Início'
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="DoctorManagement"
          component={DoctorSignUp}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="medical-outline" size={moderateScale(size)} color={color} />
            ),
            tabBarLabel: 'Cadastrar Médico'
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background
          }
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs}
          options={{
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp}
          options={{
            animation: 'slide_from_right'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
