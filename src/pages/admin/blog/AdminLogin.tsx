import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signIn, resetPassword } from "@/lib/services/authService";
import { useAuth } from "@/lib/contexts/AuthContext";
import '@/styles/preview-charte.css';

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

type FormData = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user && isAdmin) { navigate("/admin-blog/articles"); }
  }, [user, isAdmin, navigate]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn({ email: data.email, password: data.password });
      if (error) throw error;
      toast({ title: "Connexion réussie", description: "Redirection en cours..." });
      setTimeout(() => navigate("/admin-blog/articles"), 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Vérifiez vos identifiants et réessayez.";
      toast({ title: "Erreur de connexion", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      toast({ title: "Erreur", description: "Veuillez saisir une adresse email valide", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await resetPassword(resetEmail);
      if (error) throw error;
      setIsResetSent(true);
      toast({ title: "Email de réinitialisation envoyé", description: "Vérifiez votre boîte de réception et suivez les instructions." });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite lors de l'envoi de l'email de réinitialisation.";
      toast({ title: "Erreur lors de la réinitialisation", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(43,75,160,.2)',
    background: 'rgba(255,255,255,.9)',
    fontSize: '14px',
    outline: 'none',
    color: '#1C2B4A',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Header />

      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: '#F0ECE3' }} className="cz">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full-login">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={2} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={7} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
          </defs>
        </svg>

        {/* Fond décoratif léger */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <g filter="url(#riso-full-login)">
              <path d="M 0 0 L 400 0 C 480 80, 460 180, 380 240 C 280 320, 100 300, 20 220 C -40 160, -20 60, 0 0 Z" fill="#F2A12E" opacity="0.35" />
            </g>
            <g filter="url(#riso-full-login)" style={{ mixBlendMode: 'multiply' }}>
              <path d="M 1440 900 L 1060 900 C 980 820, 980 720, 1060 660 C 1160 580, 1340 600, 1440 680 Z" fill="#2B4BA0" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Carte de connexion */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>
          <div style={{ background: 'rgba(240,236,227,.9)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '40px 36px', boxShadow: '0 24px 60px rgba(28,43,74,.1)', border: '1px solid rgba(255,255,255,.6)' }}>
            {/* Header de la carte */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, marginBottom: '12px' }}>
                <span style={{ width: '24px', height: '1px', background: '#2B4BA0', display: 'inline-block' }} />
                Zone administration
              </div>
              <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '28px', fontWeight: 300, color: '#1C2B4A', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                Connexion
              </h1>
              <p style={{ color: '#8A9BB8', fontSize: '13px', marginTop: '6px', lineHeight: 1.5 }}>
                Connectez-vous pour gérer votre blog
              </p>
            </div>

            {!showResetForm ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
                      <FormItem>
                        <FormControl>
                          <Input placeholder="votre@email.com" {...field} style={inputStyle} className="border-0 bg-transparent shadow-none focus-visible:ring-0 p-0" />
                        </FormControl>
                        <FormMessage style={{ fontSize: '12px', color: '#c0392b', marginTop: '4px' }} />
                      </FormItem>
                    </div>
                  )} />

                  <FormField control={form.control} name="password" render={({ field }) => (
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Mot de passe</label>
                      <FormItem>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} style={inputStyle} className="border-0 bg-transparent shadow-none focus-visible:ring-0 p-0" />
                        </FormControl>
                        <FormMessage style={{ fontSize: '12px', color: '#c0392b', marginTop: '4px' }} />
                      </FormItem>
                    </div>
                  )} />

                  <button type="submit" disabled={isLoading} className="btn btn--primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '4px', ...(isLoading ? { opacity: 0.6, cursor: 'wait' } : {}) }}>
                    {isLoading ? "Connexion..." : "Se connecter →"}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '4px' }}>
                    <button type="button" onClick={() => setShowResetForm(true)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#2B4BA0', textDecoration: 'underline', fontFamily: 'inherit' }}>
                      Mot de passe oublié ?
                    </button>
                  </div>
                </form>
              </Form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!isResetSent ? (
                  <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label htmlFor="reset-email" style={{ fontSize: '11px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
                      <input id="reset-email" type="email" placeholder="votre@email.com"
                        value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required style={inputStyle} />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn btn--primary"
                      style={{ width: '100%', justifyContent: 'center', ...(isLoading ? { opacity: 0.6, cursor: 'wait' } : {}) }}>
                      {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe →"}
                    </button>
                    <div style={{ textAlign: 'center' }}>
                      <button type="button" onClick={() => setShowResetForm(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#2B4BA0', textDecoration: 'underline', fontFamily: 'inherit' }}>
                        Retour à la connexion
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(43,75,160,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B4BA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p style={{ color: '#2B4BA0', fontSize: '14px', fontWeight: 500 }}>
                      Email envoyé à <strong>{resetEmail}</strong>
                    </p>
                    <p style={{ color: '#8A9BB8', fontSize: '13px' }}>Vérifiez votre boîte de réception et suivez les instructions.</p>
                    <button onClick={() => setShowResetForm(false)} className="btn btn--ghost"
                      style={{ margin: '0 auto' }}>
                      Retour à la connexion
                    </button>
                  </div>
                )}
              </div>
            )}

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#8A9BB8', marginTop: '20px', borderTop: '1px solid rgba(28,43,74,.08)', paddingTop: '16px' }}>
              Zone réservée aux administrateurs du blog.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
