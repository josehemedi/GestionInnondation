import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const [actif, setActif] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de connexion
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur FloodGuard Dashboard",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <Droplets className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">FloodGuard</h1>
              <p className="text-sm text-muted-foreground">Système IoT Anti-Inondation</p>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Connexion</h2>
              <p className="text-muted-foreground text-sm">
                Accédez à votre tableau de bord de surveillance
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary/50 border-border focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!showReset ? (
                <>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-muted-foreground">Se souvenir de moi</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowReset(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      Mot de passe oublié?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Entrez votre email pour recevoir les instructions de réinitialisation.</p>
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="hero"
                      className="flex-1"
                      onClick={async () => {
                        setResetLoading(true);
                        setTimeout(() => {
                          setResetLoading(false);
                          toast({ title: "Email envoyé", description: "Vérifiez votre boîte pour réinitialiser le mot de passe." });
                          setShowReset(false);
                        }, 1500);
                      }}
                      disabled={resetLoading}
                    >
                      {resetLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Envoi...
                        </>
                      ) : (
                        "Réinitialiser le mot de passe"
                      )}
                    </Button>

                    <Button type="button" variant="ghost" onClick={() => setShowReset(false)}>
                      Retour
                    </Button>
                  </div>
                </div>
              )}
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Pas encore de compte? {" "}
              <Link to="/register" className="text-primary hover:underline">
                Contactez l'administrateur
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 water-wave opacity-30" />
        
        {/* Animated circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-primary/20 animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full border border-primary/30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/2 w-32 h-32 rounded-full bg-primary/10 animate-float" />

        <div className="relative z-10 text-center max-w-md p-8">
          <div className="mb-6">
            <Droplets className="h-20 w-20 text-primary mx-auto mb-6 animate-float" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Surveillance <span className="text-gradient">Temps Réel</span>
          </h2>
          <p className="text-muted-foreground">
            Accédez aux données de vos capteurs, visualisez l'historique et recevez des alertes en cas de risque d'inondation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
