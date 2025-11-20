import { i18n } from "@/common/i18n.config";

export const BookingRule = {
  customer_name: [
    { required: true, message: i18n.global.t("not_empty") + i18n.global.t("customer"), trigger: "blur" },
    { min: 2, message: i18n.global.t("too_short"), trigger: "blur" },
  ],
  customer_tel: [
    { required: true, message: i18n.global.t("not_empty") + i18n.global.t("tel"), trigger: "blur" },
    { pattern: /^[0-9]{8,15}$/, message: i18n.global.t("invalid_phone_number"), trigger: "blur" },
  ],
};
