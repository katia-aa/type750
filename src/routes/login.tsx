import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // Redirect to a different page or show a success message
    }
  };
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <p className="mb-6">Log in to continue your journey of mental clarity.</p>
      <form onSubmit={handleLogin} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
