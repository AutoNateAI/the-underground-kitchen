'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { LeadType } from '@/lib/types';

interface LeadFormProps {
  type?: LeadType;
}

export default function LeadForm({ type = 'general' }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventDate: '',
    headcount: '',
    budgetRange: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const payload: any = {
        type,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
      };

      if (type === 'catering') {
        if (formData.eventDate) payload.eventDate = formData.eventDate;
        if (formData.headcount) payload.headcount = parseInt(formData.headcount);
        if (formData.budgetRange) payload.budgetRange = formData.budgetRange;
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('sent');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          eventDate: '',
          headcount: '',
          budgetRange: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        label="Name"
        required
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        name="email"
        label="Email"
        type="email"
        required
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        name="phone"
        label="Phone (optional)"
        type="tel"
        placeholder="(616) 555-0123"
        value={formData.phone}
        onChange={handleChange}
      />

      {type === 'catering' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="eventDate"
            label="Event Date"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
          />
          <Input
            name="headcount"
            label="Headcount"
            type="number"
            placeholder="50"
            value={formData.headcount}
            onChange={handleChange}
          />
          <Input
            name="budgetRange"
            label="Budget"
            placeholder="$12-18/person"
            value={formData.budgetRange}
            onChange={handleChange}
          />
        </div>
      )}

      <Textarea
        name="message"
        label="Message"
        rows={5}
        placeholder={
          type === 'catering'
            ? 'Tell us about your event...'
            : 'How can we help?'
        }
        value={formData.message}
        onChange={handleChange}
      />

      <Button type="submit" disabled={status === 'sending'} className="w-full">
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </Button>

      {status === 'sent' && (
        <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30">
          <p className="text-green-400 text-center font-medium">
            ✓ Thanks! We'll get back to you soon.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
          <p className="text-red-400 text-center">
            Something went wrong. Please try again or call us directly.
          </p>
        </div>
      )}
    </form>
  );
}




