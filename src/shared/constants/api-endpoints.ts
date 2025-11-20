const USER_BASE = "users" as const;
const ROLE_BASE = "roles" as const;
const ROOM_TYPE_BASE = "room-types" as const;
const ZONE_BASE = "zones" as const;
const HOTEL_BASE = "hotels" as const;
const ROOM_BASE = "rooms" as const;
const AUTH_BASE = "auth" as const;
const SEARCH_BASE = "search" as const;
const BOOKING_BASE = "bookings" as const;
const BOOKING_DETAIL_BASE = "bookings-details" as const;
const REPORT_BASE = "report" as const;
const IMAGE_BASE = "images" as const;

const AUTH_ENDPOINTS = {
  BASE: AUTH_BASE,
  LOGIN: `${AUTH_BASE}/login`,
  LOGOUT: `${AUTH_BASE}/logout`,
  ME: `${AUTH_BASE}/authme`,
} as const;

const USER_ENDPOINTS = {
  BASE: USER_BASE,
  PAGINATION: `${USER_BASE}/paginated`,
  RESET_PASSWORD: `${USER_BASE}/reset-password`,
} as const;

const ROLE_ENDPOINTS = {
  BASE: ROLE_BASE,
  PAGINATION: `${ROLE_BASE}/paginated`,
} as const;

const ROOM_TYPE_ENDPOINTS = {
  BASE: ROOM_TYPE_BASE,
  PAGINATION: `${ROOM_TYPE_BASE}/paginated`,
} as const;

const ZONE_ENDPOINTS = {
  BASE: ZONE_BASE,
  PAGINATION: `${ZONE_BASE}/paginated`,
} as const;

const HOTEL_ENDPOINTS = {
  BASE: HOTEL_BASE,
  PAGINATION: `${HOTEL_BASE}/paginated`,
  DETAILS: `${HOTEL_BASE}/hotel-details`,
  UPLOAD_LOGO: `${HOTEL_BASE}/upload-images`,
} as const;

const ROOM_ENDPOINTS = {
  BASE: ROOM_BASE,
  PAGINATION: `${ROOM_BASE}/paginated`,
  STATUS: `${ROOM_BASE}/status`,
} as const;

const SEARCH_ENDPOINTS = {
  BASE: SEARCH_BASE,
  ALL: `${SEARCH_BASE}/all`,
} as const;

const BOOKING_ENDPOINTS = {
  BASE: BOOKING_BASE,
  PAGINATION: `${BOOKING_BASE}/paginated`,
  REPORT: `${BOOKING_BASE}/report-booking-by-date`,
  BOOKING_DETAILS: {
    BASE: BOOKING_DETAIL_BASE,
    PAGINATION: `${BOOKING_DETAIL_BASE}/paginated`,
  },
} as const;

const REPORT_ENDPOINTS = {
  BASE: REPORT_BASE,
  ALL: `${REPORT_BASE}/reportall`,
} as const;

const IMAGE_ENDPOINTS = {
  BASE: IMAGE_BASE,
  UPLOAD_LOGO: `${IMAGE_BASE}/upload-logo`,
} as const;

export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  HOTEL: HOTEL_ENDPOINTS,
  ZONE: ZONE_ENDPOINTS,
  USER: USER_ENDPOINTS,
  ROLE: ROLE_ENDPOINTS,
  ROOM: ROOM_ENDPOINTS,
  ROOM_TYPE: ROOM_TYPE_ENDPOINTS,
  SEARCH: SEARCH_ENDPOINTS,
  BOOKING: BOOKING_ENDPOINTS,
  REPORT: REPORT_ENDPOINTS,
  IMAGE: IMAGE_ENDPOINTS,
  DISTRICT: "district",
  PROVINCE: "PROVINCE",
} as const;
