import { useState } from "react";
import axios from "axios";
import { Loader2, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TOPICS = [
  "1:1 Consultation",
  "Echo App",
  "Speaking & Media Enquiries",
  "General Enquiry",
];

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General Enquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. Our team will respond promptly.");
      setForm({ name: "", email: "", topic: "General Enquiry", message: "" });
    } catch {
      toast.error("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-obsidian text-white py-24 md:py-28 border-t border-zinc-900 echo-scope"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-14">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-echo-cyan mb-4">
            Let's connect
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tighter leading-tight">
            We're based in Melbourne, AU.
          </h2>
          <p className="mt-5 text-zinc-400 max-w-md leading-relaxed">
            Reach out for expert guidance on the Primal Methodology or the Echo
            platform. Our team will respond promptly to your inquiry.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-zinc-300">
              <MapPin size={18} className="text-echo-cyan" />
              {COMPANY.location}
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <Mail size={18} className="text-echo-cyan" />
              hello@primal-origins.com
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Name
              </label>
              <input
                data-testid="contact-name-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-white text-sm focus:border-echo-cyan focus:ring-1 focus:ring-echo-cyan outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Email
              </label>
              <input
                data-testid="contact-email-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-white text-sm focus:border-echo-cyan focus:ring-1 focus:ring-echo-cyan outline-none"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Topic
            </label>
            <Select
              value={form.topic}
              onValueChange={(v) => setForm({ ...form, topic: v })}
            >
              <SelectTrigger
                data-testid="contact-topic-select"
                className="w-full bg-black border-zinc-800 text-white h-12"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Message
            </label>
            <textarea
              data-testid="contact-message-input"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-black border border-zinc-800 rounded-md px-4 py-3 text-white text-sm focus:border-echo-cyan focus:ring-1 focus:ring-echo-cyan outline-none resize-none"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="contact-submit-btn"
            className="w-full flex items-center justify-center gap-2 rounded-md bg-echo-cyan px-6 py-3.5 font-semibold text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-shadow disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending…
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
