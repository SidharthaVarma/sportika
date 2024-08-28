import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(''); 
    setSuccess('');

  //   try {
  //     const response = await fetch('/api/users', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setSuccess('Login successful!');
  //       console.log('Login successful', data);
  //       // You can also redirect the user to another page after login if needed
  //     } else {
  //       setError(data.message || 'Login failed');
  //     }
  //   } catch (err) {
  //     setError('An error occurred. Please try again.');
  //   }
  // };
  try {
    const response = await fetch(`/api/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
  
    if (response.ok) {
      setSuccess('Login successful!');
      console.log('Login successful', data);
      // You can also redirect the user to another page after login if needed
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('An error occurred. Please try again.');
  }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
// src/components/Login.jsx

// import React, { useState } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch('/api/users', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('Login successful!');
//         console.log('User details:', data);
//         // Further processing or redirection can happen here
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-80 flex flex-col items-center">
//         <h2 className="text-3xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-500">{success}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-2 p-2 border rounded"
//         />
//         <button
//           onClick={handleLogin}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Log In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
