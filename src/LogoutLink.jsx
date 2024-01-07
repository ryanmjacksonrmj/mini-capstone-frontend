import axios from "axios";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("admin");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to="/"
          onClick={handleClick}
          className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
        >
          Sign out
        </Link>
      )}
    </Menu.Item>
  );
}
