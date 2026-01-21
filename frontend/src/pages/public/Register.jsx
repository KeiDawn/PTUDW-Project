import { useState } from 'react';
import { registerApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};

    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = 'Invalid email format';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    return errs;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await registerApi({ email, password });
      navigate('/login');
    } catch (err) {
      setServerError('Email already exists or server error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      {serverError && (
        <p className="text-red-600 mb-2">{serverError}</p>
      )}

      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}
