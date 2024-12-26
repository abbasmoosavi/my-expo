import { Image, StyleSheet, Platform, FlatList, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Col, Grid } from 'react-native-easy-grid';
import { useCameraDevice, useCameraPermission, Camera } from "react-native-vision-camera";


const data = [
  { id: 1, title: 'Poppins Bold', font: 'PoppinsBold' },
  { id: 2, title: 'Poppins Medium', font: 'PoppinsMedium' },
  { id: 3, title: 'Poppins Regular', font: 'PoppinsRegular' },
  { id: 4, title: 'Poppins Light', font: 'PoppinsLight' },
]

export default function HomeScreen() {
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()

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

      {device !== null && hasPermission ? (
        <Camera
          style={{width: 300, height:400}}
          device={device}
          isActive={true}
        />
      ) : (
        <View>
          <Text className='text-white font-semibold text-lg'>No Camera</Text>
        </View>
      )}

      <FlatList numColumns={2} data={data} style={styles.cardContainer} renderItem={renderItem} keyExtractor={(item) => item?.id?.toString()} ItemSeparatorComponent={() => {
        return (<View style={{ height: 8, width: '100%' }} />)
      }} />

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
