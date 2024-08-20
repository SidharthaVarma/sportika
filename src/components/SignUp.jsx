import React, { useState } from 'react';

const SignUp = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [rednumber, setRednumber] = useState('');
  const [branch, setBranch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError(''); // Reset error and success messages
    setSuccess('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname, lname, email, password, number, rednumber, branch }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Sign up successful! You can now log in.');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {/* Form fields for fname, lname, email, password, number, rednumber, branch */}
        <input type="text" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
        <input type="text" placeholder="Registration Number" value={rednumber} onChange={(e) => setRednumber(e.target.value)} />
        <input type="text" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
        <button onClick={handleSignUp} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
