// Test file để kiểm tra xuất PDF tiếng Việt
import { exportEmployeeReport } from './pdfExport.js';

// Sample data để test
const sampleEmployee = {
  fullName: 'Nguyễn Văn Anh',
  position: 'Lập trình viên Frontend',
  department: 'Phòng Công nghệ Thông tin',
  email: 'nguyen.van.anh@company.com'
};

const sampleAssessments = [
  {
    cycleLabel: 'Đánh giá quý 4/2024',
    period: 'Q4 2024',
    overall: 4.2,
    comment: 'Nhân viên có khả năng làm việc tốt, hoàn thành công việc đúng hạn và chất lượng cao.',
    nextGoals: 'Nâng cao kỹ năng React và học thêm về TypeScript để phát triển sự nghiệp.'
  },
  {
    cycleLabel: 'Đánh giá quý 3/2024',
    period: 'Q3 2024',
    overall: 3.8,
    comment: 'Cần cải thiện kỹ năng giao tiếp và làm việc nhóm.',
    nextGoals: 'Tham gia nhiều dự án nhóm hơn và học các kỹ năng mềm.'
  }
];

// Function để test xuất PDF
export const testVietnamesePDF = async () => {
  try {
    console.log('Đang test xuất PDF tiếng Việt...');
    await exportEmployeeReport(sampleEmployee, sampleAssessments);
    console.log('✅ Test thành công! PDF đã được tạo với định dạng tiếng Việt.');
    return true;
  } catch (error) {
    console.error('❌ Test thất bại:', error);
    return false;
  }
};