import mongoose, { Document, Schema } from 'mongoose';


const PaymentMethodSchema: Schema = new Schema({
    code: {
        type: String,
        required: [true, 'code number is required'],
        unique: [true, 'code number is unique'],
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    status: {
        type: String,
        required: [true, 'paymentMethod is required'],
        enum: {
            values: ['active', 'inactive'],
            message: 'Status must be either active or inactive'
        }
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Tạo model từ schema
const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod;
