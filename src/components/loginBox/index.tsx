/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { AuthContext } from '../../context/auth';



import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export function LoginBox() {
    const navigate = useNavigate()
    const { signIn, signUp } = useContext(AuthContext)
    
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')


    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')


  const [isSignUp, setIsSignUp] = useState(false);
  const [isSingIn, setIsSingIn] = useState(false)

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsSingIn(false)
  };

  const toggleSignIn = () => {
    setIsSignUp(false);
    setIsSingIn(!isSingIn)
  };

  const logon = async (event: any) => {
    event.preventDefault()
    try {
        void await signIn({
            email: emailLogin,
            password: passwordLogin
        })

        toast.success('Welcome to Daily Agenda')
        await new Promise((resolve) => setTimeout(resolve, 1000))

        navigate('/me-tasks')
    } catch (error) {
        const axiosError = error as any 
        toast.error(axiosError.response?.data?.message)
    }
  
  }
  

  const register = async (event: any) => {
    event.preventDefault()
    try {
        void await signUp({
            email, fullName: name, password
        })

        toast.success('Welcome to Daily Agenda')
        await new Promise((resolve) => setTimeout(resolve, 1000))

        navigate('/me-tasks')
    } catch (error) {
        const axiosError = error as any 
        toast.error(axiosError.response?.data?.message)
    }
  
  }

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Log in and create your to-do list</strong>
      {
        
        
      isSignUp && !isSingIn ? (
        // Formulário de registro
        <div className={styles.registrationForm}>
          <h2>Sign Up</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" onChange={event => setName(event.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={event => setEmail(event.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={event => setPassword(event.target.value)} required />
            </div>
            <div className={styles.buttons}>
                <button type="submit" onClick={(e) => logon(e)}>Register</button>
                <button onClick={toggleSignUp}>Back to Sign In</button>
            </div>
          </form>
         
        </div>
        ) : null
  
      }

      {
        !isSignUp && !isSingIn ? 
                // Botões "SIGN IN" e "SIGN UP"
                <div className={styles.buttons}>
                <button onClick={toggleSignIn}>SIGN IN</button>
                <button onClick={toggleSignUp}>SIGN UP</button>
              </div> : null
      }

      {
        !isSignUp && isSingIn ? 
        <div className={styles.registrationForm}>
          <h2>Sign In</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={event => setEmailLogin(event.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={event => setPasswordLogin(event.target.value)} required />
            </div>
            <div className={styles.buttons}>
                <button type="submit" onClick={(e) => logon(e)}>Logon</button>
                <button onClick={toggleSignIn}>Back to Sign UP</button>
            </div>
          </form>
         
        </div> : null

      }
    
        <Toaster />
    </div>
  );
}
