import mongoose, { Document, Schema } from 'mongoose';

export interface OtpDocument extends Document {
  phone: string;
  otp: string;
}

const OtpSchema: Schema<OtpDocument> = new Schema({
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
  otp: {
    type: String,
    required: [true, 'OTP is required'],
  }
});

// Tạo model từ schema
const Otp = mongoose.model<OtpDocument>('Otp', OtpSchema);

export default Otp;