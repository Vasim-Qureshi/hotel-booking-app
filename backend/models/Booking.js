import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, ref: 'User', required: true 
},
  hotel: { 
    type: Schema.Types.ObjectId, ref: 'Hotel', required: true 
},
  checkIn: { 
    type: Date, required: true 
},
  checkOut: { 
    type: Date, required: true 
},
  status: { 
    type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' 
}
}, { timestamps: true });

export default model('Booking', BookingSchema);