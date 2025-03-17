import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { colors, fonts, spacing } from '../themes/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { scaleWidth, scaleHeight, moderateScale } from '../utils/dimensions';
import { useAuth } from '../contexts/AuthContext';

export const Welcome = ({ navigation }: any) => {
  const { signIn, isAdmin } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    try {
      await signIn(loginForm.email, loginForm.password);
      setShowLoginModal(false);
      if (isAdmin) {
        Alert.alert('Bem-vindo', 'Você tem acesso às funcionalidades administrativas.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Olá, bom dia!</Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => setShowLoginModal(true)}
            >
              <Icon name="person-circle-outline" size={moderateScale(24)} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Como podemos ajudar você hoje?</Text>
          
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={moderateScale(20)} color={colors.gray[600]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar médicos ou especialidades"
              placeholderTextColor={colors.gray[600]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Consultas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          {/* Aqui virá a lista de próximas consultas */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Especialidades</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtiesContainer}
          >
            {['Todas', 'Cardiologia', 'Dermatologia', 'Neurologia', 'Ortopedia', 'Pediatria'].map((specialty, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.specialtyButton,
                  index === 0 && styles.specialtyButtonActive
                ]}
              >
                <Text style={[
                  styles.specialtyText,
                  index === 0 && styles.specialtyTextActive
                ]}>
                  {specialty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Médicos Disponíveis</Text>
          {/* Aqui virá a lista de médicos */}
        </View>
      </ScrollView>

      <Modal
        visible={showLoginModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Login</Text>
              <TouchableOpacity onPress={() => setShowLoginModal(false)}>
                <Icon name="close" size={moderateScale(24)} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={moderateScale(20)} color={colors.gray[600]} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor={colors.gray[600]}
                  value={loginForm.email}
                  onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={moderateScale(20)} color={colors.gray[600]} />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor={colors.gray[600]}
                  value={loginForm.password}
                  onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.modalButton} onPress={handleLogin}>
                <Text style={styles.modalButtonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.signUpButton}
                onPress={() => {
                  setShowLoginModal(false);
                  navigation.navigate('SignUp');
                }}
              >
                <Text style={styles.signUpText}>
                  Não tem uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1
  },
  header: {
    backgroundColor: colors.white,
    padding: scaleWidth(spacing.md)
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(spacing.xs)
  },
  loginButton: {
    padding: scaleWidth(spacing.xs)
  },
  title: {
    fontSize: moderateScale(fonts.sizes.xxl),
    fontFamily: fonts.bold,
    color: colors.black
  },
  subtitle: {
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.gray[600],
    marginBottom: scaleHeight(spacing.md)
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: moderateScale(8),
    paddingHorizontal: scaleWidth(spacing.md)
  },
  searchIcon: {
    marginRight: scaleWidth(spacing.sm)
  },
  searchInput: {
    flex: 1,
    height: scaleHeight(40),
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.black
  },
  section: {
    marginTop: scaleHeight(spacing.md),
    padding: scaleWidth(spacing.md),
    backgroundColor: colors.white
  },
  lastSection: {
    marginBottom: scaleHeight(spacing.md)
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(spacing.md)
  },
  sectionTitle: {
    fontSize: moderateScale(fonts.sizes.lg),
    fontFamily: fonts.medium,
    color: colors.black
  },
  seeAll: {
    fontSize: moderateScale(fonts.sizes.sm),
    color: colors.primary
  },
  specialtiesContainer: {
    flexDirection: 'row',
    paddingVertical: scaleHeight(spacing.sm)
  },
  specialtyButton: {
    paddingHorizontal: scaleWidth(spacing.md),
    paddingVertical: scaleHeight(spacing.sm),
    borderRadius: moderateScale(20),
    backgroundColor: colors.gray[100],
    marginRight: scaleWidth(spacing.sm)
  },
  specialtyButtonActive: {
    backgroundColor: colors.primary
  },
  specialtyText: {
    fontSize: moderateScale(fonts.sizes.sm),
    color: colors.gray[700]
  },
  specialtyTextActive: {
    color: colors.white
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: scaleWidth(spacing.md)
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(spacing.xl)
  },
  modalTitle: {
    fontSize: moderateScale(fonts.sizes.xl),
    fontFamily: fonts.bold,
    color: colors.black
  },
  modalForm: {
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
    color: colors.black
  },
  modalButton: {
    backgroundColor: colors.primary,
    height: scaleHeight(48),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(spacing.sm)
  },
  modalButtonText: {
    color: colors.white,
    fontSize: moderateScale(fonts.sizes.md),
    fontFamily: fonts.medium
  },
  signUpButton: {
    alignItems: 'center',
    marginTop: scaleHeight(spacing.md)
  },
  signUpText: {
    fontSize: moderateScale(fonts.sizes.md),
    color: colors.gray[600]
  },
  signUpLink: {
    color: colors.primary,
    fontFamily: fonts.medium
  }
});
