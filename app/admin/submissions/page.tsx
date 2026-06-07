'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, Calendar, Eye, Reply, ArrowLeft, RefreshCw, Lock, LogOut } from 'lucide-react'
import Link from 'next/link'

interface Submission {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  ip_address: string | null
  is_read: boolean
  is_replied: boolean
  created_at: string
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setAuthError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        const data = await res.json().catch(() => ({}))
        setAuthError(data.message || 'Incorrect password')
      }
    } catch {
      setAuthError('Unable to reach the server. Please try again.')
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' })
    } finally {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    // Verify session against the server (HTTP-only cookie, not client state)
    fetch('/api/admin/login')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(Boolean(data?.authenticated)))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setAuthChecked(true))
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions()
    }
  }, [isAuthenticated])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/contact?limit=100')
      const data = await res.json()
      
      if (data.success) {
        setSubmissions(data.data || [])
      } else {
        setError(data.message || 'Failed to fetch submissions')
      }
    } catch (err) {
      setError('Failed to connect to server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: true }),
      })
      
      if (res.ok) {
        setSubmissions(prev => 
          prev.map(s => s.id === id ? { ...s, is_read: true } : s)
        )
      }
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }

  const markAsReplied = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_replied: true }),
      })
      
      if (res.ok) {
        setSubmissions(prev => 
          prev.map(s => s.id === id ? { ...s, is_replied: true } : s)
        )
      }
    } catch (err) {
      console.error('Failed to mark as replied:', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  // Avoid flashing the login screen before the server session is verified
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 mt-2">CIES IIT Jodhpur</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
              />
            </div>
            
            {authError && (
              <p className="text-red-400 text-sm">{authError}</p>
            )}
            
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors"
            >
              {loggingIn ? 'Signing in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Contact Submissions</h1>
                <p className="text-sm text-gray-500">CIES IIT Jodhpur Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchSubmissions}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Total Submissions</p>
            <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Unread</p>
            <p className="text-2xl font-bold text-blue-600">
              {submissions.filter(s => !s.is_read).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Pending Reply</p>
            <p className="text-2xl font-bold text-orange-600">
              {submissions.filter(s => !s.is_replied).length}
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}

        {/* Submissions List */}
        {!loading && submissions.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No submissions yet</p>
          </div>
        )}

        {!loading && submissions.length > 0 && (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className={`bg-white rounded-xl p-5 shadow-sm border transition-all ${
                  !submission.is_read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{submission.name}</h3>
                      {!submission.is_read && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                          New
                        </span>
                      )}
                      {submission.is_replied && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                          Replied
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <a href={`mailto:${submission.email}`} className="flex items-center gap-1 hover:text-blue-600">
                        <Mail className="w-4 h-4" />
                        {submission.email}
                      </a>
                      {submission.phone && (
                        <a href={`tel:${submission.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                          <Phone className="w-4 h-4" />
                          {submission.phone}
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(submission.created_at)}
                      </span>
                    </div>
                    
                    {submission.subject && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Subject:</span> {submission.subject}
                      </p>
                    )}
                    
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                      {submission.message}
                    </p>
                  </div>
                  
                  <div className="flex lg:flex-col gap-2">
                    {!submission.is_read && (
                      <button
                        onClick={() => markAsRead(submission.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Mark Read
                      </button>
                    )}
                    {!submission.is_replied && (
                      <button
                        onClick={() => markAsReplied(submission.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Reply className="w-4 h-4" />
                        Mark Replied
                      </button>
                    )}
                    <a
                      href={`mailto:${submission.email}?subject=Re: ${submission.subject || 'Your inquiry to CIES IIT Jodhpur'}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

