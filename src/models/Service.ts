import mongoose, { Document, Schema, ObjectId } from 'mongoose';

export const servicesCode =  {
  checkImei: 'check_imei',
}

export interface ServiceInterface {
  name: string;
  price: number;
  code: string;
  api?: string;
  api_key?: string;
  status: string;
}

export interface UpdateServiceInput {
  _id: ObjectId;
  name: string;
  price: number;
  api?: string;
  api_key?: string;
  status: 'active'| 'inactive';
}

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
    enum: {
      values: ['active', 'inactive'],
      message: 'Status must be either active or inactive'
  }
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Tự động thêm timestamps
});

// Tạo model từ schema
const Service = mongoose.model('Service', ServiceSchema);

export default Service;
