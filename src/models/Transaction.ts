import mongoose, { Document, Schema, FilterQuery } from 'mongoose';
export interface TransactionDTO extends Document {
  phone: string;
  imei: string;
  services_code: string;
  request?: string;
  response_payment?: string;
  hash_transaction: any;
  status: string;
  message?: String;
  status_payment: string;
  response_user?: string;
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

export interface fillterInterface {
  startDate?: string;
  endDate?: string;
  status?: "success" | "failed" | "new";
  status_payment?: "paid" | "unpaid";
  imei?: string;
  phone?: string;
  services_code?: string;
  hash_transaction?: string;
  sortByDate?: 'asc' | 'desc';
  page?: number;
  limit?: number;
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
    unique: true
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
const Transaction = mongoose.model<TransactionDTO>('Transaction', TransactionSchema);

export default Transaction;

export const TransactionRepository = {
  create: async (data: any) => {
    const transaction = new Transaction(data);
    await transaction.save();
    return transaction;
  },
  filter: async (filters: fillterInterface) => {
    console.log('filters', filters)
    const query: FilterQuery<TransactionDTO> = {};

    // Filter by date range
    if (filters.startDate || filters.endDate) {
      query.created_at = {};
      if (filters.startDate) {
        query.created_at.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.created_at.$lte = new Date(filters.endDate);
      }
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.status_payment) {
      query.status_payment = filters.status_payment;
    }

    if (filters.hash_transaction) {
      query.hash_transaction = filters.hash_transaction;
    }

    if (filters.imei) {
      query.imei = filters.imei;
    }

    if (filters.phone) {
      query.phone = filters.phone;
    }

    if (filters.services_code) {
      query.services_code = filters.services_code;
    }
    const sort: { created_at?: 1 | -1 } = {};
    if (filters.sortByDate) {
      sort.created_at = filters.sortByDate === 'asc' ? 1 : -1;
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const totalRecords = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort(sort)
      .skip(skip) 
      .limit(limit);

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      transactions,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        perPage: limit
      }
    };
  }
};