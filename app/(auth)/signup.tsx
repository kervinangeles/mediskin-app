import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

export default function Signup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const router = useRouter(); // Add router for navigation

  const handleSignup = () => {
    // Input validation
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number

    if (!name || !age || !gender || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!nameRegex.test(name)) {
      setErrorMessage('Name can only contain letters and spaces.');
      return;
    }

    if (isNaN(Number(age)) || Number(age) <= 0) {
      setErrorMessage('Age must be a positive number.');
      return;
    }

    if (!['Male', 'Female'].includes(gender)) {
      setErrorMessage('Please select a valid gender.');
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Sanitize inputs (basic example)
    const sanitizedInputs = [name, age, gender, email, password].map(input =>
      input.replace(/[^a-zA-Z0-9\s@.]/g, '')
    );

    if (
      sanitizedInputs[0] !== name ||
      sanitizedInputs[1] !== age ||
      sanitizedInputs[2] !== gender ||
      sanitizedInputs[3] !== email ||
      sanitizedInputs[4] !== password
    ) {
      setErrorMessage('Invalid characters detected.');
      return;
    }

    setErrorMessage(''); // Clear error message

    // Show success alert and navigate to homepage
    Alert.alert('Success', 'Account registered successfully!', [
      {
        text: 'OK',
        onPress: () => router.push('/(tabs)/homescreen'), // Navigate to homescreen
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust for iOS and Android
    >
      {/* Logo */}
      <Image source={require('../../assets/images/mediskinlogo.png')} style={styles.logo} />

      {/* Sign Up Box */}
      <View style={styles.signupBox}>
        <Text style={styles.title}>SIGN UP</Text>
        <Text style={styles.subtitle}>Create an account to get started</Text>

        {/* Name */}
        <TextInput
          style={styles.input}
          placeholder="NAME"
          placeholderTextColor="#0255A3"
          value={name}
          onChangeText={setName}
        />

        {/* Age & Gender */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="AGE"
            placeholderTextColor="#0255A3"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <View style={styles.genderContainer}>
            <TouchableWithoutFeedback onPress={() => setGender('Male')}>
              <View style={[styles.genderOption, gender === 'Male' && styles.genderOptionSelected]}>
                <Text style={styles.genderText}>Male</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setGender('Female')}>
              <View style={[styles.genderOption, gender === 'Female' && styles.genderOptionSelected]}>
                <Text style={styles.genderText}>Female</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Upload Photo */}
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>UPLOAD PHOTO 📎</Text>
        </TouchableOpacity>

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor="#0255A3"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="PASSWORD"
            placeholderTextColor="#0255A3"
            secureTextEntry={!passwordVisible} // Toggle visibility
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#0255A3"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="CONFIRM PASSWORD"
            placeholderTextColor="#0255A3"
            secureTextEntry={!confirmPasswordVisible} // Toggle visibility
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons
              name={confirmPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#0255A3"
            />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Back to Sign In */}
      <Text style={styles.signinText}>
        Already have an account?{' '}
        <Link href="/(auth)/login" style={styles.signinLink}>
          SIGN IN
        </Link>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2EDF2' },
  logo: { 
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
    marginBottom: 30 
  },
  signupBox: { 
    width: '85%', 
    backgroundColor: '#7CD8FF', 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center',
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0255A3', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#0255A3', marginBottom: 20 },
  input: { width: '100%', backgroundColor: 'white', padding: 15, borderRadius: 20, marginVertical: 10, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  smallInput: { width: '48%' },
  uploadButton: { backgroundColor: 'white', padding: 15, borderRadius: 20, marginVertical: 10, alignItems: 'center', width: '100%' },
  uploadText: { color: '#0255A3', textAlign: 'center', fontWeight: 'bold' },
  signupButton: { backgroundColor: '#0255A3', padding: 15, borderRadius: 20, width: '70%', alignItems: 'center', marginTop: 20 },
  signupButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  signinText: { 
    color: '#0255A3', 
    fontSize: 14, 
    marginTop: 10, 
    textAlign: 'center' 
  },
  signinLink: { fontWeight: 'bold', color: '#038DDE' },
  errorText: { color: 'red', fontSize: 14, marginTop: 10 }, // Style for error messages
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '48%',
  },
  genderOption: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 1,
    borderWidth: 0.5,
    borderColor: '#0255A3',
  },
  genderOptionSelected: {
    flex: 1,
    padding: 10,
    borderWidth: 5,
    borderColor: '#0255A3',
    backgroundColor: '#FFF', //transparent
  },
  genderText: {
    color: '#0255A3',
    fontWeight: 'bold',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    marginVertical: 10,
  },
  passwordInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  toggleText: {
    color: '#0255A3',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});