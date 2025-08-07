'use client';
import AuthForm from '@/components/common/auth-form';
import { loginSchema } from '@/validations/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data: LoginInput) => {
    const { email, password } = data;
    await login({ email, password });
    router.push('/coin-flip');
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
