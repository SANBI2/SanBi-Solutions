"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Facebook, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { useSignIn } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        const redirectUrl = searchParams.get("redirect_url") || "/";
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "An error occurred");
    }
  };

  const handleSocialLogin = async (provider: "oauth_facebook" | "oauth_github" | "oauth_linkedin") => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/auth/sso-callback",
        redirectUrlComplete: searchParams.get("redirect_url") || "/"
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-xl bg-card shadow-2xl"
      >
        <h1 className="border-b p-4 text-center text-xl font-semibold">Login to SANBI Solutions</h1>
        <div className="p-8">
          <div className="mb-6 flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={() => handleSocialLogin("oauth_facebook")}>
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleSocialLogin("oauth_github")}>
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleSocialLogin("oauth_linkedin")}>
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
          <p className="mb-6 text-center text-sm text-muted-foreground">or use your email account</p>
          {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full" type="submit" disabled={!isLoaded}>
              LOGIN
            </Button>
          </form>
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

