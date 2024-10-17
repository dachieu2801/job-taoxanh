import bcrypt from 'bcryptjs';

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

export const verifyImei = (imei: string) => {
    if (imei.length === 15) {
        // Kiểm tra tính hợp lệ của IMEI bằng thuật toán Luhn
        let sum = 0;
        for (let i = 0; i < 14; i++) {
          let num = parseInt(imei[i], 10);
          if (i % 2 !== 0) {
            num *= 2;
            if (num > 9) {
              num = Math.floor(num / 10) + (num % 10);
            }
          }
          sum += num;
        }
        // Nếu tổng cộng lại không chia hết cho 10, IMEI không hợp lệ
        if (!((sum + parseInt(imei[14], 10)) % 10 !== 0)) {
          return true;
        }
    }
    return false;
}



export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const isMatch: boolean = await bcrypt.compare(plainPassword, hashedPassword); 
  return isMatch; 
}