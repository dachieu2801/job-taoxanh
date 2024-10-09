import mongoose, { Document, Schema } from 'mongoose';

// Tạo schema cho user
const CartSchema: Schema = new Schema({
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^0[35789]\d{8}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid phone number!`,
    },
  },
  imei: {
    type: String,
    required: true,
  },
  services_code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Tạo model từ schema
const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
