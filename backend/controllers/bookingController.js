import Booking from "../models/Booking.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user hotel');
    res.json(bookings);  
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user hotel');
    res.json(booking);  
  } catch (error) {
    console.error('Error fetching booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateBooking = async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return res.status(500).json({ message: 'Internal server error' });

  }
}

export const deleteBooking = async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting booking:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }