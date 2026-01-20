import { createContext, useContext, useEffect, useState } from 'react';
import { loginApi } from '../api/auth.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


  // Restore login on refresh
  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('access_token');

  if (storedUser && token) {
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
    }
  }

  setLoading(false);
}, []);



    const login = async (credentials) => {
    const res = await loginApi(credentials);

    // const { token, user } = res.data;
    const { token, user } = res.data.data;

    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);

    return user; 
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
