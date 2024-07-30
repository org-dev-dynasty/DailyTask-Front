import { CenteredView, ForgotPasswordText, InputView, LoginButton, LoginButtonText, LogoImage, SeparatorContainer, SeparatorLine, SeparatorText, Title, SocialIcons, SignUpLink, SignUpLinkText, DevDynastyText } from './styles';
import { Background } from '@/components/background';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Input } from '@/components/input/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/user_context';

// import * as WebBrowser from 'expo-web-browser'
// import * as Google from 'expo-auth-session/providers/google'
// import * as AuthSession from 'expo-auth-session'

import { GoogleSignin } from "@react-native-google-signin/google-signin"
import theme from '@/themes/theme';

const Logo = require('../../assets/appImages/logo-daily-branca.png');
const LogoDevDynasty = require('../../assets/appImages/logo-dev-dynasty.png');
const LogoGoogle = require('../../assets/appImages/logo-google.png');
const LogoGitHub = require('../../assets/appImages/logo-gitHub.png');

// GoogleSignin.configure({
//   scopes: ['email', 'profile'],
//   webClientId: '477785692735-olm3sejb8innr21hts1affdfrso98m8o.apps.googleusercontent.com',
//   iosClientId: '477785692735-m38lmcvn3lp2u4q2r0m7hi4nquim8gjq.apps.googleusercontent.com',
// })

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [themeModeS, setThemeModeS] = useState('dark');

  // const [isAuthenticating, setIsAuthenticating] = useState(false)

  // async function googleSignIn() {
  //   try {
  //     const resp = await GoogleSignin.signIn()
  //     console.log(resp)
  //   } catch(e: any) {
  //     console.log(e)
  //     Alert.alert("Entrar", "Não foi possível conectar com sua conta google")
  //   }
  // }

  const { login } = useContext(UserContext);

  useEffect(() => {
    if (email !== '') {
      setErroEmail('');
    }
    if (password !== '') {
      setErroPassword('');
    }
  }, [email, password]);

  useEffect(() => {
    async function loginVerify() {
      const response = await AsyncStorage.getItem('token');
      if (response) {
        router.replace('/home');
      }
    }
    loginVerify();
  }, [])

  async function handleLogin() {
    // Validation of email and password
    if (email === '' && password === '') {
      console.log('Email vazio');
      console.log('Senha vazia');
      setErroEmail('Preencha todos os campos');
      setErroPassword('Preencha todos os campos');
      return;
    }
    if (email === '') {
      console.log('Email vazio');
      setErroEmail('Preencha o campo email');
      return;
    }
    if (password === '') {
      console.log('Senha vazia');
      setErroPassword('Preencha o campo senha');
      return;
    }
    // Reuquest to login
    const result = await login(email, password);
    if (result) {
      alert('Login efetuado com sucesso');
      await AsyncStorage.setItem('id_token', result.id_token);
      await AsyncStorage.setItem('token', result.access_token);
      await AsyncStorage.setItem('refresh_token', result.refresh_token);
      router.replace('/home');
    }
  }

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('themeMode').then((value) => {
        console.log(themeModeS)
        if (value) {
          console.log('value ' + value)
          setThemeModeS(value);
        }
      });
    }, [])
  );

  return (
    <Background>
      <CenteredView>
        <LogoImage source={themeModeS === 'dark' 
                    ? require('../../assets/appImages/logo-daily-branca.png') 
                    : require('../../assets/appImages/logo-daily-preta.png')} />
        {/* <Title>Login</Title> */}
        <InputView>
          <Input label='Email' value={email} onChangeText={setEmail} error={erroEmail} />
          <Input label='Senha' value={password} onChangeText={setPassword} error={erroPassword} hide />
        </InputView>
        <Link href={"/forgetPassword"} style={{ marginTop: 10, alignSelf: 'flex-end', paddingRight: 50 }}>
          <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
        </Link>
        <LoginButton onPress={handleLogin}>
          <LoginButtonText>Entrar</LoginButtonText>
        </LoginButton>
        <SeparatorContainer>
          <SeparatorLine style={{borderColor: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}/>
            <SeparatorText style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}>ou</SeparatorText>
          <SeparatorLine style={{borderColor: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}/>
        </SeparatorContainer>
        <SocialIcons>
          <TouchableOpacity onPress={()=>{}}  >
            <Image source={LogoGoogle} />
          </TouchableOpacity>
          {/* <Image source={LogoGitHub} /> */}
        </SocialIcons>
        <SignUpLink>
          <SignUpLinkText style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}>Ainda não tem cadastro? </SignUpLinkText>
          <Link
            href={"/signUp"}
          >
            <Text style={{ color: '#F06B41', fontSize: 16 }}>Faça seu cadastro!</Text>
          </Link>
        </SignUpLink>
        <DevDynastyText style={{color: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK}}>Desenvolvido por DevDynasty</DevDynastyText>
        <Image style={{ marginTop: 20, marginBottom: 47 }} source={LogoDevDynasty} />
      </CenteredView>
    </Background>
  );
};

