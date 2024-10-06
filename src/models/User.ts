import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  imei: string;
}

// Tạo schema cho user
const UserSchema: Schema = new Schema({
phone: {
    type: String,
    required: true,
  },
  imei: {
    type: String,
    required: true,
  },

});

// Tạo model từ schema
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
