import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";

function Navbar() {
  return (
    <header className="px-10 py-8 bg-red-50 w-full">
      <nav className="flex justify-between items-center ">
        <a href="/">
          {" "}
          <img src={headerLogo} alt="Logo" width={100} height={40} />
        </a>
        <ul className=" flex justify-between gap-10 max-lg:hidden text-slate-500">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}> {link.label} </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
