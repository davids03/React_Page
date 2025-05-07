"use client";

import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

// Interfaces
export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  const { main }: { main: INavigationLink[] } = menu;
  const { settings } = config;
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedName = localStorage.getItem("username");
    setUsername(storedName);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setDropdownOpen(false);
  };

  return (
    <header className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}>
      <nav className="navbar container">
        {/* Logo */}
        <div className="order-0">
          <Logo />
        </div>

        {/* Navbar Toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-text-dark dark:text-white lg:order-1"
        >
          <svg id="show-button" className="h-6 fill-current block" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg id="hide-button" className="h-6 fill-current hidden" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

        {/* Menu Items */}
        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center ${
                      menu.children?.map(({ url }) => url).includes(pathname) ||
                      menu.children?.map(({ url }) => `${url}/`).includes(pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children?.map((child, j) => (
                      <li className="nav-dropdown-item" key={`children-${j}`}>
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block ${
                            (pathname === `${child.url}/` || pathname === child.url) && "active"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={menu.url}
                    className={`nav-link block ${
                      (pathname === `${menu.url}/` || pathname === menu.url) && "active"
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

        {/* Right-side Controls */}
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {settings.search && (
            <button
              className="border-border text-text-dark hover:text-primary dark:border-darkmode-border mr-5 inline-block border-r pr-5 text-xl dark:text-white dark:hover:text-darkmode-primary"
              aria-label="search"
              data-search-trigger
            >
              <IoSearch />
            </button>
          )}
          <ThemeSwitcher className="mr-5" />

          {/* Usuario logueado o botón de login */}
          {isClient && (
            username ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 font-semibold text-sm text-gray-800 dark:text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser /> {username}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow">
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn btn-sm btn-primary">
                Iniciar sesión
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
