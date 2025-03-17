import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// Tamanho base de design (pode ser ajustado conforme necessário)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Função para escalar horizontalmente
export const scaleWidth = (size: number) => (width / guidelineBaseWidth) * size;

// Função para escalar verticalmente
export const scaleHeight = (size: number) => (height / guidelineBaseHeight) * size;

// Função para escalar proporcionalmente (útil para fontes)
export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scaleWidth(size) - size) * factor;
};

// Obtém a altura da barra de status
export const getStatusBarHeight = () => {
  return Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0;
};

// Verifica se é um iPhone X ou posterior (com notch)
export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 780 || height === 812 || height === 844 || height === 896 || height === 926)
  );
};

// Obtém a altura segura para o bottom tab
export const getBottomSpace = () => {
  return isIphoneX() ? 34 : 0;
};

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  statusBarHeight: getStatusBarHeight(),
  bottomSpace: getBottomSpace(),
};
