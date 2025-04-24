import { Schema, model } from 'mongoose';
const HotelSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], required: true },
  rooms: { type: Number, required: true }
}, { timestamps: true });
export default model('Hotel', HotelSchema);