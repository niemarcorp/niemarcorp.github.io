// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          Niemar Corp
        </Link>

        {/* Menú en desktop */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          {[
            ["Inicio", "/"],
            ["Sobre mí", "/sobre-mi"],
            ["Servicios", "/servicios"],
            ["Web", "/servicios/web"],
            ["CFD", "/servicios/cfd"],
            ["Linux", "/servicios/linux"],
            ["Tutoriales", "/servicios/tutoriales"],
            ["Portafolio", "/portafolio"],
            ["Blog", "/blog"],
            ["Contacto", "/contacto"],
          ].map(([label, path]) => (
            <li key={label}>
              <Link to={path} className="hover:text-cyan-400 transition">{label}</Link>
            </li>
          ))}
        </ul>

        {/* Botón menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 text-white px-6 pb-6 pt-4 space-y-4 text-center"
        >
          {[
            ["Inicio", "/"],
            ["Sobre mí", "/sobre-mi"],
            ["Servicios", "/servicios"],
            ["Web", "/servicios/web"],
            ["CFD", "/servicios/cfd"],
            ["Linux", "/servicios/linux"],
            ["Tutoriales", "/servicios/tutoriales"],
            ["Portafolio", "/portafolio"],
            ["Blog", "/blog"],
            ["Contacto", "/contacto"],
          ].map(([label, path]) => (
            <Link
              key={label}
              to={path}
              onClick={toggleMenu}
              className="block hover:text-cyan-400"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;

