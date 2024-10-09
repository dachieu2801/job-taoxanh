import mongoose, { Document, Schema } from 'mongoose';

const ServiceSchema: Schema = new Schema({
  name: {
    type: String,
    required:  [true, 'Name is required'],
  },
  price: {
    type: Number,
    required:  [true, 'Price is required'],
  },
  code: {
    type: String,
    required:  [true, 'Code is required'],
    unique:  [true, 'Code is unique'], 
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
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Tự động thêm timestamps
});

// Tạo model từ schema
const Service = mongoose.model('Service', ServiceSchema);

export default Service;
