'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
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
  MessageSquare
} from 'lucide-react';
import { getContactInfo as getSanityContactInfo } from '@/lib/sanity';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch contact info from Sanity
  useEffect(() => {
    async function fetchContactInfo() {
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
        setLoading(false);
      }
    }
    
    fetchContactInfo();
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading contact information...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        {/* Blueprint Grid Background */}
        <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3d91_1px,transparent_1px),linear-gradient(to_bottom,#0b3d91_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Get in Touch
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Contact{' '}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Us
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
                Have questions about our society, events, or want to collaborate? 
                We&apos;d love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative pb-16 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-5 gap-6 lg:gap-12"
            >
              {/* Contact Information - Left Side */}
              <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Info Card */}
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700/50">
                  <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex-shrink-0">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {contactInfo?.departmentName}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {contactInfo?.institutionName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    {/* Address */}
                    <div className="flex items-start gap-3 sm:gap-4 group">
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex-shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">Address</p>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{contactInfo?.address}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3 sm:gap-4 group">
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex-shrink-0">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">Email</p>
                        <a 
                          href={`mailto:${contactInfo?.email}`}
                          className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                        >
                          {contactInfo?.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    {contactInfo?.phone && (
                      <div className="flex items-start gap-3 sm:gap-4 group">
                        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex-shrink-0">
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">Phone</p>
                          <a 
                            href={`tel:${contactInfo.phone}`}
                            className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Office Hours */}
                    {contactInfo?.officeHours && (
                      <div className="flex items-start gap-3 sm:gap-4 group">
                        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex-shrink-0">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">Office Hours</p>
                          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{contactInfo.officeHours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Connect With Us
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a
                      href="https://www.linkedin.com/company/107540236"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                    
                    <a
                      href={contactInfo?.socialLinks?.instagram || 'https://www.instagram.com/cies_iitj/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-600 hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="font-medium">Instagram</span>
                    </a>
                    
                    {contactInfo?.socialLinks?.twitter && (
                      <a
                        href={contactInfo.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
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
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300"
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
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                      >
                        <Facebook className="h-5 w-5" />
                        <span className="font-medium">Facebook</span>
                      </a>
                    )}
                    
                  </div>
                </div>

                {/* Map Embed */}
                {contactInfo?.mapEmbedUrl ? (
                  <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-700/50">
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
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="h-8 w-8" />
                      <h3 className="text-xl font-bold">Find Us</h3>
                    </div>
                    <p className="text-blue-100 mb-4">
                      Located at the Department of Civil and Infrastructure Engineering, IIT Jodhpur campus in the heart of Rajasthan.
                    </p>
                    <a
                      href="https://maps.app.goo.gl/A1Y2Yn4UXAfJ8VqS9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/90 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      View on Google Maps
                    </a>
                  </div>
                )}
              </motion.div>

              {/* Contact Form - Right Side */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
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
                        className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
                          submitStatus === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
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
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 rounded-xl border ${
                            formErrors.name
                              ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                              : 'border-gray-200 dark:border-slate-600 focus:ring-blue-500'
                          } bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        />
                        {formErrors.name && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full px-4 py-3 rounded-xl border ${
                            formErrors.email
                              ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                              : 'border-gray-200 dark:border-slate-600 focus:ring-blue-500'
                          } bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        />
                        {formErrors.email && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number <span className="text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject <span className="text-gray-400">(optional)</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className={`w-full px-4 py-3 rounded-xl border ${
                          formErrors.message
                            ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                            : 'border-gray-200 dark:border-slate-600 focus:ring-blue-500'
                        } bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none`}
                      />
                      {formErrors.message && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
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
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
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

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      By submitting this form, you agree to our{' '}
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Privacy Policy
                      </a>
                    </p>
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

