import { LoginForm } from '../components/LoginForm.tsx';
import { BaseLayout } from '../layouts/BaseLayout.tsx';

export const Login = () => (
  <BaseLayout>
    <LoginForm mode="login" />
  </BaseLayout>
);
