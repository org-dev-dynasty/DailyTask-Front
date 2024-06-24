// App.js
import React from 'react';
import { CenteredView, ForgotPasswordText, InputView, LoginButton, LoginButtonText, LogoImage, SeparatorContainer, SeparatorLine, SeparatorText, Title, SocialIcons, SignUpLink, SignUpLinkText, DevDynastyText } from './styles';
import { Background } from '@/components/background';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton, TextInput } from "@react-native-material/core";
import { Link } from 'expo-router';
import { Image, Text } from 'react-native';
import styled from 'styled-components';

const Logo = require('../../assets/appImages/logo-daily-branca.png');
const LogoDevDynasty = require('../../assets/appImages/logo-dev-dynasty.png');
const LogoGoogle = require('../../assets/appImages/logo-google.png');
const LogoGitHub = require('../../assets/appImages/logo-gitHub.png');

export default function Login() {
  return (
    <Background>
      <CenteredView>
        <LogoImage source={Logo} />
        <Title>Login</Title>
        <InputView>
          <TextInput
            label="Email"
            style={{
              margin: 10,
            }}
            inputStyle={{
              color: 'white',
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 5,
            }}
            inputContainerStyle={{ backgroundColor: 'transparent' }}
            color="white" 
          />
          <TextInput
            label="Senha"
            trailing={props => (
              <IconButton icon={props => <Icon style={{ color: 'white' }} name="eye" {...props} />} {...props} />
            )}
            style={{
              margin: 10,
            }}
            inputStyle={{
              color: 'white',

            }}
            inputContainerStyle={{
              backgroundColor: 'transparent', borderColor: 'white',
              borderWidth: 1,
              borderRadius: 5,
            }}
            color='white'
          />
        </InputView>
        <Link href={"/forgetPassword"}>
          <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
        </Link>
        <LoginButton>
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
        <Image  style={{ marginTop: 20, marginBottom: 47}} source={LogoDevDynasty} />
      </CenteredView>
    </Background>
  );
};




