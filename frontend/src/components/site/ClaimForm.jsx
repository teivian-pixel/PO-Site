import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, Check, MailCheck } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ClaimForm = () => {
  const [form, setForm] = useState({ name: "", email: "", referral_code: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setForm((f) => ({ ...f, referral_code: ref.toUpperCase() }));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/claim-spot`, {
        name: form.name.trim(),
        email: form.email.trim(),
        referral_code: form.referral_code.trim() || null,
      });
      setResult(data);
      toast.success("You're on the list. Check your email.");
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="joinbeta"
      data-testid="claim-form-wrapper"
      className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 backdrop-blur"
    >
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            data-testid="claim-form"
          >
            <div className="flex items-center gap-2 text-echo-cyan text-xs uppercase tracking-[0.25em]">
              <ShieldCheck size={16} /> Early Access
            </div>
            <h3 className="font-display text-2xl text-white tracking-tight">
              Claim Your Spot
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Name
              </label>
              <input
                data-testid="claim-name-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-white font-mono text-sm focus:border-echo-cyan focus:ring-1 focus:ring-echo-cyan outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Email
              </label>
              <input
                data-testid="claim-email-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-white font-mono text-sm focus:border-echo-cyan focus:ring-1 focus:ring-echo-cyan outline-none transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Referral Code <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                data-testid="claim-referral-input"
                value={form.referral_code}
                onChange={(e) =>
                  setForm({ ...form, referral_code: e.target.value })
                }
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-white font-mono text-sm uppercase focus:border-echo-cyan focus:ring-1 focus:ring-echo-cyan outline-none transition-colors"
                placeholder="ECHO-XXX-XXXXXX"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="claim-submit-btn"
              className="w-full flex items-center justify-center gap-2 rounded-md bg-echo-cyan px-6 py-3.5 font-semibold text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-shadow disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Securing…
                </>
              ) : (
                "Claim My Spot"
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            data-testid="claim-success"
            className="text-center space-y-5"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-echo-cyan/10 border border-echo-cyan/40 flex items-center justify-center text-echo-cyan">
              <MailCheck size={26} />
            </div>
            <h3 className="font-display text-2xl text-white">You're in.</h3>
            <p className="text-sm text-zinc-400">
              Welcome to Echo Early Access, {result.name.split(" ")[0]}. Check
              your inbox — we've sent your personal invite link and referral
              code. Share it to move up the list and unlock founder perks.
            </p>
            <div className="rounded-md border border-zinc-800 bg-zinc-900 p-4 text-left">
              <div className="flex items-center gap-2 text-zinc-300 text-sm">
                <Check size={16} className="text-echo-cyan" /> Spot reserved for{" "}
                {result.email}
              </div>
              {form.referral_code && (
                <div className="flex items-center gap-2 text-zinc-300 text-sm mt-2">
                  <Check size={16} className="text-echo-cyan" /> Referral{" "}
                  {form.referral_code} applied
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
