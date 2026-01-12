import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Button } from "@/components/ui/button";
import { Droplets, Shield, Activity, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDashboardClick = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Connexion requise",
      text: "Vous devez d'abord vous connecter pour accéder au dashboard. Voulez-vous vous connecter maintenant ?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Se connecter",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) navigate("/login");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Animated Water Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 water-wave opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl animate-float" />
      <div className="absolute top-1/3 right-20 w-32 h-32 rounded-full bg-water/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-accent/10 blur-2xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm text-muted-foreground">Système IoT en temps réel</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Système Intelligent
            <br />
            <span className="text-gradient">d'Anti-Inondation</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Surveillez en temps réel le niveau d'eau et de pluie, anticipez les risques d'inondation grâce à notre technologie IoT basée sur l'ESP32.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="/dashboard" onClick={handleDashboardClick}>
              <Button variant="hero" size="xl" className="group">
                Accéder au Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link to="/#features">
              <Button variant="glass" size="xl">
                Découvrir le système
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-6 group hover:border-primary/50 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Droplets className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">JSN-SR04T</h3>
              <p className="text-muted-foreground text-sm">Capteur niveau d'eau</p>
            </div>

            <div className="glass-card p-6 group hover:border-info/50 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors">
                  <Activity className="h-8 w-8 text-info" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">IP68</h3>
              <p className="text-muted-foreground text-sm">Capteur de pluie étanche</p>
            </div>

            <div className="glass-card p-6 group hover:border-success/50 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                  <Shield className="h-8 w-8 text-success" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">ESP32</h3>
              <p className="text-muted-foreground text-sm">Microcontrôleur Wi-Fi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
