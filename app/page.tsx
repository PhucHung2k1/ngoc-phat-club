import Link from "next/link";
import { Button } from "antd";
export default function Home() {
  return (
    <div className="container">
      <header
        style={{ textAlign: "center", marginBottom: "3rem", color: "white" }}
      >
        <h1
          style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}
        >
          🎯 NgocPhatClub
        </h1>
        <p style={{ fontSize: "1.25rem", opacity: 0.9 }}>
          Trang quản lý nội bộ
        </p>
      </header>
      <Button type="primary" className="bg-blue-600">
        Nút AntD
      </Button>
      <div className="grid">
        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>
            👥 Thành viên
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Quản lý danh sách thành viên CLB
          </p>
          <Link href="/members">
            <button className="btn">Xem danh sách</button>
          </Link>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>
            📅 Lịch thi đấu
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Xem và quản lý lịch thi đấu
          </p>
          <Link href="/schedule">
            <button className="btn">Xem lịch</button>
          </Link>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>
            🏆 Giải đấu
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Thông tin các giải đấu
          </p>
          <Link href="/tournaments">
            <button className="btn">Xem giải đấu</button>
          </Link>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>
            📊 Thống kê
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Thống kê hoạt động CLB
          </p>
          <Link href="/stats">
            <button className="btn">Xem thống kê</button>
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>ℹ️ Thông tin</h2>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          Đây là trang web nội bộ được xây dựng bằng Next.js, hỗ trợ cả Frontend
          và Backend. Bạn có thể mở rộng thêm các tính năng như quản lý thành
          viên, đăng ký thi đấu, và nhiều tính năng khác thông qua API Routes
          của Next.js.
        </p>
      </div>
    </div>
  );
}
