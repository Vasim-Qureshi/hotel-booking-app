import Hotel from "../models/Hotel.js";

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);  
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted' });  
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}