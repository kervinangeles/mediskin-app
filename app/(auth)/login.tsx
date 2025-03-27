import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'; // Import Alert for popup
import Checkbox from 'expo-checkbox'; // Importing expo-checkbox
import { Link, useRouter } from 'expo-router'; // Import useRouter
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

export default function Login() {
  const router = useRouter(); // Initialize router
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false); // State for checkbox
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const handleLogin = () => {
    // Input validation
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    // Password must contain at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    // Sanitize inputs (basic example)
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9]/g, '');
    const sanitizedPassword = password.replace(/[^a-zA-Z0-9]/g, '');

    if (sanitizedUsername !== username || sanitizedPassword !== password) {
      setErrorMessage('Invalid characters in username or password.');
      return;
    }

    // Proceed with login logic (e.g., API call)
    setErrorMessage(''); // Clear error message
    Alert.alert(
      'Login Successful',
      'You have successfully logged in!',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/homescreen'), // Navigate to homepage
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/mediskinlogo.png') as number} style={styles.logo} />

      {/* Login Box */}
      <View style={styles.loginBox}>
        <Image source={require('../../assets/images/avatar.png') as number} style={styles.avatar} />
        <Text style={styles.title}>LOGIN</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          placeholderTextColor="#0255A3"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput} // Updated style for centered text
            placeholder="PASSWORD"
            placeholderTextColor="#0255A3"
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            value={password}
            onChangeText={setPassword}
            textAlign="center" // Center the text
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'} // Toggle between eye and eye-off icons
              size={24}
              color="#0255A3"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me */}
        <View style={styles.optionsRow}>
          <Checkbox
            value={isRememberMeChecked}
            onValueChange={setIsRememberMeChecked}
            color={isRememberMeChecked ? "#0255A3" : undefined} // Changes color when checked
          />
          <Text style={styles.rememberMe}>Remember me</Text>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => router.push('/(auth)/forgotpassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Link href="/(auth)/signup" style={styles.signupLink}>
          SIGN UP
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2EDF2' }, // Centered content
  logo: { 
    width: 250, // Reduced size to avoid overlap
    height: 250, 
    resizeMode: 'contain', 
    marginBottom: 50 // Increased margin to create space between logo and avatar
  },
  loginBox: { 
    width: '85%', // Reduced width for consistency
    backgroundColor: '#7CD8FF', 
    padding: 20, // Reduced padding
    borderRadius: 10, 
    alignItems: 'center',
    position: 'relative', // Added for avatar positioning
    marginBottom: 20, // Added margin to create space for the signup text
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: { 
    width: 80, 
    height: 80, 
    marginBottom: 15, 
    position: 'absolute', // Positioning the avatar
    top: -40, // Moves the avatar upwards to pop out
    borderRadius: 40, // Makes the avatar circular
    borderWidth: 3, // Adds a border for better visibility
    borderColor: '#fff', // White border for contrast
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0255A3', marginTop: 50, marginBottom: 20 }, // Adjusted margin to account for avatar
  input: { 
    width: '100%', 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 20, 
    marginVertical: 10, 
    textAlign: 'center',
    fontSize: 16, // Ensure consistent font size
  },
  optionsRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 15 },
  rememberMe: { fontSize: 14, color: '#0255A3', marginLeft: 10 },
  forgotPassword: { fontSize: 14, color: '#0255A3', marginTop: 15 },
  loginButton: { backgroundColor: '#0255A3', padding: 15, borderRadius: 20, width: '70%', alignItems: 'center', marginTop: 20 },
  loginButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  signupText: { 
    color: '#0255A3', 
    fontSize: 14, 
    marginTop: 10, 
    textAlign: 'center' // Centered the text below the login box
  },
  signupLink: { fontWeight: 'bold', color: '#038DDE' },
  errorText: { color: 'red', fontSize: 14, marginTop: 10 }, // Style for error messages
  passwordContainer: {
    position: 'relative', // Use relative positioning for the toggle
    width: '100%',
    marginVertical: 10,
  },
  passwordInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 16, // Ensure consistent font size
  },
  passwordToggle: {
    position: 'absolute',
    right: 15, // Align the toggle icon to the right
    top: '50%', // Center vertically relative to the input
    transform: [{ translateY: -12 }], // Adjust for icon size
  },
});
