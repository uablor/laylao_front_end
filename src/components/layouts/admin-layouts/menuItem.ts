import {
  DashboardOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  // ProfileOutlined,
  UserOutlined,
  BookOutlined,
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
    to: { name: "admin.dashboard" },
  },
  // {
  //   label: "searchroom",
  //   icon: AppstoreOutlined,
  //   to: { name: "admin.room" },
  // },
  {
    label: "user",
    icon: UserOutlined,
    to: { name: "admin.user" },
  },
  {
    label: "hotel",
    icon: HomeOutlined,
    to: { name: "admin.hotel" },
  },
  {
    label: "zone",
    icon: EnvironmentOutlined,
    to: { name: "admin.zone" },
  },

  // {
  //   label: "roomtype",
  //   icon: ProfileOutlined,
  //   to: { name: "admin.roomtype" },
  // },

  {
    label: "list booking",
    icon: BookOutlined,
    to: { name: "admin.booking" },
  },
  // {
  //   label: "detail booking",
  //   icon: AlignRightOutlined,
  //   to: { name: "admin.detailbooking" },
  // },
];
