"use client";

import React from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl shadow-indigo-900/5">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
          <input 
            type="text" 
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <input 
            type="email" 
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Subject</label>
          <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium appearance-none">
            <option>Calculator Bug / Feedback</option>
            <option>Data Correction</option>
            <option>Legal Content Question</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Message</label>
          <textarea 
            rows={4}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium resize-none"
            placeholder="How can we help you today?"
          />
        </div>
        <button 
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          Send Message <Send size={18} />
        </button>
      </form>
    </div>
  );
}
