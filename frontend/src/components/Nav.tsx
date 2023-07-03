import { Navbar } from "flowbite-react";

const Nav = () => {
  return (
    <Navbar fluid rounded>
      {/* <DarkThemeToggle /> */}
      <Navbar.Brand href="/navbars" className="mx-auto">
        <span className="self-start whitespace-nowrap text-xl font-semibold dark:text-white">
          Libvirt Manager
        </span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Nav;
