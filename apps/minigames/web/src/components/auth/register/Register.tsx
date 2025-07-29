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
    console.log(email, password, name, code);
    // Aquí iría la lógica de registro
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
