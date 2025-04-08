//src/components/RegisterForm.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    avatar_url: z.string().url('URL inválida').optional().or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

type Props = {
  onSubmit: (data: Omit<RegisterFormData, 'confirmPassword'>) => void;
  error: string;
};

export default function RegisterForm({ onSubmit, error }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler = (data: RegisterFormData) => {
    const { confirmPassword, ...rest } = data;
    onSubmit(rest);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Criar conta</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {[
        { label: 'Nome', name: 'name', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Senha', name: 'password', type: 'password' },
        { label: 'Confirmar senha', name: 'confirmPassword', type: 'password' },
        { label: 'Avatar URL (opcional)', name: 'avatar_url', type: 'text' },
      ].map((field) => (
        <div key={field.name} className="space-y-1">
          <label className="block text-sm font-medium">{field.label}</label>
          <input
            {...register(field.name as keyof RegisterFormData)}
            type={field.type}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          {errors[field.name as keyof RegisterFormData] && (
            <p className="text-red-500 text-sm">
              {errors[field.name as keyof RegisterFormData]?.message?.toString()}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Registrar
      </button>
    </form>
  );
}