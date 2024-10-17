import mongoose, { Document, Schema, ObjectId } from 'mongoose';

export interface UserAdminDTO extends Document {
  _id: ObjectId;
  username: string;
  password: string;
}

const UserAdminSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'UserAdmin is required'],
    unique: [true, 'UserAdmin is unique'],
  },
  password: {
    type: String,
    required: [true, 'UserAdmin is required'],
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

const UserAdmin = mongoose.model<UserAdminDTO>('UserAdmin', UserAdminSchema);

export default UserAdmin;
