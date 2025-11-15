import { i18n } from "@/common/i18n.config";

export const HotelRule = {
  name: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("name"),
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("address"),
      trigger: "blur",
    },
    { min: 5, message: i18n.global.t("address_min_length"), trigger: "blur" },
  ],
  tel: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("tel"),
      trigger: "change",
    },
  ],
  email_hotel: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("email"),
      trigger: "blur",
    },
    {
      type: "email",
      message: i18n.global.t("validate_email_failed"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("password"),
      trigger: "blur",
    },
    { min: 6, message: i18n.global.t("password_min_length"), trigger: "blur" },
  ],
  floor: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("floor"),
      trigger: "blur",
    },
    {
      type: "number",
      min: 1,
      message: i18n.global.t("validate_number_failed"),
      trigger: "blur",
    },
  ],
  location: [
    {
      required: true,
      message: i18n.global.t("not_empty") + i18n.global.t("location"),
      trigger: "blur",
    },
  ],
  start_end: [
    {
      validator: async (_: any, value: any) => {
        const { start_time, end_time } = value || {};
        console.log(start_time, end_time)
        if (!start_time || !end_time) {
          throw new Error(
            i18n.global.t("not_empty") + i18n.global.t("time_open_close")
          );
        }
        return Promise.resolve();
      },
      trigger: "blur",
    },
  ],

  // logo: [
  //   { required: true, message: i18n.global.t("logo_not_empty"), trigger: "change" },
  // ],
};
