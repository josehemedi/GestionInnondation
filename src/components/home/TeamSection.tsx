import { Users } from "lucide-react";

const teams = [
  {
    name: "Groupe 1 - Développement",
    members: ["Ben", "José", "Paola"],
    mission: "Programmation ESP32 & Site Web",
    color: "border-primary/50",
  },
  {
    name: "Groupe 2 - Assemblage",
    members: ["Michel", "Bernard"],
    mission: "Câblage & Intégration matérielle",
    color: "border-info/50",
  },
  {
    name: "Groupe 3 - Théorie IoT",
    members: ["Ian", "Benjy", "Kratos", "Sedou"],
    mission: "Architecture & Sécurité IoT",
    color: "border-success/50",
  },
  {
    name: "Groupe 4 - Tests",
    members: ["Vinny", "Divine", "Hervé"],
    mission: "Validation & Démonstration",
    color: "border-warning/50",
  },
];

const leaders = [
  { name: "JAIRO", role: "Architecture IoT & Coordination" },
  { name: "Michel", role: "Coordination Matérielle" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Notre Équipe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            UPC/L4 FASI - <span className="text-gradient">IoT 2025-2026</span>
          </h2>
          <p className="text-muted-foreground">
            Une équipe pluridisciplinaire travaillant ensemble pour créer un système IoT innovant.
          </p>
        </div>

        {/* Leaders */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {leaders.map((leader) => (
            <div key={leader.name} className="glass-card p-6 text-center glow-primary">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{leader.name}</h3>
              <p className="text-muted-foreground text-sm">{leader.role}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">
                Chef de Projet
              </span>
            </div>
          ))}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, index) => (
            <div
              key={team.name}
              className={`glass-card p-6 border-l-4 ${team.color} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-semibold mb-3">{team.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{team.mission}</p>
              <div className="flex flex-wrap gap-2">
                {team.members.map((member) => (
                  <span
                    key={member}
                    className="px-2 py-1 text-xs bg-secondary rounded-md"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
