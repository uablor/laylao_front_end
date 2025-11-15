import { i18n } from "@/common/i18n.config";

export const UserRule = {
  first_name: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("first_name"),
      trigger: "blur",
    },
  ],
  last_name: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("last_name"),
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: i18n.global.t("email_not_empty"),
      trigger: "blur",
    },
    { type: "email", message: i18n.global.t("email_invalid"), trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("password"),
      trigger: "blur",
    },
    { min: 6, message: i18n.global.t("password_min_length"), trigger: "blur" },
  ],
  
};
