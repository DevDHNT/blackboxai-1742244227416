import React, { createContext, useState, useContext } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  type: 'patient' | 'doctor' | 'admin';
};

type AuthContextData = {
  user: User | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Validação do email do administrador
      if (email.toLowerCase() === 'dionathanma@hotmail.com') {
        setUser({
          id: '1',
          name: 'Dionathan',
          email: 'dionathanma@hotmail.com',
          type: 'admin'
        });
      } else {
        // Para outros usuários, definir como paciente
        setUser({
          id: Date.now().toString(),
          name: email.split('@')[0],
          email: email,
          type: 'patient'
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.type === 'admin',
        signIn,
        signOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
