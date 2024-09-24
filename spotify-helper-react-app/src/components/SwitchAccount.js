import { loginUrl } from '../spotify';

const SwitchAccount = () => {
  return (
    <div className="login">
      <a href={loginUrl}>SWITCH ACCOUNT</a>
    </div>
  );
};

export default SwitchAccount;