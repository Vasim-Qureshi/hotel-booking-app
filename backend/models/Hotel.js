const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], required: true },
  rooms: { type: Number, required: true }
}, { timestamps: true });
export const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);
