"use client";

import { useEffect, useMemo, useState } from "react";
import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Tag,
  message,
  Select,
  Upload,
} from "antd";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import type { UploadFile } from "antd";
import { Row, Col } from "antd";

type Member = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  createdAt: string;
  imageUrl?: string | null;
  dupr?: number | null;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form] = Form.useForm<Member>();
  const [roles, setRoles] = useState<
    Array<{ id: string; name: string; slug: string }>
  >([]);
  const imageUrlWatch = Form.useWatch("imageUrl", form);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data.members ?? []);
    } catch (e) {
      message.error("Không tải được danh sách");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    fetch("/api/roles")
      .then((r) => r.json())
      .then((d) => setRoles(d.roles ?? []))
      .catch(() => {});
  }, []);

  const onCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const onEdit = (record: Member) => {
    setEditing(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone ?? undefined,
      role: record.role,
    } as any);
    setOpen(true);
  };

  const onDelete = async (record: Member) => {
    Modal.confirm({
      title: `Xóa ${record.name}?`,
      centered: true,
      onOk: async () => {
        try {
          const res = await fetch(`/api/members/${record.id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("delete failed");
          message.success("Đã xóa");
          await load();
        } catch {
          message.error("Xóa thất bại");
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const res = await fetch(
        editing ? `/api/members/${editing.id}` : "/api/members",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) throw new Error("save failed");
      message.success(editing ? "Đã cập nhật" : "Đã tạo");
      setOpen(false);
      setEditing(null);
      form.resetFields();
      await load();
    } catch (e) {
      // validation error already shown by antd
      if (e instanceof Error && e.message === "save failed") {
        message.error("Lưu thất bại");
      }
    } finally {
      setSaving(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        render: (_: any, r: Member) => (
          <div className="flex items-center gap-2">
            <Avatar size="small" src={r.imageUrl || undefined}>
              {r.name?.[0]}
            </Avatar>
            <span>{r.name}</span>
          </div>
        ),
      },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "SĐT", dataIndex: "phone", key: "phone" },
      {
        title: "DUPR",
        dataIndex: "dupr",
        key: "dupr",
        render: (v: number | null | undefined) => v ?? "-",
        responsive: ["sm"],
      },
      {
        title: "Quyền",
        dataIndex: "role",
        key: "role",
        render: (v: string) => (
          <Tag color={v === "admin" ? "magenta" : "blue"}>{v}</Tag>
        ),
        responsive: ["sm"],
      },
      {
        title: "Hành động",
        key: "action",
        render: (_: any, record: Member) => (
          <div className="flex gap-2">
            <Button size="small" onClick={() => onEdit(record)}>
              Sửa
            </Button>
            <Button size="small" danger onClick={() => onDelete(record)}>
              Xóa
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const uploadImage = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    const fd = new FormData();
    fd.append("file", file as any);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error("Upload failed");
      form.setFieldValue("imageUrl", data.url);
      setFileList([
        {
          uid: String(Date.now()),
          name: "image",
          status: "done",
          url: data.url,
        },
      ]);
      onSuccess?.(data, new XMLHttpRequest());
      message.success("Đã tải ảnh");
    } catch (e) {
      onError?.(e as any);
      message.error("Tải ảnh thất bại");
    }
  };

  // Đồng bộ preview khi mở form sửa hoặc khi người dùng dán URL
  useEffect(() => {
    const url = imageUrlWatch as unknown as string | undefined;
    if (url) {
      setFileList([
        {
          uid: "existing",
          name: "image",
          status: "done",
          url,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [imageUrlWatch, open]);

  return (
    <AppContainer>
      <PageHeader title="👥 Danh sách thành viên" backHref="/" />

      <SurfaceCard>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-indigo-500 text-lg font-semibold">
            Thành viên CLB
          </h2>
          <Button
            type="primary"
            onClick={onCreate}
            className="self-start sm:self-auto"
          >
            Thêm thành viên
          </Button>
        </div>
        <Table<Member>
          rowKey="id"
          loading={loading}
          columns={columns as any}
          dataSource={members}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          size="middle"
          scroll={{ x: true }}
        />
      </SurfaceCard>

      <Modal
        title={editing ? "Cập nhật thành viên" : "Thêm thành viên"}
        open={open}
        onOk={handleSubmit}
        confirmLoading={saving}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        okText={editing ? "Cập nhật" : "Tạo"}
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: "Nhập tên" }]}
              >
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, type: "email", message: "Email hợp lệ" },
                ]}
              >
                <Input placeholder="a@example.com" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="SĐT" name="phone">
                <Input placeholder="090..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Quyền" name="roleId">
                <Select
                  placeholder="Chọn quyền"
                  options={roles.map((r) => ({ label: r.name, value: r.id }))}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              {/* giữ giá trị trong form nhưng không hiển thị ô URL */}
              <Form.Item name="imageUrl" hidden>
                <Input />
              </Form.Item>
              <Form.Item label="Ảnh đại diện">
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  customRequest={uploadImage}
                  onChange={({ fileList }) => setFileList(fileList)}
                  onPreview={(file) => {
                    const url = file.url || (file.response as any)?.url;
                    if (url) window.open(url, "_blank");
                  }}
                >
                  {fileList.length >= 1 ? null : "+ Upload"}
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Điểm DUPR" name="dupr">
                <InputNumber
                  className="w-full"
                  min={0}
                  max={10}
                  step={0.01}
                  placeholder="vd: 3.50"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </AppContainer>
  );
}
