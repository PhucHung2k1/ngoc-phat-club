"use client";

import { useEffect, useState } from "react";
import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

interface Schedule {
  id: number;
  date: string;
  time: string;
  venue: string;
  players: string[];
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data.schedules || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schedule:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AppContainer>
        <SurfaceCard className="p-6">
          <p>Đang tải...</p>
        </SurfaceCard>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <PageHeader title="📅 Lịch thi đấu" backHref="/" />

      <SurfaceCard>
        <h2 className="mb-6 text-indigo-500">Lịch thi đấu sắp tới</h2>
        {schedules.length === 0 ? (
          <p className="text-slate-600">Chưa có lịch thi đấu nào</p>
        ) : (
          <div className="grid gap-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="p-6 border border-slate-200 rounded-lg bg-slate-50"
              >
                <h3 className="mb-2 text-slate-800">
                  📅 {schedule.date} - {schedule.time}
                </h3>
                <p className="text-slate-600 mb-2">
                  📍 Địa điểm: {schedule.venue}
                </p>
                <p className="text-slate-600">
                  👥 Người chơi: {schedule.players.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </SurfaceCard>
    </AppContainer>
  );
}
