import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login, error, success } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        {success && (
          <div className="text-green-600 text-center mb-4 font-medium">
            {success}
          </div>
        )}
        <LoginForm onSubmit={login} error={error} />
      </div>
    </div>
  );
}
