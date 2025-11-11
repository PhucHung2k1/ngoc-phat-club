import Link from 'next/link'

export default function StatsPage() {
  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          📊 Thống kê
        </h1>
        <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>
          ← Về trang chủ
        </Link>
      </header>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>Thống kê hoạt động</h2>
        <p style={{ color: '#666' }}>Tính năng đang được phát triển...</p>
      </div>
    </div>
  )
}

