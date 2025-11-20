import type { TableColumnsType } from "ant-design-vue";
import { tI18n } from "./i18n";
import dayjs from "dayjs";
import type { BaseEntity } from "../types/index";

export const laMonths = [
  "ມັງກອນ",
  "ກຸມພາ",
  "ມີນາ",
  "ເມສາ",
  "ພຶດສະພາ",
  "ມິຖຸນາ",
  "ກໍລະກົດ",
  "ສິງຫາ",
  "ກັນຍາ",
  "ຕຸລາ",
  "ພະຈິກ",
  "ທັນວາ",
];

export function formatDayJs(date: string) {
  const day = dayjs(date);
  const weekday = ["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", "ເສົາ"][
    day.day()
  ];
  const month = laMonths[day.month()];
  return `${weekday} ${day.date()} / ${
    day.month() + 1
  } ${month} / ປີ ${day.year()}`;
}

export function formatDayJsWithTime(date: string | Date) {
  const day = dayjs(date);
  const dd = String(day.date()).padStart(2, "0");
  const mm = String(day.month() + 1).padStart(2, "0");
  const yyyy = day.year();

  const hh = String(day.hour()).padStart(2, "0");
  const min = String(day.minute()).padStart(2, "0");
  const ss = String(day.second()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
}
interface BaseColumn<T = any> {
  dataIndex: string;
  align?: "left" | "center" | "right";
  width?: number;
  fixed?: "left" | "right";
  ellipsis?: boolean;
  sorter?: boolean | ((a: T, b: T) => number);
  sortDirections?: ("ascend" | "descend")[];
}

interface BaseColumnsOptions {
  useActions?: boolean;
  useCreatedAt?: boolean;
  useUpdatedAt?: boolean;
}

export class BaseColumns<T> {
  protected columns: TableColumnsType<T> = [];

  constructor(
    initialColumns?: BaseColumn[],
    options: BaseColumnsOptions = {},
    private calcIndex?: (index: number) => number
  ) {
    const {
      useActions = true,
      useCreatedAt = true,
      useUpdatedAt = true,
    } = options;
    this.columns = [
      {
        title: tI18n("No"),
        key: "index",
        dataIndex: "index",
        align: "center",
        width: 70,
        fixed: "left",
        customRender: ({ index }) =>
          this.calcIndex ? this.calcIndex(index) : index + 1,
      },
    ];

    if (initialColumns) {
      this.columns.push(
        ...initialColumns.map((col) => ({
          key: col.dataIndex,
          dataIndex: col.dataIndex,
          title: tI18n(col.dataIndex),
          align: col.align || "left",
          width: col.width,
          fixed: col.fixed,
          ellipsis: col.ellipsis,
          sorter: col.sorter,
          sortDirections: col.sortDirections,
        }))
      );
    }

    if (useCreatedAt) {
      this.columns.push({
        title: tI18n("created_at"),
        key: "created_At",
        dataIndex: "created_At",
        align: "center",
        ellipsis: true,
        customRender: ({ record }) =>
          formatDayJsWithTime((record as BaseEntity).createdAt),
      });
    }

    if (useUpdatedAt) {
      this.columns.push({
        title: tI18n("updated_at"),
        key: "updated_At",
        dataIndex: "updated_At",
        align: "center",
        ellipsis: true,
        customRender: ({ record }) =>
          formatDayJsWithTime((record as BaseEntity).updatedAt),
      });
    }

    if (useActions) {
      this.columns.push({
        title: tI18n("actions"),
        key: "actions",
        dataIndex: "actions",
        align: "center",
        width: 160,
        fixed: "right",
      });
    }
  }

  getColumns(): TableColumnsType {
    return this.columns;
  }

  addColumn(column: BaseColumn) {
    this.columns.push({
      key: column.dataIndex,
      dataIndex: column.dataIndex,
      title: tI18n(column.dataIndex),
      align: column.align || "left",
      width: column.width,
      fixed: column.fixed,
      ellipsis: column.ellipsis,
      sorter: column.sorter,
    });
  }

  removeColumnByKey(key: string) {
    this.columns = this.columns.filter((col) => col.key !== key);
  }

  resetColumns(newColumns: TableColumnsType<T>) {
    this.columns = newColumns;
  }
}
