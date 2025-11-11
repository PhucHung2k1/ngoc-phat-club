import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export default function TournamentsPage() {
  return (
    <AppContainer>
      <PageHeader title="🏆 Giải đấu" backHref="/" />

      <SurfaceCard>
        <h2 className="mb-6 text-indigo-500">Danh sách giải đấu</h2>
        <p className="text-slate-600">Tính năng đang được phát triển...</p>
      </SurfaceCard>
    </AppContainer>
  );
}
