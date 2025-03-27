import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const ForgotPassword = () => {
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(59);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleSubmit = () => {
    // Input validation
    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage(''); // Clear error message
    alert('Verification code sent to your email.'); // Success message
    router.push('/(auth)/resetpassword'); // Redirect to resetpassword.tsx
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/mediskinlogo.png')} style={styles.logo} />

      {/* Forgot Password Box */}
      <View style={styles.forgotPasswordBox}>
        <Text style={styles.title}>FORGOT PASSWORD</Text>
        <Text style={styles.subtitle}>
          Enter your Email and we'll send you a code to reset your Password
        </Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor="#0255A3"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Code Input */}
        <View style={styles.codeContainer}>
          <TextInput
            style={[styles.input, styles.codeInput]}
            placeholder="ENTER CODE"
            placeholderTextColor="#0255A3"
            value={code}
            onChangeText={setCode}
          />
          <Text style={styles.timer}>{timer} secs</Text>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2EDF2' },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30, // Adjusted margin to match the screenshot
  },
  forgotPasswordBox: {
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
  subtitle: { fontSize: 14, textAlign: 'center', color: '#0255A3', marginBottom: 20 },
  input: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  codeInput: { flex: 1, marginRight: 10 },
  timer: { fontSize: 14, color: '#0255A3' },
  errorText: { color: 'red', fontSize: 14, marginTop: 10 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#0255A3',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#0255A3',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  backButtonText: { 
    color: '#0255A3', // Back button text color
    fontWeight: 'bold', 
    fontSize: 16 
  },
  submitButtonText: { 
    color: 'white', // Submit button text color
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default ForgotPassword;
