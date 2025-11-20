import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  DashboardOutlined,
} from "@ant-design/icons-vue";
import type { Component } from "vue";

export const menuItems: {
  label: string;
  icon: Component;
  to: string | { name: string };
  children?: {
    label: string;
    to: string | { name: string };
  }[];
}[] = [
  {
    label: "dashboard",
    icon: DashboardOutlined,
    to: { name: "admin-hotel.dashboard" },
  },
  {
    label: "hotel",
    icon: HomeOutlined,
    to: { name: "admin-hotel.detailhotel" },
  },
  {
    label: "user",
    icon: UserOutlined,
    to: { name: "admin-hotel.user" },
  },
  {
    label: "list booking",
    icon: BookOutlined,
    to: { name: "admin-hotel.booking" },
  },
];
