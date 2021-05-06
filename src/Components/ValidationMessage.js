import React from 'react';

function ValidationMessage({ validation, inputType, value }) {
  let message = '';

  if (inputType === 'email') {
    if (validation.isEmailValid !== false) {
      message = 'כתובת המייל איתה נרשמת לחשבונית ירוקה';
    } else if (value.length === 0) {
      message = 'חובה למלא את השדה';
    } else {
      message = 'כתובת המייל אינה תקינה';
    }
  }
  if (inputType === 'password' && validation.isPasswordValid === false) {
    if (value.length === 0) {
      message = 'חובה למלא את השדה';
    } else if (value.length < 6) {
      message = 'הסיסמה צריכה לכלול לפחות 6 תווים';
    }
  }
  return <div className='validation-msg'>{message}</div>;
}

export default ValidationMessage;
