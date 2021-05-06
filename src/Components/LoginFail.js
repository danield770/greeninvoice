import React, { useEffect } from 'react';

function LoginFail(props) {
  useEffect(() => {
    const id = setTimeout(() => {
      props.resetLoginFail();
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  });
  return (
    <div className='login-fail'>
      מייל או סיסמה לא נכונים
      <button className='btn-fail' type='button' onClick={props.resetLoginFail}>
        X
      </button>
    </div>
  );
}

export default LoginFail;
