import { Schema, model, type Document, type Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeDate(value: string): string {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error('Event date must be a valid date');
  }

  return parsedDate.toISOString().slice(0, 10);
}

function normalizeTime(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);

  if (!match) {
    throw new Error('Event time must follow a supported format');
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? '0');
  const meridiem = match[3]?.toUpperCase();

  if (hours > 24 || minutes > 59) {
    throw new Error('Event time is invalid');
  }

  if (meridiem === 'PM' && hours < 12) {
    hours += 12;
  }

  if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true, minlength: 1 },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true, minlength: 1 },
    overview: { type: String, required: true, trim: true, minlength: 1 },
    image: { type: String, required: true, trim: true, minlength: 1 },
    venue: { type: String, required: true, trim: true, minlength: 1 },
    location: { type: String, required: true, trim: true, minlength: 1 },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true, minlength: 1 },
    audience: { type: String, required: true, trim: true, minlength: 1 },
    agenda: { type: [String], required: true, validate: (value: string[]) => Array.isArray(value) && value.length > 0 },
    organizer: { type: String, required: true, trim: true, minlength: 1 },
    tags: { type: [String], required: true, validate: (value: string[]) => Array.isArray(value) && value.length > 0 },
  },
  { timestamps: true, strict: true },
);

// Generate a URL-friendly slug from the title and only refresh it when the title changes.
eventSchema.pre('save', async function (this: IEvent & Document) {
  const title = this.title?.trim();

  if (!title) {
    throw new Error('Event title is required');
  }

  this.title = title;

  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(title);
  }

  const requiredFields: Array<keyof IEvent> = ['description', 'overview', 'image', 'venue', 'location', 'date', 'time', 'mode', 'audience', 'organizer'];

  for (const field of requiredFields) {
    const value = this[field];

    if (typeof value === 'string' && value.trim().length === 0) {
      throw new Error(`${String(field)} cannot be empty`);
    }
  }

  if (!Array.isArray(this.agenda) || this.agenda.length === 0) {
    throw new Error('Agenda must include at least one item');
  }

  if (!Array.isArray(this.tags) || this.tags.length === 0) {
    throw new Error('Tags must include at least one item');
  }

  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event: Model<IEvent> = model<IEvent>('Event', eventSchema);
