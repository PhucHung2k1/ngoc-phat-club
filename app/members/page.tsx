'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Member {
  id: number
  name: string
  email: string
  phone: string
  joinDate: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => {
        setMembers(data.members || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching members:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          👥 Danh sách thành viên
        </h1>
        <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>
          ← Về trang chủ
        </Link>
      </header>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>Thành viên CLB</h2>
        {members.length === 0 ? (
          <p style={{ color: '#666' }}>Chưa có thành viên nào</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {members.map((member) => (
              <div
                key={member.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{member.name}</h3>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>📧 {member.email}</p>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>📱 {member.phone}</p>
                <p style={{ color: '#666' }}>📅 Tham gia: {member.joinDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

