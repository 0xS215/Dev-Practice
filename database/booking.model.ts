import { Schema, model, type CallbackWithoutResultAndOptionalError, type Document, type Model, Types } from 'mongoose';
import { Event } from './event.model';

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'] },
  },
  { timestamps: true, strict: true },
);

// Validate that the referenced event exists before the booking is saved.
bookingSchema.pre('save', async function (this: IBooking & Document, next: CallbackWithoutResultAndOptionalError) {
  const event = await Event.findById(this.eventId);

  if (!event) {
    return next(new Error('Referenced event does not exist'));
  }

  next();
});

export const Booking: Model<IBooking> = model<IBooking>('Booking', bookingSchema);
