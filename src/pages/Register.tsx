import CreateAccountForm from "../features/auth/components/RegisterForm";
import AuthLayout from "../components/layout/AuthLayout";

export default function Register() {
  return (
    <AuthLayout
      heading="Run your team without the chaos"
      subtext="Plans, docs, and updates — all in one place."
    >
      <CreateAccountForm onSubmit={() => {}} />
    </AuthLayout>
  );
}
