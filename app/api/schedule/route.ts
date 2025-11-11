import { NextResponse } from 'next/server'

// Mock data
const schedules = [
  { id: 1, date: '2024-12-20', time: '18:00', venue: 'Sân A', players: ['Nguyễn Văn A', 'Trần Thị B'] },
  { id: 2, date: '2024-12-21', time: '19:00', venue: 'Sân B', players: ['Lê Văn C', 'Phạm Thị D'] },
  { id: 3, date: '2024-12-22', time: '18:30', venue: 'Sân A', players: ['Hoàng Văn E', 'Vũ Thị F'] },
]

export async function GET() {
  return NextResponse.json({ schedules })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newSchedule = {
      id: schedules.length + 1,
      ...body,
    }
    schedules.push(newSchedule)
    return NextResponse.json({ schedule: newSchedule, message: 'Thêm lịch thi đấu thành công' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi thêm lịch thi đấu' }, { status: 500 })
  }
}

