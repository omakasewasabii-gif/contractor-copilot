"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/Toast";

const demoAccounts = [
  { role: "District Admin", email: "admin@episd.org", pw: "admin2026", icon: "👨‍💼" },
  { role: "Campus Staff", email: "staff@belairhs.episd.org", pw: "staff2026", icon: "🍽️" },
  { role: "Parent Portal", email: "parent@episd.org", pw: "parent2026", icon: "👨‍👩‍👧" },
];

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDaytime, setIsDaytime] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    setIsDaytime(hour >= 6 && hour < 18);
  }, []);

  useEffect(() => {
    if (mounted) {
      const auth = sessionStorage.getItem("nutriserve_auth");
      const role = sessionStorage.getItem("nutriserve_role");
      if (auth === "true") {
        setAuthenticated(true);
        // Optionally enforce route boundaries on load
        if (role === "parent") {
          if (!pathname.startsWith("/portal")) router.push("/portal");
        } else if (role === "staff") {
          if (!["/pos", "/menus", "/inventory", "/recipes"].some(p => pathname.startsWith(p))) router.push("/pos");
        }
      }
    }
  }, [pathname, router, mounted]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email && password) {
        const isParent = email === "parent@episd.org";
        const isStaff = email.includes("staff");
        
        sessionStorage.setItem("nutriserve_auth", "true");
        sessionStorage.setItem("nutriserve_role", isParent ? "parent" : isStaff ? "staff" : "admin");
        
        setAuthenticated(true);
        
        // Trigger Demo HUD if logging in as Admin via quick-access
        if (!isParent && !isStaff) {
          window.dispatchEvent(new CustomEvent('nutriserve-demo-action', { 
            detail: { id: "01", path: "/" } 
          }));
        }
        
        if (isParent) {
          router.push("/portal");
        } else if (isStaff) {
          router.push("/pos");
        } else {
          router.push("/");
        }
      } else {
        setError("Please enter your credentials");
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = (acct: typeof demoAccounts[0]) => {
    setEmail(acct.email);
    setPassword(acct.pw);
  };

  if (authenticated) {
    if (mounted) {
      const role = sessionStorage.getItem("nutriserve_role");
      if (role === "staff" && !["/pos", "/menus", "/inventory", "/recipes"].some(p => pathname.startsWith(p))) {
        return (
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.bg, color: theme.textPri }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, border: "3px solid var(--accent)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <h3 style={{ fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase" }}>Engaging Hardware Bridge...</h3>
            </div>
          </div>
        );
      }
      if (role === "parent" && !pathname.startsWith("/portal")) {
        return (
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.bg }}>
            <div style={{ width: 32, height: 32, border: "3px solid #3b82f6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        );
      }
    }
    return <>{children}</>;
  }

  const theme = isDaytime ? {
    bg: "#f0f9ff",
    img: "url('/episd-hq.png')",
    overlay: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(240, 249, 255, 0.85) 100%)",
    grid: "rgba(0,0,0,0.1)",
    orb1: "rgba(253, 224, 71, 0.5)",
    orb2: "rgba(14, 165, 233, 0.3)",
    textPri: "#041E42",
    textSec: "#475569",
    cardBg: "rgba(255, 255, 255, 0.75)",
    cardBorder: "rgba(255, 255, 255, 0.7)",
    cardBorderTop: "rgba(255, 255, 255, 0.9)",
    inputBg: "rgba(255, 255, 255, 0.8)",
    inputBorder: "rgba(0, 0, 0, 0.1)",
    inputColor: "#0f172a",
    iconColor: "#64748b",
    btnCardBg: "rgba(255,255,255,0.6)",
    divider: "rgba(0,0,0,0.1)"
  } : {
    bg: "#020813",
    img: "url('/episd-hq.png')",
    overlay: "radial-gradient(circle at 50% 50%, rgba(10, 22, 40, 0.6) 0%, rgba(2, 8, 19, 0.95) 100%)",
    grid: "rgba(255,255,255,0.5)",
    orb1: "rgba(59, 130, 246, 0.25)",
    orb2: "rgba(234, 170, 0, 0.2)",
    textPri: "#ffffff",
    textSec: "#94a3b8",
    cardBg: "rgba(10, 22, 40, 0.6)",
    cardBorder: "rgba(255, 255, 255, 0.08)",
    cardBorderTop: "rgba(255, 255, 255, 0.15)",
    inputBg: "rgba(0, 0, 0, 0.2)",
    inputBorder: "rgba(255, 255, 255, 0.1)",
    inputColor: "#fff",
    iconColor: "#64748b",
    btnCardBg: "rgba(0,0,0,0.2)",
    divider: "rgba(255,255,255,0.1)"
  };

  if (!mounted) return <div style={{ minHeight: "100vh", backgroundColor: isDaytime ? "#f0f9ff" : "#020813" }} />;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
      backgroundImage: theme.img,
      backgroundSize: "cover",
      backgroundPosition: "center 20%",
      backgroundRepeat: "no-repeat",
      padding: "var(--space-lg)",
      position: "relative",
      overflow: "hidden",
      transition: "background-color 0.5s ease"
    }}>
      {/* Theme Toggle Switch */}
      <div style={{
        position: "absolute", top: 24, right: 32, zIndex: 100,
        display: "flex", alignItems: "center", gap: 12
      }}>
        <button 
          onClick={() => setIsDaytime(!isDaytime)}
          style={{
            background: isDaytime ? "rgba(255,255,255,0.8)" : "rgba(10, 22, 40, 0.6)",
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: "30px",
            padding: "6px 12px",
            display: "flex", alignItems: "center", gap: 8,
            cursor: "pointer", color: theme.textPri,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            boxShadow: isDaytime ? "0 4px 12px rgba(0,0,0,0.05)" : "0 4px 12px rgba(0,0,0,0.2)"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {isDaytime ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EAAA00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
          <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{isDaytime ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      {/* Animated El Paso Background */}
      <div style={{
        position: "absolute",
        top: "-10%", left: "-10%", right: "-10%", bottom: "-10%",
        backgroundImage: theme.img,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "slowPan 60s ease-in-out infinite alternate",
        zIndex: 0,
        transition: "background-image 0.8s ease"
      }} />
      
      {/* Overlay for contrast */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: theme.overlay,
        zIndex: 1,
        transition: "background 0.8s ease"
      }} />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${theme.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.grid} 1px, transparent 1px)`,
        backgroundSize: "60px 60px", pointerEvents: "none",
        maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
        zIndex: 2,
        transition: "background-image 0.8s ease"
      }} />

      {/* Animated Glowing Orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "15%", width: "40vw", height: "40vw",
        background: `radial-gradient(circle, ${theme.orb1} 0%, transparent 60%)`,
        filter: "blur(60px)", animation: "float 15s ease-in-out infinite", pointerEvents: "none", zIndex: 2,
        transition: "background 0.8s ease"
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "15%", width: "40vw", height: "40vw",
        background: `radial-gradient(circle, ${theme.orb2} 0%, transparent 60%)`,
        filter: "blur(60px)", animation: "float 20s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 2,
        transition: "background 0.8s ease"
      }} />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}>
        {/* Logo Section */}
        <div style={{ textAlign: "center", marginBottom: "32px", animation: "fadeUp 0.8s ease-out" }}>
          <div style={{
            width: 90, height: 90, borderRadius: 20, overflow: 'hidden',
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px rgba(4, 30, 66, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", position: "relative"
          }}>
            <img src="/episd-logo.png" alt="EPISD Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={{
            fontSize: "2rem", fontWeight: 800, color: theme.textPri,
            letterSpacing: "-0.03em", marginBottom: 8,
            textShadow: isDaytime ? "none" : "0 2px 10px rgba(0,0,0,0.5)",
            transition: "color 0.3s ease"
          }}>EPISD Food & Nutrition</h1>
          <div style={{
            display: "inline-block", padding: "4px 12px", borderRadius: 20,
            background: isDaytime ? "rgba(234, 170, 0, 0.15)" : "rgba(234, 170, 0, 0.1)", 
            border: isDaytime ? "1px solid rgba(234, 170, 0, 0.3)" : "1px solid rgba(234, 170, 0, 0.2)",
            backdropFilter: "blur(10px)"
          }}>
            <p style={{
              fontSize: "0.75rem", color: isDaytime ? "#B47C00" : "#EAAA00", fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase", margin: 0
            }}>EPISD Food & Nutrition Services</p>
          </div>
        </div>

        {/* Login Card */}
        <form onSubmit={handleLogin} style={{
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          borderTop: `1px solid ${theme.cardBorderTop}`,
          borderRadius: "24px",
          padding: "40px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: isDaytime ? "0 30px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.5)" : "0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.5)",
          animation: "fadeUp 1s ease-out 0.1s both",
          transition: "all 0.5s ease"
        }}>
          <h2 style={{
            fontSize: "1.25rem", fontWeight: 700, color: theme.textPri,
            marginBottom: "24px", letterSpacing: "-0.01em", transition: "color 0.3s ease"
          }}>Sign in to your account</h2>

          {error && (
            <div style={{
              padding: "12px 16px", background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "12px",
              color: "#f87171", fontSize: "0.85rem", fontWeight: 600,
              marginBottom: "24px", display: "flex", alignItems: "center", gap: 8,
              animation: "shake 0.4s ease-in-out"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: "20px", transition: "all 0.3s ease" }}>
            <label style={{
              display: "block", fontSize: "0.75rem", fontWeight: 600,
              color: theme.textSec, marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px",
              transition: "color 0.3s ease"
            }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Ex: admin@episd.org"
                style={{
                  width: "100%", fontSize: "0.95rem", padding: "14px 16px 14px 44px",
                  background: theme.inputBg, border: `1px solid ${theme.inputBorder}`,
                  borderRadius: "12px", color: theme.inputColor, outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
                  boxShadow: isDaytime ? "inset 0 2px 4px rgba(0,0,0,0.05)" : "inset 0 2px 4px rgba(0,0,0,0.2)"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#EAAA00";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 8px 20px rgba(234, 170, 0, 0.15), inset 0 2px 4px rgba(0,0,0,${isDaytime ? '0.05' : '0.2'})`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.inputBorder;
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `inset 0 2px 4px rgba(0,0,0,${isDaytime ? '0.05' : '0.2'})`;
                }}
                autoFocus
              />
              <svg style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: theme.iconColor, transition: "color 0.3s ease" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: theme.textSec, textTransform: "uppercase", letterSpacing: "1px", transition: "color 0.3s ease" }}>Password</label>
              <span style={{ color: isDaytime ? "#B47C00" : "#EAAA00", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseOver={(e) => e.currentTarget.style.filter = "brightness(1.2)"}
                onMouseOut={(e) => e.currentTarget.style.filter = "brightness(1)"}>Forgot?</span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%", fontSize: "0.95rem", padding: "14px 44px 14px 44px",
                  background: theme.inputBg, border: `1px solid ${theme.inputBorder}`,
                  borderRadius: "12px", color: theme.inputColor, outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
                  boxShadow: isDaytime ? "inset 0 2px 4px rgba(0,0,0,0.05)" : "inset 0 2px 4px rgba(0,0,0,0.2)"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#EAAA00";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 8px 20px rgba(234, 170, 0, 0.15), inset 0 2px 4px rgba(0,0,0,${isDaytime ? '0.05' : '0.2'})`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.inputBorder;
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `inset 0 2px 4px rgba(0,0,0,${isDaytime ? '0.05' : '0.2'})`;
                }}
              />
              <svg style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: theme.iconColor, transition: "color 0.3s ease" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: theme.iconColor, padding: 0, transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: "all 0.3s" }}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: "all 0.3s" }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            style={{
              width: "100%", padding: "16px", fontSize: "1rem", fontWeight: 700,
              background: "linear-gradient(135deg, #EAAA00 0%, #D49A00 100%)",
              color: "#041E42", border: "none", borderRadius: "12px", cursor: "pointer",
              boxShadow: "0 8px 20px rgba(234, 170, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", opacity: loading ? 0.8 : 1,
              transform: "translateY(0)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(234, 170, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(234, 170, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)";
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "translateY(2px)"}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{
                  width: 18, height: 18, border: "2px solid rgba(4, 30, 66, 0.2)",
                  borderTopColor: "#041E42", borderRadius: "50%",
                  animation: "spin 0.6s linear infinite", display: "inline-block"
                }} />
                Authenticating...
              </span>
            ) : "Secure Login"}
          </button>

          {/* Epic Divider */}
          <div style={{ display: "flex", alignItems: "center", margin: "24px 0", gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${theme.divider})` }} />
            <span style={{ fontSize: "0.7rem", color: theme.iconColor, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, transition: "color 0.3s ease" }}>SSO & Demo</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg, transparent, ${theme.divider})` }} />
          </div>

          <button type="button" style={{
            width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "transparent", border: `1px solid ${theme.cardBorderTop}`, borderRadius: "12px",
            color: theme.textPri, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = isDaytime ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = theme.cardBorderTop;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = theme.cardBorderTop;
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Continue with EPISD ClassLink
          </button>

          {/* Quick Access Grid */}
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {demoAccounts.slice(0, 2).map((acct) => (
               <button key={acct.role} type="button" onClick={() => fillDemo(acct)}
                 style={{
                   padding: "12px 8px", background: email === acct.email ? (isDaytime ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.15)") : theme.btnCardBg,
                   border: email === acct.email ? "1px solid rgba(59, 130, 246, 0.4)" : `1px solid ${theme.inputBorder}`,
                   borderRadius: "10px", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                   display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                   transform: email === acct.email ? "scale(1.02)" : "scale(1)"
                 }}
                 onMouseOver={(e) => {
                   e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
                   e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
                   e.currentTarget.style.boxShadow = isDaytime ? "0 4px 12px rgba(0,0,0,0.05)" : "0 8px 16px rgba(0,0,0,0.2)";
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.borderColor = email === acct.email ? "rgba(59, 130, 246, 0.4)" : theme.inputBorder;
                   e.currentTarget.style.transform = email === acct.email ? "scale(1.02)" : "scale(1)";
                   e.currentTarget.style.boxShadow = "none";
                 }}
                 onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
               >
                 <span style={{ fontSize: "1.2rem", transition: "transform 0.3s ease" }} className="icon">{acct.icon}</span>
                 <span style={{ fontSize: "0.7rem", color: theme.textPri, fontWeight: 600, transition: "color 0.3s ease" }}>{acct.role}</span>
               </button>
            ))}
            {/* The third demo button spans two columns */}
            <button type="button" onClick={() => fillDemo(demoAccounts[2])}
                 style={{
                   gridColumn: "span 2", padding: "12px 8px",
                   background: email === demoAccounts[2].email ? "rgba(234, 170, 0, 0.15)" : theme.btnCardBg,
                   border: email === demoAccounts[2].email ? "1px solid rgba(234, 170, 0, 0.4)" : `1px solid ${theme.inputBorder}`,
                   borderRadius: "10px", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                   transform: email === demoAccounts[2].email ? "scale(1.02)" : "scale(1)"
                 }}
                 onMouseOver={(e) => {
                   e.currentTarget.style.borderColor = "rgba(234, 170, 0, 0.5)";
                   e.currentTarget.style.transform = "scale(1.02) translateY(-2px)";
                   e.currentTarget.style.boxShadow = isDaytime ? "0 4px 12px rgba(0,0,0,0.05)" : "0 8px 16px rgba(0,0,0,0.2)";
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.borderColor = email === demoAccounts[2].email ? "rgba(234, 170, 0, 0.4)" : theme.inputBorder;
                   e.currentTarget.style.transform = email === demoAccounts[2].email ? "scale(1.02)" : "scale(1)";
                   e.currentTarget.style.boxShadow = "none";
                 }}
                 onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
               >
                 <span style={{ fontSize: "1.2rem", transition: "transform 0.3s ease" }} className="icon">{demoAccounts[2].icon}</span>
                 <span style={{ fontSize: "0.75rem", color: theme.textPri, fontWeight: 600, transition: "color 0.3s ease" }}>{demoAccounts[2].role} Test Drive</span>
            </button>
          </div>

          {/* Mission Critical Demo Trigger */}
          <div style={{ marginTop: "24px" }}>
            <button 
              type="button"
              onClick={() => {
                sessionStorage.setItem("nutriserve_auth", "true");
                sessionStorage.setItem("nutriserve_role", "admin");
                setAuthenticated(true);
                router.push("/");
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('nutriserve-demo-action', { 
                    detail: { id: "01", path: "/" } 
                  }));
                  window.dispatchEvent(new CustomEvent('start-demo-walkthrough'));
                }, 500);
              }}
              className="animate-pulse-gold gold-glow"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #EAAA00 0%, #FDE047 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "16px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                cursor: "pointer", color: "#041E42",
                fontWeight: 900,
                fontSize: "1rem",
                boxShadow: "0 10px 30px rgba(234, 170, 0, 0.4)",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(234, 170, 0, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(234, 170, 0, 0.4)";
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>🚀</span>
              DEMO WALKTHROUGH
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: "32px", animation: "fadeUp 1s ease-out 0.2s both",
          fontSize: "0.75rem", color: theme.textSec, fontWeight: 500, lineHeight: 1.8,
          transition: "color 0.3s ease"
        }}>
          <div>NutriServe v1.0 — Bilingual Enterprise POS & Portal</div>
          <div style={{ color: theme.iconColor, transition: "color 0.3s ease" }}>Built for El Paso ISD • El Paso, TX</div>
          <div style={{ marginTop: 12, display: "flex", gap: 16, justifyContent: "center" }}>
            <span 
              style={{ cursor: "pointer", transition: "color 0.2s" }} 
              onMouseOver={e => e.currentTarget.style.color=theme.textPri} 
              onMouseOut={e => e.currentTarget.style.color=theme.textSec}
              onClick={() => showToast("Help Desk access is restricted to authenticated sessions.")}
            >
              Help Desk
            </span>
            <span>•</span>
            <span 
              style={{ cursor: "pointer", transition: "color 0.2s" }} 
              onMouseOver={e => e.currentTarget.style.color=theme.textPri} 
              onMouseOut={e => e.currentTarget.style.color=theme.textSec}
              onClick={() => showToast("Privacy Policy provided in final RFP documentation bundle.")}
            >
              Privacy Policy
            </span>
            <span>•</span>
            <span 
              style={{ cursor: "pointer", transition: "color 0.2s" }} 
              onMouseOver={e => e.currentTarget.style.color=theme.textPri} 
              onMouseOut={e => e.currentTarget.style.color=theme.textSec}
              onClick={() => showToast("SOC2 Type II Audit Report available under NDA.")}
            >
              SOC2 Report
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slowPan {
          from { transform: scale(1) translateX(0); }
          to { transform: scale(1.1) translateX(-3%); }
        }
      `}</style>
    </div>
  );
}
