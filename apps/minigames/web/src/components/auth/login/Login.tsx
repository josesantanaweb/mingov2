'use client';
import AuthForm from '@/components/common/auth-form';
import { loginSchema } from '@/validations/auth';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const handleLogin = async (data: LoginInput) => {
    const { email, password } = data;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push('/coin-flip');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
