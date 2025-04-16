export type AuthContextType = {
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  error: string;
  success: string;
};

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
