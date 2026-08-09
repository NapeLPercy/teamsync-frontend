import AuthLayout from "../components/layout/AuthLayout";
import LoginForm from "../features/auth/components/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      heading="Run your team without the chaos"
      subtext="Plans, docs, and updates — all in one place."
    >
      <LoginForm onSubmit={() => {}} />
    </AuthLayout>
  );
}
