import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function LoginLink() {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link to="/login" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
          Login
        </Link>
      )}
    </Menu.Item>
  );
}
