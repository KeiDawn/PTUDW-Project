import { createContext, useContext, useEffect, useState } from 'react';
import { loginApi } from '../api/auth.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore login on refresh
  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('access_token');

  if (storedUser && storedUser !== 'undefined' && token) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error('Invalid user in localStorage, clearing...');
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      setUser(null);
    }
  }
}, []);


  const login = async (credentials) => {
    const res = await loginApi(credentials);

    // const { token, user } = res.data;
    const { token, user } = res.data.data;

    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);

    return user; // FE dùng để redirect theo role
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
