import mongoose, { Document, Schema } from 'mongoose';


const SettingSchema: Schema = new Schema({
  key: {
    type: String,
    required: [true, 'Key number is required'],
    unique:  [true, 'Key number is unique'],
  },
  value: {
    type: String,
    required: [true, 'value is required'],
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Tự động thêm timestamps
});

// Tạo model từ schema
const Setting = mongoose.model('Setting', SettingSchema);

export default Setting;
