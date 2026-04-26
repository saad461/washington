"use client";

import React from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg shadow-indigo-900/5">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block label-metadata mb-2 ml-1 text-gray-500">Full Name</label>
          <input
            type="text"
            className="w-full px-6 h-14 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block label-metadata mb-2 ml-1 text-gray-500">Email Address</label>
          <input
            type="email"
            className="w-full px-6 h-14 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="block label-metadata mb-2 ml-1 text-gray-500">Subject</label>
          <div className="relative">
            <select className="w-full px-6 h-14 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium appearance-none">
              <option>Calculator Bug / Feedback</option>
              <option>Data Correction</option>
              <option>Legal Content Question</option>
              <option>Other</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block label-metadata mb-2 ml-1 text-gray-500">Message</label>
          <textarea
            rows={5}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium resize-none"
            placeholder="How can we help you today?"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-fit px-8 h-14 bg-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          Send Message <Send size={18} />
        </button>
      </form>
    </div>
  );
}
