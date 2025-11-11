import { Button } from "antd";
import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { GradientLinkButton } from "@/components/ui/GradientLinkButton";

const FEATURES = [
  {
    title: "👥 Thành viên",
    description: "Quản lý danh sách thành viên CLB",
    href: "/members",
    cta: "Xem danh sách",
  },
  {
    title: "📅 Lịch thi đấu",
    description: "Xem và quản lý lịch thi đấu",
    href: "/schedule",
    cta: "Xem lịch",
  },
  {
    title: "🏆 Giải đấu",
    description: "Thông tin các giải đấu",
    href: "/tournaments",
    cta: "Xem giải đấu",
  },
  {
    title: "📊 Thống kê",
    description: "Thống kê hoạt động CLB",
    href: "/stats",
    cta: "Xem thống kê",
  },
] as const;

export default function Home() {
  return (
    <AppContainer>
      <PageHeader
        title="🎯 NgocPhatClub"
        subtitle="Trang quản lý nội bộ"
        size="xl"
      />
      <Button type="primary" className="bg-blue-600">
        Nút AntD
      </Button>
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <SurfaceCard key={feature.title}>
            <h2 className="mb-4 text-xl font-semibold text-indigo-500">
              {feature.title}
            </h2>
            <p className="mb-6 text-slate-600">{feature.description}</p>
            <GradientLinkButton href={feature.href}>
              {feature.cta}
            </GradientLinkButton>
          </SurfaceCard>
        ))}
      </div>

      <SurfaceCard className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-indigo-500">
          ℹ️ Thông tin
        </h2>
        <p className="leading-relaxed text-slate-600">
          Đây là trang web nội bộ được xây dựng bằng Next.js, hỗ trợ cả Frontend
          và Backend. Bạn có thể mở rộng thêm các tính năng như quản lý thành
          viên, đăng ký thi đấu, và nhiều tính năng khác thông qua API Routes
          của Next.js.
        </p>
      </SurfaceCard>
    </AppContainer>
  );
}
