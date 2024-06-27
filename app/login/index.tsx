import { CenteredView, ForgotPasswordText, InputView, LoginButton, LoginButtonText, LogoImage, SeparatorContainer, SeparatorLine, SeparatorText, Title, SocialIcons, SignUpLink, SignUpLinkText, DevDynastyText } from './styles';
import { Background } from '@/components/background';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Input } from '@/components/input/input';

const Logo = require('../../assets/appImages/logo-daily-branca.png');
const LogoDevDynasty = require('../../assets/appImages/logo-dev-dynasty.png');
const LogoGoogle = require('../../assets/appImages/logo-google.png');
const LogoGitHub = require('../../assets/appImages/logo-gitHub.png');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  function handleLogin() {
    if (email === '' && password === '') {
      console.log('Nome vazio');
      console.log('Senha vazia');
      setErroEmail('Preencha todos os campos');
      setErroPassword('Preencha todos os campos');
      return;
    }
    if (email === '') {
      console.log('Nome vazio');
      setErroEmail('Preencha o campo email');
      return;
    }
    if (password === '') {
      console.log('Senha vazia');
      setErroPassword('Preencha o campo senha');
      return;
    }
  }

  useEffect(() => {
    if (email !== '') {
      setErroEmail('');
    }
    if (password !== '') {
      setErroPassword('');
    }
  }, [email, password]);

  return (
    <Background>
      <CenteredView>
        <LogoImage source={Logo} />
        {/* <Title>Login</Title> */}
        <InputView>
          <Input label='Email' value={email} onChangeText={setEmail} error={erroEmail} />
          <Input label='Senha' value={password} onChangeText={setPassword} error={erroPassword} hide/>
        </InputView>
          <Link href={"/forgetPassword"} style={{ marginTop: 10, alignSelf: 'flex-end', paddingRight: 50 }}>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
          </Link>
        <LoginButton onPress={handleLogin}>
          <LoginButtonText>Entrar</LoginButtonText>
        </LoginButton>
        <SeparatorContainer>
          <SeparatorLine />
          <SeparatorText>ou</SeparatorText>
          <SeparatorLine />
        </SeparatorContainer>
        <SocialIcons>
          <Image source={LogoGoogle} />
          <Image source={LogoGitHub} />
        </SocialIcons>
        <SignUpLink>
          <SignUpLinkText>Ainda não tem cadastro? </SignUpLinkText>
          <Link
            href={"/signUp"}
          >
            <Text style={{ color: '#F06B41', fontSize: 16 }}>Faça seu cadastro!</Text>
          </Link>
        </SignUpLink>
        <DevDynastyText>Desenvolvido por DevDynasty</DevDynastyText>
        <Image style={{ marginTop: 20, marginBottom: 47 }} source={LogoDevDynasty} />
      </CenteredView>
    </Background>
  );
};

