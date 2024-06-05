import { colors } from '@/constants/tokens';
import { useEffect, useState } from 'react';
import { getColors } from 'react-native-image-colors';

export const usePlayerBackground = (imageUrl) => {
  const [imageColors, setImageColors] = useState(null);

  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors));
  }, [imageUrl]);

  return { imageColors };
};
