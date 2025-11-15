import { IBooking } from "@/domain/entities/booking.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const BookingCol = new BaseColumns<IBooking>([
  {
    dataIndex: "booking_code",
  },
  {
    dataIndex: "customer_name",
  },

  {
    dataIndex: "customer_tel",
  },
  {
    dataIndex: "hotel",
  },

  {
    dataIndex: "brokerage_fees",
  },
  {
    dataIndex: "revenue",
  },
  {
    dataIndex: "price_total",
  },

  {
    dataIndex: "booking_date",
  },
  // {
  //   dataIndex: "payment_status",
  //   width: 130,
  // },

  {
    dataIndex: "created_by",
  },
  {
    dataIndex: "updated_by",
  },
]);

export const searchableColumns = BookingCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined &&
    ["customer_name", "customer_tel", "created_by", "updated_by"].includes(
      col.dataIndex as string
    )
);
