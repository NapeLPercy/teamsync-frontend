import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="dashboardHeader">
      <div className="headerLeft">
        <button
          type="button"
          className="headerMenuToggle"
          onClick={onOpenMobileSidebar}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="headerSearch">
          <Search size={16} className="headerSearchIcon" />
          <input
            type="text"
            className="headerSearchInput"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>
      </div>

      <div className="headerRight">
        <button
          type="button"
          className="headerIconButton"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="headerNotificationDot" />
        </button>

        <div className="headerUserMenu" ref={menuRef}>
          <button
            type="button"
            className="headerUserButton"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
          >
            <span className="headerAvatar">
              {initials || <UserIcon size={16} />}
            </span>
            <span className="headerUserInfo">
              <span className="headerUserName">{displayName}</span>
              {user?.role && (
                <span className="headerUserRole">{user.role}</span>
              )}
            </span>
            <ChevronDown size={16} className="headerChevron" />
          </button>

          {isMenuOpen && (
            <div className="headerDropdown">
              <button
                type="button"
                className="headerDropdownItem"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout?.();
                }}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
