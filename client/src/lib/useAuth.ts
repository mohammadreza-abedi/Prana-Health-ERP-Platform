import { useContext } from 'react';
import { AuthContext } from '../App';

// استفاده از کانتکست احراز هویت
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth باید در AuthProvider استفاده شود');
  }
  
  return context;
}