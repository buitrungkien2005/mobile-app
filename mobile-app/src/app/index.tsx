import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { rs } from '../utils/scaling';

export default function SplashScreen() {
  const router = useRouter();

  // Khởi tạo các giá trị animation
  const bgAnim = useRef(new Animated.Value(0)).current; // 0: Trắng, 1: Vàng
  const logoColorOpacity = useRef(new Animated.Value(0)).current;
  const logoWhiteOpacity = useRef(new Animated.Value(0)).current;
  const logoOpenOpacity = useRef(new Animated.Value(0)).current;
  
  const beeOpacity = useRef(new Animated.Value(0)).current;
  const beeScale = useRef(new Animated.Value(0.5)).current;
  const beeTranslateX = useRef(new Animated.Value(0)).current;
  
  const fadeOutAll = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Bước 1: Hiện logo màu trên nền trắng (2. open.png)
      Animated.delay(400),
      Animated.timing(logoColorOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.delay(700),
      
      // Bước 2: Nền chuyển Vàng, Logo màu fade-out, Logo trắng fade-in (3. open.png)
      Animated.parallel([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(logoColorOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(logoWhiteOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
      
      Animated.delay(700),
      
      // Bước 3: Logo trắng biến mất
      Animated.timing(logoWhiteOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      
      // Bước 4: Chú ong xuất hiện ở giữa màn hình với size to (4. open.png)
      Animated.parallel([
        Animated.timing(beeOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.spring(beeScale, {
          toValue: 1.2, // size to
          friction: 5,
          useNativeDriver: false,
        }),
      ]),
      
      Animated.delay(800),
      
      // Bước 5: Chú ong nhỏ dần sang phải, Logo text hiện ra bên trái (5. open.png)
      Animated.parallel([
        Animated.spring(beeScale, {
          toValue: 0.8, // To kịch trần
          friction: 6,
          useNativeDriver: false,
        }),
        Animated.spring(beeTranslateX, {
          toValue: 128, // Dịch xa hơn
          friction: 6,
          useNativeDriver: false,
        }),
        
        // Hiện Logo text (Logo_open.png)
        Animated.timing(logoOpenOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      
      Animated.delay(1000),
      
      // Bước 6: Chuyển hướng sang Login
      Animated.timing(fadeOutAll, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      })
    ]).start(() => {
      router.replace('/(auth)/login');
    });
  }, [router]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FFB703'] 
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity: fadeOutAll }]}>
      <View style={styles.center}>
        {/* Logo Màu (chỉ hiện lúc đầu) */}
        <Animated.Image
          source={require('../../assets/images/logo_color.png')}
          style={[styles.logo, { opacity: logoColorOpacity, position: 'absolute' }]}
          resizeMode="contain"
        />
        
        {/* Logo Trắng (hiện lúc sau) */}
        <Animated.Image
          source={require('../../assets/images/logo_white.png')}
          style={[styles.logo, { opacity: logoWhiteOpacity, position: 'absolute' }]}
          resizeMode="contain"
        />

        {/* Logo chữ (hiện ở bước 5, nằm bên trái) */}
        <Animated.Image
          source={require('../../assets/images/logo_open.png')}
          style={[
            styles.logo, // Bằng kích thước logo white
            { 
              opacity: logoOpenOpacity, 
              transform: [{ translateX: -70 }], // Dịch sang trái
              position: 'absolute' 
            }
          ]}
          resizeMode="contain"
        />
        
        {/* Chú ong 3D GIF */}
        <Animated.Image
          source={require('../../assets/images/logo_3d.gif')}
          style={[
            styles.bee, 
            { 
              opacity: beeOpacity, 
              transform: [
                { translateX: beeTranslateX },
                { scale: beeScale }
              ],
              position: 'absolute',
            }
          ]}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: rs(224),
    height: rs(129),
  },
  bee: {
    width: rs(256),
    height: rs(256),
  }
});
