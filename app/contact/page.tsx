'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Building2,
  Users,
  MessageSquare,
} from 'lucide-react';
import { getContactInfo as getSanityContactInfo, subscribeToSanityQuery } from '@/lib/sanity';

// Contact Info type (from Sanity)
interface ContactInfo {
  departmentName: string;
  institutionName: string;
  address: string;
  email: string;
  phone?: string;
  officeHours?: string;
  mapEmbedUrl?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    website?: string;
  };
}

// Submit contact form to Vercel API route
async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string;
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Form field type
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Form errors type
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  // Contact info state
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // Honeypot field - hidden from humans, bots tend to fill it.
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch contact info from Sanity
  useEffect(() => {
    async function fetchContactInfo(showLoading = false) {
      if (showLoading) setLoading(true);
      try {
        const data = await getSanityContactInfo();
        if (data) {
          setContactInfo(data);
        } else {
          throw new Error('No contact info found');
        }
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
        // Use fallback data
        setContactInfo({
          departmentName: 'Civil & Infrastructure Engineering Society (CIES)',
          institutionName: 'Indian Institute of Technology Jodhpur',
          address: 'NH 62, Nagaur Road, Karwar, Jodhpur, Rajasthan 342030, India',
          email: 'cies@iitj.ac.in',
          phone: '+91-291-280-1234',
          officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
          mapEmbedUrl: undefined,
          socialLinks: {
            linkedin: 'https://www.linkedin.com/company/107540236',
            instagram: 'https://www.instagram.com/cies_iitj',
            twitter: undefined,
            youtube: undefined,
            facebook: undefined,
            website: 'https://iitj.ac.in',
          },
        });
      } finally {
        if (showLoading) setLoading(false);
      }
    }

    void fetchContactInfo(true);
    return subscribeToSanityQuery(
      '*[_type == "contactInfo"]',
      () => void fetchContactInfo(),
      error => console.warn('Sanity contact live updates are unavailable:', error)
    );
  }, []);

  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim(),
        website: honeypot,
      });

      setSubmitStatus('success');
      setSubmitMessage(response.message || 'Your message has been sent successfully!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-600 dark:text-gray-400">Loading contact information...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 transition-colors duration-300 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg">
        {/* Blueprint Grid Background */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3d91_1px,transparent_1px),linear-gradient(to_bottom,#0b3d91_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Hero Section */}
        <section className="relative px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-32">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Get in Touch
              </div>

              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Contact{' '}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Us
                </span>
              </h1>

              <p className="mx-auto max-w-2xl px-2 text-sm text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
                Have questions about our society, events, or want to collaborate? We&apos;d love to
                hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 lg:grid-cols-5 lg:gap-12"
            >
              {/* Contact Information - Left Side */}
              <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 lg:col-span-2">
                {/* Info Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50 sm:rounded-3xl sm:p-8">
                  <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:items-center">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 text-white sm:rounded-2xl sm:p-3">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-white sm:text-xl">
                        {contactInfo?.departmentName}
                      </h2>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                        {contactInfo?.institutionName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    {/* Address */}
                    <div className="group flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 sm:rounded-xl sm:p-2.5">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 sm:mb-1 sm:text-sm">
                          Address
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
                          {contactInfo?.address}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-900/20 dark:text-green-400 sm:rounded-xl sm:p-2.5">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 sm:mb-1 sm:text-sm">
                          Email
                        </p>
                        <a
                          href={`mailto:${contactInfo?.email}`}
                          className="break-all text-sm text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 sm:text-base"
                        >
                          {contactInfo?.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50 sm:rounded-3xl sm:p-8">
                  <div className="mb-4 flex items-center gap-2.5 sm:mb-6 sm:gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 p-2.5 text-white sm:rounded-2xl sm:p-3">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                      Connect With Us
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a
                      href="https://www.linkedin.com/company/107540236"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[#0077b5]/10 px-4 py-2.5 text-[#0077b5] transition-all duration-300 hover:bg-[#0077b5] hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="font-medium">LinkedIn</span>
                    </a>

                    <a
                      href={
                        contactInfo?.socialLinks?.instagram ||
                        'https://www.instagram.com/cies_iitj/'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2.5 text-pink-600 transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:text-white"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="font-medium">Instagram</span>
                    </a>

                    {contactInfo?.socialLinks?.twitter && (
                      <a
                        href={contactInfo.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-[#1DA1F2]/10 px-4 py-2.5 text-[#1DA1F2] transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="font-medium">Twitter</span>
                      </a>
                    )}

                    {contactInfo?.socialLinks?.youtube && (
                      <a
                        href={contactInfo.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-[#FF0000]/10 px-4 py-2.5 text-[#FF0000] transition-all duration-300 hover:bg-[#FF0000] hover:text-white"
                      >
                        <Youtube className="h-5 w-5" />
                        <span className="font-medium">YouTube</span>
                      </a>
                    )}

                    {contactInfo?.socialLinks?.facebook && (
                      <a
                        href={contactInfo.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-[#1877F2]/10 px-4 py-2.5 text-[#1877F2] transition-all duration-300 hover:bg-[#1877F2] hover:text-white"
                      >
                        <Facebook className="h-5 w-5" />
                        <span className="font-medium">Facebook</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Map Embed */}
                {contactInfo?.mapEmbedUrl ? (
                  <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50">
                    <iframe
                      src={contactInfo.mapEmbedUrl}
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    />
                  </div>
                ) : (
                  <div className="rounded-3xl bg-teal-700 p-8 text-white shadow-xl">
                    <div className="mb-4 flex items-center gap-3">
                      <MapPin className="h-8 w-8" />
                      <h3 className="text-xl font-bold">Find Us</h3>
                    </div>
                    <p className="mb-4 text-teal-50">
                      Located at the Department of Civil and Infrastructure Engineering, IIT Jodhpur
                      campus in the heart of Rajasthan.
                    </p>
                    <a
                      href="https://maps.app.goo.gl/A1Y2Yn4UXAfJ8VqS9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/90 px-4 py-2 text-white transition-colors hover:bg-emerald-600"
                    >
                      <MapPin className="h-4 w-4" />
                      View on Google Maps
                    </a>
                  </div>
                )}
              </motion.div>

              {/* Contact Form - Right Side */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50 md:p-10">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 text-white">
                      <Send className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Send us a Message
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fill out the form and we&apos;ll get back to you soon
                      </p>
                    </div>
                  </div>

                  {/* Success/Error Message */}
                  <AnimatePresence>
                    {submitStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-6 flex items-center gap-3 rounded-2xl p-4 ${
                          submitStatus === 'success'
                            ? 'border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300'
                        }`}
                      >
                        {submitStatus === 'success' ? (
                          <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        )}
                        <p>{submitMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users, used to catch bots */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={e => setHoneypot(e.target.value)}
                      />
                    </div>
                    {/* Name & Email Row */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className={`w-full rounded-xl border px-4 py-3 ${
                            formErrors.name
                              ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                              : 'border-gray-200 focus:ring-blue-500 dark:border-slate-600'
                          } bg-gray-50 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 dark:bg-slate-700/50 dark:text-white dark:placeholder-gray-500`}
                        />
                        {formErrors.name && (
                          <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full rounded-xl border px-4 py-3 ${
                            formErrors.email
                              ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                              : 'border-gray-200 focus:ring-blue-500 dark:border-slate-600'
                          } bg-gray-50 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 dark:bg-slate-700/50 dark:text-white dark:placeholder-gray-500`}
                        />
                        {formErrors.email && (
                          <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Phone Number <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white dark:placeholder-gray-500"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Subject <span className="text-gray-400">(optional)</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
                        >
                          <option value="">Select a subject...</option>
                          <option value="general">General Inquiry</option>
                          <option value="events">Events & Activities</option>
                          <option value="membership">Membership</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className={`w-full rounded-xl border px-4 py-3 ${
                          formErrors.message
                            ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                            : 'border-gray-200 focus:ring-blue-500 dark:border-slate-600'
                        } resize-none bg-gray-50 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 dark:bg-slate-700/50 dark:text-white dark:placeholder-gray-500`}
                      />
                      {formErrors.message && (
                        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 ${
                        isSubmitting
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'bg-indigo-700 shadow-lg shadow-indigo-700/25 hover:bg-indigo-800 hover:shadow-indigo-700/40'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
