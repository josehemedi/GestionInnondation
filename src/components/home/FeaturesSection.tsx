import { Waves, CloudRain, Bell, Wifi, Cpu, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "Mesure du niveau d'eau",
    description: "Capteur ultrasonique JSN-SR04T pour mesurer précisément le niveau d'eau en temps réel.",
    color: "text-water",
    bgColor: "bg-water/10",
  },
  {
    icon: CloudRain,
    title: "Détection de pluie",
    description: "Capteur IP68 étanche pour mesurer l'intensité des précipitations.",
    color: "text-rain",
    bgColor: "bg-rain/10",
  },
  {
    icon: Bell,
    title: "Alertes automatiques",
    description: "Système d'alerte intelligent avec seuils personnalisables et notifications en temps réel.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Wifi,
    title: "Transmission Wi-Fi",
    description: "Envoi des données via HTTP/JSON ou MQTT pour un suivi à distance.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Cpu,
    title: "ESP32 Intégré",
    description: "Microcontrôleur puissant avec Wi-Fi intégré pour le traitement des données.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Tableau de bord",
    description: "Interface web moderne pour visualiser les données et l'historique.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Un système complet de <span className="text-gradient">protection</span>
          </h2>
          <p className="text-muted-foreground">
            Notre système IoT combine des capteurs de haute précision avec une interface web intuitive pour une surveillance optimale.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
