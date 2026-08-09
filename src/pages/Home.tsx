import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div>
      <Link to="/sign-in">Sign in</Link>
      <Link to="/sign-up">Sign up</Link>
    </div>
  );
}
