import mongoose, { Document, Schema } from 'mongoose';


const UserAdminSchema: Schema = new Schema({
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (v: string) {
        return /^0[35789]\d{8}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid phone number!`,
    },
  },
  UserAdmin: {
    type: String,
    required: [true, 'UserAdmin is required'],
  },
  expired_at:   {
    type: Date,
    required: [true, 'UserAdmin is required'],
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Tự động thêm timestamps
});

// Tạo model từ schema
const UserAdmin = mongoose.model('UserAdmin', UserAdminSchema);

export default UserAdmin;
