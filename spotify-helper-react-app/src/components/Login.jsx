import { loginUrl } from '../spotify';

const Login = () => {
  return (
    <div className="login">
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
};

export default Login;
