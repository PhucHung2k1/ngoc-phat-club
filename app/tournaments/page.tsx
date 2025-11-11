import Link from 'next/link'

export default function TournamentsPage() {
  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          🏆 Giải đấu
        </h1>
        <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>
          ← Về trang chủ
        </Link>
      </header>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#667eea' }}>Danh sách giải đấu</h2>
        <p style={{ color: '#666' }}>Tính năng đang được phát triển...</p>
      </div>
    </div>
  )
}

