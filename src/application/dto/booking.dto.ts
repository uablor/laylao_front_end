import { Booking, IBooking } from "@/domain/entities/booking.entity";

export interface CreateBookingCredentialsDto extends Booking {}
export interface UpdateBookingCredentialsDto extends Pick<IBooking, 'payment_status'> {}

