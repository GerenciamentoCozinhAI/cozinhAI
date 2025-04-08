//src/components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

type Props = {
  onSubmit: (data: LoginFormData) => void;
  error: string;
};

export default function LoginForm({ onSubmit, error }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Entrar</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="space-y-1">
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Senha</label>
        <input
          {...register("password")}
          type="password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Entrar
      </button>
      <p className="text-sm text-center text-gray-600">
        Ainda não tem conta?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Criar conta
        </a>
      </p>
    </form>
  );
}
