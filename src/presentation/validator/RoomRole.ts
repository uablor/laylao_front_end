import { i18n } from "@/common/i18n.config";

export const RoomRule = {
  name: [
    {
      required: true,
      message: `${i18n.global.t("not_empty")} ${i18n.global.t("name")}`,
      trigger: "blur",
    },
  ],
  room_number: [
    {
      required: true,
      message:  i18n.global.t("not_empty") + i18n.global.t("room_number"),
      trigger: "blur",
    },
  ],
  price: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("price"),
      trigger: "blur",
    },
    {
      type: "number",
      min: 2,
      message: i18n.global.t("validate_number_failed"),
      trigger: "blur",
    },
  ],
  room_type_id: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("room_type"),
      trigger: "change",
    },
  ],
  brokerage_fees: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("brokerage_fees"),
    },
    {
      type: "number",
      min: 1,
      message: i18n.global.t("validate_number_failed"),
    },
  ],
  floor: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("floor"),
      trigger: "change",
    },
    {
      type: "number",
      min: 1,
      message: i18n.global.t("validate_number_failed"),
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("description"),
      trigger: "blur",
    },
  ],
  room_amenities: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("room_amenities"),
      trigger: "blur",
    },
  ],
};
