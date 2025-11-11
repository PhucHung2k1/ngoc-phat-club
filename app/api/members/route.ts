import { NextResponse } from 'next/server'

// Mock data - trong thực tế bạn sẽ kết nối với database
const members = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0901234567', joinDate: '2024-01-15' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0901234568', joinDate: '2024-02-20' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', phone: '0901234569', joinDate: '2024-03-10' },
]

export async function GET() {
  return NextResponse.json({ members })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newMember = {
      id: members.length + 1,
      ...body,
      joinDate: new Date().toISOString().split('T')[0],
    }
    members.push(newMember)
    return NextResponse.json({ member: newMember, message: 'Thêm thành viên thành công' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi thêm thành viên' }, { status: 500 })
  }
}

