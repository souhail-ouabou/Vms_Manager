import { Navbar, DarkThemeToggle } from 'flowbite-react';

const Nav = () => {
    return (
        <Navbar
            fluid
            rounded
        >
                <DarkThemeToggle />
            <Navbar.Brand href="/navbars">
                <span className="self-start whitespace-nowrap text-xl font-semibold dark:text-white">
                    Libvirt Manager
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link
                    active
                    href="/navbars"
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    About
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Nav;