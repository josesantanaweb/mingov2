'use client';
import AuthForm from '@/components/common/auth-form';
import { registerSchema } from '@/validations/auth';
import { useRouter } from 'next/navigation';

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  code?: string;
}

const Register = () => {
  const router = useRouter();

  const handleRegister = async (data: RegisterInput) => {
    const { email, password, name, code } = data;
    
    try {
      // Aquí iría la lógica de registro con tu mutation de GraphQL
      // Por ejemplo:
      // const result = await registerUser({
      //   variables: { email, password, name, code }
      // });
      
      // Después del registro exitoso, redirigir al login
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleNavigate = () => {
    router.push('/login');
  };

  return (
    <AuthForm
      mode="register"
      schema={registerSchema}
      onSubmit={handleRegister}
      onNavigate={handleNavigate}
    />
  );
};

export default Register;
