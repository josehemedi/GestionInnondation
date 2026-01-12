import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Fonctionnalités de FloodGuard</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">1️⃣ Collecte de données en temps réel</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>Capteurs IoT :</strong> Mesure du niveau d’eau, débit, pluie, humidité du sol.
              </li>
              <li>
                <strong>Station météo intégrée :</strong> Pluviométrie, prévisions météo, alertes météo.
              </li>
              <li>
                <strong>ESP32 / Arduino :</strong> Transmission des données via Wi‑Fi, LoRa ou GSM.
              </li>
              <li>
                <strong>Acquisition GPS :</strong> Localisation exacte des points de mesure pour cartographie.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2️⃣ Surveillance et analyse intelligente</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>Analyse des tendances :</strong> Comparaison des niveaux d’eau actuels avec des historiques.
              </li>
              <li>
                <strong>Algorithmes prédictifs / Machine Learning :</strong> Prévision des risques d’inondation en
                fonction des précipitations et des niveaux des rivières.
              </li>
              <li>
                <strong>Seuils d’alerte :</strong> Définition de seuils critiques (vert, orange, rouge) pour déclencher des
                alertes.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
