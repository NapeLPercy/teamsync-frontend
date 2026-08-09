import React from "react";
import "../../styles/Auth.css";
import authImage from "../../assets/auth.png";

interface AuthLayoutProps {
  imageAlt?: string;
  heading: string;
  subtext?: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  imageAlt = "",
  heading,
  subtext,
  children,
}) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout-visual">
        <img className="auth-layout-image" src={authImage} alt={imageAlt} />
        <div className="auth-layout-overlay">
          <h2 className="auth-layout-heading">{heading}</h2>
          {subtext && <p className="auth-layout-subtext">{subtext}</p>}
        </div>
      </div>

      <div className="auth-layout-content">{children}</div>
    </div>
  );
};

export default AuthLayout;
