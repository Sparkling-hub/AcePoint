import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Text, View } from 'tamagui';

import { ChevronRight } from '@tamagui/lucide-icons';
import PlayerPfp from '@/components/PlayerPfp';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';

export default function PlayerAccount() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerDisplayNameContainer}>
        <PlayerPfp imageContainerStyle={{ marginBottom: 20 }} />
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

  playerDisplayNameContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 30,
  },
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.secondary,
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
    color: Colors.secondary,
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
    backgroundColor: Colors.primary,
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
    color: Colors.secondary,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 12,
    backgroundColor: Colors.secondary,
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
