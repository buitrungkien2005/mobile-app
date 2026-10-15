import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
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

  const beeLoadedRef = useRef(false);
  const step3FinishedRef = useRef(false);
  const step4StartedRef = useRef(false);

  const startStep4AndRest = () => {
    if (step4StartedRef.current) return;
    step4StartedRef.current = true;

    Animated.sequence([
      // Bước 4: Chú ong xuất hiện ở giữa màn hình với size to (4. open.png)
      Animated.parallel([
        Animated.timing(beeOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.spring(beeScale, {
          toValue: 1.2, // size to
          friction: 5,
          useNativeDriver: false,
        }),
      ]),
      
      Animated.delay(1000),
      
      // Bước 5: Chú ong nhỏ dần sang phải, Logo text hiện ra bên trái (5. open.png)
      Animated.parallel([
        Animated.spring(beeScale, {
          toValue: 0.8,
          friction: 6,
          useNativeDriver: false,
        }),
        Animated.spring(beeTranslateX, {
          toValue: rs(114), // Dịch sang phải vừa vặn, gần sát logo chữ
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
      
      Animated.delay(1200),
      
      // Bước 6: Chuyển hướng sang Login
      Animated.timing(fadeOutAll, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      })
    ]).start(() => {
      router.replace('/(auth)/login');
    });
  };

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
    ]).start(() => {
      step3FinishedRef.current = true;
      if (beeLoadedRef.current) {
        startStep4AndRest();
      }
    });

    // Fallback timer: nếu sau 8s mà chưa trigger thì tự động tiếp tục
    const fallbackTimer = setTimeout(() => {
      if (step3FinishedRef.current && !step4StartedRef.current) {
        startStep4AndRest();
      }
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, [router]);

  const handleBeeLoad = () => {
    beeLoadedRef.current = true;
    if (step3FinishedRef.current && !step4StartedRef.current) {
      startStep4AndRest();
    }
  };

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

        {/* Logo chữ (hiện ở bước 5, nằm bên trái gần sát chú ong) */}
        <Animated.Image
          source={require('../../assets/images/logo_open.png')}
          style={[
            styles.logoOpen,
            { 
              opacity: logoOpenOpacity, 
              transform: [{ translateX: -rs(40) }], // Dịch sang trái cân đối, tạo khoảng cách hẹp tự nhiên
              position: 'absolute' 
            }
          ]}
          resizeMode="contain"
        />
        
        {/* Chú ong 3D GIF chạy mượt mà với ExpoImage */}
        <Animated.View
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
        >
          <ExpoImage
            source={require('../../assets/images/logo_3d.gif')}
            style={styles.beeImage}
            contentFit="contain"
            autoplay
            onLoad={handleBeeLoad}
          />
        </Animated.View>
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
  logoOpen: {
    width: rs(208),
    height: rs(75),
  },
  bee: {
    width: rs(256),
    height: rs(256),
    justifyContent: 'center',
    alignItems: 'center',
  },
  beeImage: {
    width: '100%',
    height: '100%',
  }
});
