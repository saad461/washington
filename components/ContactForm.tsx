"use client";

import React from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="card card-elevated !p-6 md:!p-8">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label>Full Name</label>
          <input
            type="text"
            className="input"
            placeholder="Jane Doe"
          />
        </div>
        <div className="field">
          <label>Email Address</label>
          <input
            type="email"
            className="input"
            placeholder="jane@example.com"
          />
        </div>
        <div className="field">
          <label>Subject</label>
          <select className="input select">
            <option>Calculator Bug / Feedback</option>
            <option>Data Correction</option>
            <option>Legal Content Question</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Message</label>
          <textarea
            rows={5}
            className="input !h-auto py-4 resize-none"
            placeholder="How can we help you today?"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg w-full md:w-fit px-8"
        >
          Send Message <Send size={18} />
        </button>
      </form>
    </div>
  );
}
