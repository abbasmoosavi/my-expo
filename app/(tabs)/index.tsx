import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Platform, FlatList, Text, View, Alert, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Col, Grid } from 'react-native-easy-grid';
import Recaptcha from 'react-native-google-recaptcha';
// import GoogleRecaptcha, {
//   GoogleRecaptchaSize,
//   GoogleRecaptchaToken,
//   GoogleRecaptchaRefAttributes,
//   GoogleRecaptchaActionName
// } from 'react-native-google-recaptcha'
// import { WebView } from 'react-native-webview';

const data = [
  { id: 1, title: 'Poppins Bold', font: 'PoppinsBold' },
  { id: 2, title: 'Poppins Medium', font: 'PoppinsMedium' },
  { id: 3, title: 'Poppins Regular', font: 'PoppinsRegular' },
  { id: 4, title: 'Poppins Light', font: 'PoppinsLight' },
]

export default function HomeScreen() {

  const [showCaptcha, setShowCaptcha] = useState(false);
  const webviewRef = useRef(null);

  const siteKey = '6LdgfakqAAAAAP0rczG2FWw38Z00enAuh2HahGv2';
  const recaptchaUrl = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit`;
  const baseUrl = 'https://localhost'

  const handleMessage = (event) => {
    const data = event.nativeEvent.data;
    console.log("data", JSON.stringify(data));


    if (data === 'success') {
      Alert.alert('Success', 'reCAPTCHA verified!');
      setShowCaptcha(false);
    } else if (data === 'error') {
      Alert.alert('Error', 'Failed to verify reCAPTCHA.');
    }
  };

  const renderWebView = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="${recaptchaUrl}"></script>
        </head>
        <body>
          <div id="captcha"></div>
          <script>
            function onloadCallback() {
              grecaptcha.render('captcha', {
                sitekey: '${siteKey}',
                callback: function(token) {
                  window.ReactNativeWebView.postMessage(token);
                },
                'error-callback': function() {
                  window.ReactNativeWebView.postMessage('error');
                }
              });
            }
          </script>
        </body>
      </html>
    `;
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent, baseUrl: 'https://expo.dev' }}
        ref={webviewRef}
        onMessage={handleMessage}
        javaScriptEnabled
        style={{ width: 250, height: 200 }}
      />
    );
  };

  // const recaptchaRef = React.useRef<GoogleRecaptchaRefAttributes>(null)

  // const handleSend = async () => {
  //   try {
  //     const token = await recaptchaRef.current?.getToken()

  //     console.log('Recaptcha Token:', token)
  //   } catch (e) {
  //     console.error('Recaptcha Error:', e)
  //   }
  // }

  const recaptchaRef = useRef(null);

  const handleVerify = (token: string) => {
    console.log('reCAPTCHA Token:', token);
    Alert.alert('Success', `Verified with token: ${token}`);
    // You can send the token to your backend for verification
  };

  const handleExpire = () => {
    Alert.alert('Expired', 'reCAPTCHA expired. Please try again.');
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <Grid style={[styles.cardItem, { marginEnd: index % 2 == 0 ? 8 : 0 }]} className='rounded-2xl bg-[#1B1B27]'>
        <Text className='mt-2 text-white' style={[styles.textItem, { fontFamily: item?.font }]}>{item?.title}</Text>
      </Grid>
    )
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >


      {/* <FlatList numColumns={2} data={data} style={styles.cardContainer} renderItem={renderItem} keyExtractor={(item) => item?.id?.toString()} ItemSeparatorComponent={() => {
        return (<View style={{ height: 8, width: '100%' }} />)
      }} /> */}

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: 'PoppinsLight' }}>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* <View style={{ flex: 1 }}>
          {renderWebView()}
        </View> */}
        {/* <GoogleRecaptcha
          ref={recaptchaRef}
          size={GoogleRecaptchaSize.NORMAL}
          // action={GoogleRecaptchaActionName.LOGIN}
          baseUrl="https://expo.dev"
          siteKey={siteKey}
        />

        <Button title="Send" onPress={handleSend} /> */}

        <Button
          title="Verify with reCAPTCHA"
          onPress={() => {
            console.log('start');
            recaptchaRef.current?.open()

          }}
        />
        <Recaptcha
          ref={recaptchaRef}
          siteKey={siteKey} // Replace with your site key
          baseUrl={baseUrl} // Replace with your app's base URL
          onVerify={handleVerify}
          onExpire={handleExpire}
        />
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  cardItem: {
    width: '48%',
    height: 200,
    // backgroundColor: '#1B1B27',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10
  },
  textItem: {
    fontSize: 14,
    // color: '#FFFFFF'
  }
});
