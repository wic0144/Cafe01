import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import navigation from '@react-navigation/native'
export default class SignUpScreen extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      navigation:navigation
    };
  }
   registration_Function = ({navigation}) => {
    
    fetch('http://172.16.29.43/cafe/registration_api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: this.state.name,

        user_email: this.state.email,

        user_password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
       
        Alert.alert(
          'Alert Title',
          responseJson,
          [
            { text: "OK", onPress: () => this.props.navigation.navigate('SignInScreen') }
          ], 
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Enter User Name"
                onChangeText={(data) => this.setState({name: data})}
                underlineColorAndroid="transparent"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Enter User Email Address"
                onChangeText={(data) => this.setState({email: data})}
                underlineColorAndroid="transparent"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Enter User Password"
                onChangeText={(data) => this.setState({password: data})}
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up you agree to our
              </Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Terms of service
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Privacy policy
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={this.registration_Function}
                >
              

                <LinearGradient
                  colors={['#FFA07A', '#FF6347']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#FF6347',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#FF6347',
                    },
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
