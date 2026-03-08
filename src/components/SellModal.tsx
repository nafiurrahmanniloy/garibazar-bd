"use client";

import { useEffect, useState } from "react";

const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

type FormState = {
  name: string;
  phone: string;
  carModel: string;
  year: string;
  price: string;
  location: string;
  message: string;
};

export default function SellModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", carModel: "", year: "", price: "", location: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 bg-black/[0.03] border border-black/[0.08] rounded-lg text-[var(--text-primary)] text-sm outline-none focus:border-[var(--accent)] focus:bg-black/[0.05] transition-all placeholder:text-black/25";
  const labelClass = "block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5";

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--bg-primary)] border border-black/[0.08] rounded-3xl w-full max-w-[540px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-black/[0.06]">
          <div>
            <h2 className="text-2xl font-extrabold">Sell Your Car</h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Free listing · Published in 24 hours</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-black/[0.05] hover:bg-black/[0.1] rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {submitted ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold mb-2">Listing Submitted!</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-2 leading-relaxed">
                Our team will contact you within 24 hours to verify your listing and publish it for thousands of buyers to see.
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-8">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              <button
                onClick={onClose}
                className="px-10 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-sm transition-all hover:shadow-[0_8px_30px_var(--accent-glow)]"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input required className={inputClass} placeholder="Rahman Ali" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input required className={inputClass} placeholder="01700-000000" value={form.phone} onChange={set("phone")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Car Model</label>
                  <input required className={inputClass} placeholder="Toyota Allion 2018" value={form.carModel} onChange={set("carModel")} />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input required className={inputClass} placeholder="2018" value={form.year} onChange={set("year")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Asking Price (৳)</label>
                  <input required className={inputClass} placeholder="e.g. 28,50,000" value={form.price} onChange={set("price")} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-black/[0.08] rounded-lg text-[var(--text-primary)] text-sm outline-none focus:border-[var(--accent)] transition-all appearance-none"
                    value={form.location}
                    onChange={set("location")}
                  >
                    <option value="">Select Division</option>
                    {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Additional Details</label>
                <textarea
                  className={inputClass}
                  placeholder="Mileage, condition, import papers, modifications..."
                  rows={3}
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-semibold text-sm transition-all hover:shadow-[0_8px_30px_var(--accent-glow)] mt-2"
              >
                Submit Listing — Free
              </button>
              <p className="text-center text-xs text-[var(--text-muted)] pb-2">
                We&apos;ll verify and publish within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
