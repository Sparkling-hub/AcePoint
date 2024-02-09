import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import CustomButton from '@/components/CustomButton';
import { ChevronRight } from '@tamagui/lucide-icons';

export default function PlayerAccount() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerDisplayNameContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/user-pfp.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.displayNameText}>Daniel Antone</Text>
      </View>
      <View style={styles.accountInfoContainer}>
        <View>
          <Text style={styles.text}>Your Account</Text>
          <View style={styles.box}>
            <CustomButton
              title="Edit profile"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={'#3A4D6C'} />}
            />
            <CustomButton
              title="Settings"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={'#3A4D6C'} />}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>Support</Text>
          <View style={styles.box}>
            <CustomButton
              title="Help"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={'#3A4D6C'} />}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>Legal</Text>
          <View style={styles.box}>
            <CustomButton
              title="Privacy"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={'#3A4D6C'} />}
            />
          </View>
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <CustomButton
          title="Logout"
          onPress={() => {
            console.log('pressed');
          }}
          buttonStyle={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  imageContainer: {
    width: 94,
    height: 94,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#A9D05C',
    borderRadius: 47,
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 45,
  },
  playerDisplayNameContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 30,
  },
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    lineHeight: 24,
    color: '#3A4D6C',
    textAlign: 'center',
  },
  accountInfoContainer: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  text: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#3A4D6C',
    paddingLeft: 20,
    marginBottom: 10,
  },
  box: {
    flexDirection: 'column',
    gap: 15,
  },
  logoutContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#A9D05C',
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'MontserratMedium',
    fontSize: 16,
    lineHeight: 20,
    color: '#3A4D6C',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 12,
    backgroundColor: '#3A4D6C',
    borderRadius: 8,
  },
  logoutButtonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
