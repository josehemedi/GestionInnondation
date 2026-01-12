import { Droplets, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">FloodGuard</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Système Intelligent d'Anti-Inondation basé sur l'IoT. Projet réalisé par les étudiants de l'UPC/L4 FASI dans le cadre du cours Internet of Things.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/#features" className="hover:text-primary transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>sikuemedi@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span>github.com/josehemedi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025-2026 FloodGuard IoT - UPC/L4 FASI Un doigt, une solution. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
