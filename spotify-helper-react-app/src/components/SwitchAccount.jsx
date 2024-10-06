import { loginUrl } from '../spotify';

const SwitchAccount = () => {
  return (
    <div className="login">
      <a className='login-text' href={loginUrl}>SWITCH ACCOUNT OR LOGOUT</a>
    </div>
  );
};

export default SwitchAccount;