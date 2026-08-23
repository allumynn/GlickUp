import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

interface UfpeLogoProps {
  size?: number;
  style?: any;
}

export const UfpeLogo: React.FC<UfpeLogoProps> = ({ size = 28, style }) => {
  // Official UFPE crest aspect ratio: 3428 x 5092 (width / height ≈ 0.6732)
  const width = size;
  const height = size * (5092 / 3428);

  return (
    <View style={[styles.container, { width, height }, style]}>
      <Image
        source={{ uri: '/ufpe_brasao.png' }}
        style={[
          styles.image,
          {
            width,
            height,
          },
        ]}
        resizeMode="contain"
        accessibilityLabel="Brasão Oficial da Universidade Federal de Pernambuco (UFPE)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web'
      ? ({
          objectFit: 'contain',
        } as any)
      : {}),
  },
});

export default UfpeLogo;
