import React from "react";
import Button from "../../../components/ui/button/Button";
import "../../../styles/auth.css";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.95v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.05l3.02-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

interface SocialAuthProps {
  dividerText?: string;
  googleLabel?: string;
  onGoogleClick?: () => Promise<void> | void;
  isLoading?: boolean;
}

export const SocialAuth: React.FC<SocialAuthProps> = ({
  dividerText = "or continue with",
  googleLabel = "Continue with Google",
  onGoogleClick,
  isLoading = false,
}) => {
  return (
    <div className="social-auth">
      <div className="social-auth-divider">
        <span className="social-auth-divider-line" />
        <span className="social-auth-divider-text">{dividerText}</span>
        <span className="social-auth-divider-line" />
      </div>

      <Button
        type="button"
        variant="secondary"
        fullWidth
        isLoading={isLoading}
        onClick={onGoogleClick}
        className="social-auth-google-btn"
      >
        {!isLoading && <GoogleIcon />}
        {googleLabel}
      </Button>
    </div>
  );
};

export default SocialAuth;
