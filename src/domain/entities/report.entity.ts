export interface DashboardData {
  summary: Summary;
  monthlyStats: MonthlyStat[];
}

export interface Summary {
  totalZones: number;
  totalHotels: number;
  room: RoomSummary;
  booking: number;
  bookingDetail: number;
  totalRoomTypes: number;
}

export interface RoomSummary {
  totalRooms: number;
  totalAvailableRooms: number | string;
  totalOccupiedRooms: number | string;
  totalReservedRooms: number;
}

export interface MonthlyStat {
  month: number;
  minPrice: number;
  maxPrice: number;
  totalPrice: number;
  minBrokerage: number;
  maxBrokerage: number;
  totalBrokerage: number;
  totalAll: number;
}
