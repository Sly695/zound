import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
// import ZoundLogoSvg from '../../assets/zound.svg';
import PrimaryButton from '../components/button/primaryButton';
import SecondaryButton from '../components/button/secondaryButton';
import ZoundLogo from '../../assets/zound.svg'

const LoginPage = props => {
  return (
    <View style={styles.container}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignItems: 'center', justifyContent: 'center', height: '70%', flex: 1, }}>
        {/* <SvgUri source={ZoundLogo} /> */}
        <Text>Va plus vite que la musique avec</Text>
        <ZoundLogo />
      </View>
      <View>
        {/* <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AuthPage')}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity> */}
        <PrimaryButton
          text="Se connecter"
          handleFunction={() => props.navigation.navigate('AuthPage')}
        />
        <SecondaryButton
          text="S'inscrire"
          handleFunction={() => props.navigation.navigate('AuthPage')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 900,
    height: 200,
    marginTop: 20,
    fill: "black",
    stroke: "blue" ,
    strokeWidth: ".5" ,
    fill: "blue" ,
  },
});

export default LoginPage;
