import { LoginForm } from '../components/LoginForm.tsx';
import { BaseLayout } from '../layouts/BaseLayout.tsx';

export const SignUp = () => (
  <BaseLayout>
    <LoginForm mode="signup" />
  </BaseLayout>
);
