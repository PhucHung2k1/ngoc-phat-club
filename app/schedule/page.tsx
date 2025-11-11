'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Schedule {
  id: number
  date: string
  time: string
  venue: string
  players: string[]
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/schedule')
      .then(res => res.json())
      .then(data => {
        setSchedules(data.schedules || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching schedule:', err)
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
          📅 Lịch thi đấu
        </h1>
        <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>
          ← Về trang chủ
        </Link>
      </header>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>Lịch thi đấu sắp tới</h2>
        {schedules.length === 0 ? (
          <p style={{ color: '#666' }}>Chưa có lịch thi đấu nào</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
                  📅 {schedule.date} - {schedule.time}
                </h3>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>📍 Địa điểm: {schedule.venue}</p>
                <p style={{ color: '#666' }}>
                  👥 Người chơi: {schedule.players.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

