"use client";
import clsx from "clsx";
import s from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";

const menuItems = [
  {
    label: "About us",
    href: "#about",
  },
  {
    label: "Processes",
    href: "#rocesses",
  },
  {
    label: "Portfolio",
    href: "#portfolio",
  },
  {
    label: "Our stats",
    href: "#ourstats",
  },
];

export const Header = () => {
  const router = useRouter();
  return (
    <>
      <header className={s.header}>
        <div className="container">
            <div className={s.header__wrapper}>
          <nav className={s.header__nav}>
            <Logo className={s.header__logo} loading="eager" />
            <ul className={s.header__menu}>
              {menuItems.map(({ label, href }, index) => (
                <li className={s.header__menu_item} key={index}>
                  <a
                    className={clsx(s.header__menu_link, {
                      "is-active": router.pathname === href,
                    })}
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={s.header__contacts}>
            <Button title={"Contact us"} />
          </div>
        </div>
        </div>
      </header>
    </>
  );
};

