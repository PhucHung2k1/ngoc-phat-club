import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export default function StatsPage() {
  return (
    <AppContainer>
      <PageHeader title="📊 Thống kê" backHref="/" />

      <SurfaceCard>
        <h2 className="mb-6 text-indigo-500">Thống kê hoạt động</h2>
        <p className="text-slate-600">Tính năng đang được phát triển...</p>
      </SurfaceCard>
    </AppContainer>
  );
}
