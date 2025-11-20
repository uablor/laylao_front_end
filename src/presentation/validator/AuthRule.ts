
import { i18n } from "@/common/i18n.config"; 

export const AuthRule = {
  email: [
    { required: true, message: i18n.global.t("email_not_empty"), trigger: "blur" },
    { type: "email", message: i18n.global.t("validate_email_failed"), trigger: "blur" },
  ],
  password: [
    { required: true, message: i18n.global.t("password_not_empty"), trigger: "blur" },
    { min: 6, message: i18n.global.t("password_min_length"), trigger: "blur" },

  ],
};
