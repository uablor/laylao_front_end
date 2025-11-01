import { i18n } from "@/common/i18n.config";

export const RoomTypeRule = {
  name: [
    { required: true, message: i18n.global.t("not_empty")+ i18n.global.t("name"), trigger: "blur" },
  ]
};
