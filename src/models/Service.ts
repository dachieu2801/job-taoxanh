import mongoose, { Document, Schema } from 'mongoose';

const ServiceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  api: {
    type: String,
  },
  api_key: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

// Tạo model từ schema
const Service = mongoose.model('Service', ServiceSchema);

export default Service;
