import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { register, error, success } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        {success && (
          <div className="text-green-600 text-center mb-4 font-medium">
            {success}
          </div>
        )}
        <RegisterForm onSubmit={register} error={error} />
      </div>
    </div>
  );
}
