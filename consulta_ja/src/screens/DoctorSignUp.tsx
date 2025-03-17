import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { colors, fonts, spacing } from '../themes/colors';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { scaleWidth, scaleHeight, moderateScale } from '../utils/dimensions';
import { useAuth } from '../contexts/AuthContext';

const specialties = [
  'Cardiologia',
  'Dermatologia',
  'Neurologia',
  'Ortopedia',
  'Pediatria',
  'Ginecologia',
  'Urologia',
  'Oftalmologia',
  'Otorrinolaringologia',
  'Psiquiatria'
];

export const DoctorSignUp = ({ navigation }: any) => {
  const { isAdmin } = useAuth();
  const [form, setForm] = useState({
    name: '',
    crm: '',
    specialty: '',
    email: '',
    phone: '',
    price: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      Alert.alert(
        'Acesso Negado',
        'Você não tem permissão para acessar esta área.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [isAdmin, navigation]);

  const handleSignUp = () => {
    if (!isAdmin) {
      Alert.alert('Erro', 'Você não tem permissão para cadastrar médicos.');
      return;
    }

    // Validações básicas
    if (!form.name || !form.crm || !form.specialty || !form.email || !form.phone || !form.price || !form.password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Aqui você implementaria a lógica de cadastro do médico
    console.log('Form:', form);
    Alert.alert('Sucesso', 'Médico cadastrado com sucesso!');
    setForm({
      name: '',
      crm: '',
      specialty: '',
      email: '',
      phone: '',
      price: '',
      password: '',
      confirmPassword: ''
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header 
        title="Cadastro de Médico" 
        showBack 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Criar conta de médico</Text>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para cadastrar um novo médico
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
            <Icon name="medical-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="CRM"
              placeholderTextColor={colors.gray[600]}
              value={form.crm}
              onChangeText={(text) => setForm({ ...form, crm: text })}
              keyboardType="numeric"
            />
          </View>

          <View>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowSpecialties(!showSpecialties)}
            >
              <Icon name="medical" size={moderateScale(20)} color={colors.gray[600]} />
              <Text style={[styles.input, !form.specialty && styles.placeholder]}>
                {form.specialty || 'Especialidade'}
              </Text>
              <Icon 
                name={showSpecialties ? "chevron-up" : "chevron-down"} 
                size={moderateScale(20)} 
                color={colors.gray[600]} 
              />
            </TouchableOpacity>

            {showSpecialties && (
              <View style={styles.specialtiesList}>
                {specialties.map((specialty, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.specialtyItem}
                    onPress={() => {
                      setForm({ ...form, specialty });
                      setShowSpecialties(false);
                    }}
                  >
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
            <Icon name="cash-outline" size={moderateScale(20)} color={colors.gray[600]} />
            <TextInput
              style={styles.input}
              placeholder="Valor da consulta"
              placeholderTextColor={colors.gray[600]}
              value={form.price}
              onChangeText={(text) => setForm({ ...form, price: text })}
              keyboardType="numeric"
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
          <Text style={styles.buttonText}>Cadastrar Médico</Text>
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
  placeholder: {
    color: colors.gray[600]
  },
  specialtiesList: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    marginTop: scaleHeight(spacing.xs),
    borderWidth: 1,
    borderColor: colors.gray[200],
    maxHeight: scaleHeight(200)
  },
  specialtyItem: {
    paddingVertical: scaleHeight(spacing.sm),
    paddingHorizontal: scaleWidth(spacing.md),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200]
  },
  specialtyText: {
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.black
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
  }
});
