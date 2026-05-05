"use client";

import React from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="card-standard !p-6 md:!p-8 shadow-[var(--shadow-card-md)]">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="input-label">Full Name</label>
          <input
            type="text"
            className="input-standard !h-14 !px-6 font-medium"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="input-label">Email Address</label>
          <input
            type="email"
            className="input-standard !h-14 !px-6 font-medium"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="input-label">Subject</label>
          <div className="relative">
            <select className="input-standard !h-14 !px-6 font-medium appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 24px center', backgroundSize: '16px' }}>
              <option>Calculator Bug / Feedback</option>
              <option>Data Correction</option>
              <option>Legal Content Question</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="input-label">Message</label>
          <textarea
            rows={5}
            className="input-standard !h-auto min-h-[140px] !py-4 !px-6 font-medium resize-none"
            placeholder="How can we help you today?"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary !h-14 !px-10 !rounded-xl w-full md:w-auto shadow-lg"
        >
          Send Message <Send size={18} />
        </button>
      </form>
    </div>
  );
}
