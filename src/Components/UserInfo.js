import React from 'react';

function UserInfo({ user }) {
  return (
    <section className='user-info'>
      <h1>Welcome to user info page</h1>
      <h2>Personal Details</h2>
      <ul>
        <li>First name: {user.firstName}</li>
        <li>Last name: {user.lastName}</li>
        <li>Id number: {user.idNumber}</li>
        <li>email: {user.email}</li>
        <li>phone: {user.phone}</li>
        <li>Sign up date: {new Date(user.signUpDate * 1000).toDateString()}</li>
      </ul>
      <h2>Business Details</h2>
      <ul>
        <li>Id: {user.businesses[0].id}</li>
        <li>Tax id: {user.businesses[0].taxId}</li>
        <li>Name: {user.businesses[0].taxId}</li>
        <li>English Name: {user.businesses[0].nameEn}</li>
        <li>Address: {user.businesses[0].id}</li>
        <li>City: {user.businesses[0].city}</li>
        <li>City in English: {user.businesses[0].cityEn}</li>
      </ul>
    </section>
  );
}

export default UserInfo;
