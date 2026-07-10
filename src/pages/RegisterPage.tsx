import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

const RegisterPage = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card rounded-lg border border-border shadow-lg p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="Parmar Auto House" className="h-14 w-14 mx-auto mb-3" />
          <h1 className="font-display font-bold text-2xl">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join Parmar Auto House</p>
        </div>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
            <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" className="w-full py-3 rounded-md bg-secondary text-secondary-foreground font-semibold hover:bg-secondary-hover transition-colors">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
