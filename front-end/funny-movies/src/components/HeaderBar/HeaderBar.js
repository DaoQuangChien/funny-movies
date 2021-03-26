import React, { useState } from "react";
import { withRouter } from "react-router";
import { Button, Col, Divider, Input, Row, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getUserData, useAuthenActions } from "../../shared";
import "./styles.scss";

const { Title } = Typography;
const HeaderBar = ({ history, onSignIn, onSignUp, onSignOut }) => {
  const [isSignIn] = useAuthenActions();
  const userData = getUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChange = (e) => setEmail(e.currentTarget.value);
  const onPasswordChange = (e) => setPassword(e.currentTarget.value);
  const handleSignIn = () => {
    onSignIn(email, password).then(() => {
      setEmail("");
      setPassword("");
    });
  };
  const handleSignUp = () => {
    onSignUp(email, password).then(() => {
      setEmail("");
      setPassword("");
    });
  };
  const handleSignOut = () => onSignOut();
  const onNavigateToPostVideo = () => history.push("/post-video");
  const SignInLayout = (
    <>
      <p className="welcome-text">
        <span className="bold">Welcome </span>
        {userData?.email}
      </p>
      <Button type="primary" onClick={onNavigateToPostVideo}>
        Share a movie
      </Button>
      <Divider type="vertical" className="button-divider" />
      <Button onClick={handleSignOut} type="primary">
        Logout
      </Button>
    </>
  );
  const NotSignInLayout = (
    <>
      <Input
        placeholder="email"
        className="header-input margin-left-auto"
        value={email}
        onChange={onEmailChange}
      />
      <Input
        placeholder="password"
        type="password"
        className="header-input"
        value={password}
        onChange={onPasswordChange}
      />
      <div className="buttons-group flex-layout">
        <Button type="primary" onClick={handleSignIn}>
          Login
        </Button>
        <Divider type="vertical" className="button-divider" />
        <Button type="primary" onClick={handleSignUp}>
          Register
        </Button>
      </div>
    </>
  );

  return (
    <Row className="header">
      <Col className="flex-layout" span={8}>
        <HomeOutlined className="home-icon" />
        <Title className="header-title">Funny Movies</Title>
      </Col>
      <Col span={16}>
        <div className="header-left-content flex-layout">
          {isSignIn ? SignInLayout : NotSignInLayout}
        </div>
      </Col>
      <Divider />
    </Row>
  );
};

export default withRouter(HeaderBar);
