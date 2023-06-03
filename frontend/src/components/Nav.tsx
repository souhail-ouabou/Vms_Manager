import { Navbar, DarkThemeToggle } from 'flowbite-react';

const Nav = () => {
    return (
        <Navbar
            fluid
            rounded
        >
                <DarkThemeToggle />
            <Navbar.Brand href="/navbars">
                <img
                    alt="Flowbite Logo"
                    className="mr-3 h-6 sm:h-9"
                    src="https://flowbite.com/docs/images/logo.svg"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Flowbite
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