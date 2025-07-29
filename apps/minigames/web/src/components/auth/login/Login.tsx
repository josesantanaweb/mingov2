'use client';
import AuthForm from '@/components/common/auth-form';
import { loginSchema } from '@/validations/auth';
import { useRouter } from 'next/navigation';

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const handleLogin = async (data: LoginInput) => {
    const { email, password } = data;
    console.log(email, password);
    // Aquí iría la lógica de login
  };

  const handleNavigate = () => {
    router.push('/register');
  };

  return (
    <AuthForm
      mode="login"
      schema={loginSchema}
      onSubmit={handleLogin}
      onNavigate={handleNavigate}
    />
  );
};

export default Login;
