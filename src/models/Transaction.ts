import mongoose, { Document, Schema } from 'mongoose';

export interface TransactionType extends Document {
  phone: string;
  imei: string;
  services_code: string;
  request: string;
  response_payment: string;
  hash_transaction: string;
  status: string;
  message: String;
  status_payment: string;
  response_user: string;
}

export const statusPayment = {
  paid: 'paid',
  unpaid: 'unpaid',
}

export const status = {
  success: 'success',
  failed: "failed",
  new: "new",
}

// Tạo schema cho user
const TransactionSchema: Schema = new Schema({
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    validate: {
      validator: function (v: string) {
        return /^0[35789]\d{8}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid phone number!`,
    },
  },
  imei: {
    type: String,
    required: [true, 'IMEI is required'],
  },
  services_code: {
    type: String,
    required: [true, 'Service code is required'],
  },
  request: {
    type: String,
  },
  response_payment: {
    type: String,
  },
  hash_transaction: {
    type: String,
    required: true,
  },
  response_user: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['success', 'failed', 'new'],
      message: 'Status must be either active, inactive or new'
    }
  },

  status_payment: {
    type: String,
    required: true,
    enum: {
      values: ['paid', 'unpaid'],
      message: 'Status must be either paid, unpaid'
    }
  },
  message: {
    type: String,
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Tự động thêm timestamps
});

// Tạo model từ schema
const Transaction = mongoose.model<TransactionType>('Transaction', TransactionSchema);

export default Transaction;
