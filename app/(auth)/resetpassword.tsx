import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const router = useRouter();

  const handleSubmit = () => {
    // Input validation
    if (!password || !confirmPassword) {
      alert('Both fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    console.log('Password reset successfully.');
    router.push('/(auth)/login'); // Redirect to login after successful reset
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/mediskinlogo.png')} style={styles.logo} />

      {/* Reset Password Box */}
      <View style={styles.resetPasswordBox}>
        <Text style={styles.title}>RESET PASSWORD</Text>
        <Text style={styles.subtitle}>Enter your new password below</Text>

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="PASSWORD"
            placeholderTextColor="#0255A3"
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            value={password}
            onChangeText={setPassword}
            textAlign="center"
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

        {/* Confirm Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="CONFIRM PASSWORD"
            placeholderTextColor="#0255A3"
            secureTextEntry={!isConfirmPasswordVisible} // Toggle visibility
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            textAlign="center"
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} // Toggle between eye and eye-off icons
              size={24}
              color="#0255A3"
            />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(auth)/forgotpassword')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E2EDF2' },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  resetPasswordBox: {
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
  backButtonText: { 
    color: '#0255A3', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  submitButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});
