import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { colors, fonts, spacing } from '../themes/colors';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { scaleWidth, scaleHeight, moderateScale } from '../utils/dimensions';

export const SignUp = ({ navigation }: any) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    // Implementar lógica de cadastro
    console.log('Form:', form);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header 
        title="Cadastro" 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Criar uma conta</Text>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para criar sua conta e começar a agendar consultas
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor={colors.gray[600]}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={colors.gray[600]}
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="call-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor={colors.gray[600]}
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={colors.gray[600]}
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={moderateScale(20)} 
                color={colors.gray[600]} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor={colors.gray[600]}
              value={form.confirmPassword}
              onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={moderateScale(20)} 
                color={colors.gray[600]} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    flex: 1
  },
  scrollContent: {
    padding: scaleWidth(spacing.md)
  },
  title: {
    fontSize: moderateScale(fonts.sizes.xxl),
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: scaleHeight(spacing.xs)
  },
  subtitle: {
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.gray[600],
    marginBottom: scaleHeight(spacing.xl)
  },
  form: {
    gap: scaleHeight(spacing.md)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: moderateScale(8),
    paddingHorizontal: scaleWidth(spacing.md),
    height: scaleHeight(48)
  },
  input: {
    flex: 1,
    marginLeft: scaleWidth(spacing.sm),
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.black,
    height: '100%',
    ...Platform.select({
      ios: {
        padding: 0
      }
    })
  },
  button: {
    backgroundColor: colors.primary,
    height: scaleHeight(48),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(spacing.xl)
  },
  buttonText: {
    color: colors.white,
    fontSize: moderateScale(fonts.sizes.md),
    fontFamily: fonts.medium
  },
  loginButton: {
    marginTop: scaleHeight(spacing.md),
    alignItems: 'center'
  },
  loginText: {
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.gray[600]
  },
  loginLink: {
    color: colors.primary,
    fontFamily: fonts.medium
  }
});
