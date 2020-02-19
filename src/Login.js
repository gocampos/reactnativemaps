import React, { Component } from "react";

import { View, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Item,
  Content,
  Header,
  Form,
  Button,
  Input,
  Text,
  Label
} from "native-base";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: "",
      password: ""
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    let usernameValue = this.state.login;

    AsyncStorage.setItem(
      "userLogged",
      JSON.stringify({
        user: {
          login: usernameValue
        }
      }),
      () => {
        this.props.navigation.navigate("MapScreen");
      }
    );
  }

  onUsernameChange(value) {
    this.setState({ username: value });
  }

  onPasswordChange(value) {
    this.setState({ password: value });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Label>User</Label>
            </Item>
            <Item>
              <Input onChange={value => this.onUsernameChange(value)} />
            </Item>
            <Item>
              <Label>Password</Label>
            </Item>
            <Item>
              <Input
                secureTextEntry={true}
                onChange={value => this.onPasswordChange(value)}
              />
            </Item>
            <View style={styles.buttonContainer}>
              <Button onPress={this.onLogin}>
                <Text>Sign in</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: "center"
  }
});
