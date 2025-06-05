export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  loginWithGoogle: () => Promise<void>; // Added loginWithGoogle
  logout: () => Promise<void>;
  error: string;
  success: string;
}

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
};
