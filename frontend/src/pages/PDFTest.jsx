import React from 'react';
import PDFTestButton from '../components/PDFTestButton.jsx';
import { exportEmployeeReport, exportAssessmentSummary, exportCriteriaReport, exportEmployeeList, exportDetailedEmployeeList } from '../utils/pdfExport.js';

const PDFTest = () => {
  // Sample data
  const sampleEmployee = {
    fullName: 'Trần Thị Hương',
    position: 'Chuyên viên Nhân sự',
    department: 'Phòng Hành chính Nhân sự',
    email: 'tran.thi.huong@company.com'
  };

  const sampleAssessments = [
    {
      cycleLabel: 'Đánh giá năm 2024',
      period: 'Năm 2024',
      overall: 4.5,
      comment: 'Nhân viên xuất sắc, có khả năng lãnh đạo tốt và hoàn thành vượt mức các chỉ tiêu đề ra.',
      nextGoals: 'Phát triển kỹ năng quản lý dự án và đào tạo nhân viên mới trong phòng ban.'
    }
  ];

  const sampleCriteria = [
    {
      name: 'Kỹ năng chuyên môn',
      code: 'SKILL_001',
      version: '2024.1',
      weight: 3,
      department: 'Công nghệ thông tin',
      description: 'Đánh giá khả năng chuyên môn và kỹ thuật của nhân viên',
      isActive: true
    },
    {
      name: 'Tinh thần trách nhiệm',
      code: 'RESP_001', 
      version: '2024.1',
      weight: 2,
      department: 'Chung',
      description: 'Đánh giá mức độ trách nhiệm trong công việc',
      isActive: true
    }
  ];

  const sampleEmployeeList = [
    {
      _id: '1',
      username: 'nguyen.van.a',
      fullName: 'Nguyễn Văn A',
      email: 'nguyen.van.a@company.com',
      department: 'Công nghệ thông tin',
      position: 'Lập trình viên Senior'
    },
    {
      _id: '2',
      username: 'tran.thi.b',
      fullName: 'Trần Thị B',
      email: 'tran.thi.b@company.com',
      department: 'Nhân sự',
      position: 'Chuyên viên HR'
    },
    {
      _id: '3',
      username: 'le.van.c',
      fullName: 'Lê Văn C',
      email: 'le.van.c@company.com',
      department: 'Marketing',
      position: 'Marketing Manager'
    },
    {
      _id: '4',
      username: 'pham.thi.d',
      fullName: 'Phạm Thị D',
      email: 'pham.thi.d@company.com',
      department: 'Kế toán',
      position: 'Kế toán viên'
    },
    {
      _id: '5',
      username: 'hoang.van.e',
      fullName: 'Hoàng Văn E',
      email: '',
      department: '',
      position: ''
    }
  ];

  const handleTestEmployeeReport = async () => {
    try {
      await exportEmployeeReport(sampleEmployee, sampleAssessments);
      alert('✅ Báo cáo nhân viên đã được tạo!');
    } catch (error) {
      alert('❌ Lỗi: ' + error.message);
    }
  };

  const handleTestAssessmentSummary = async () => {
    try {
      const assessmentData = {
        ...sampleAssessments[0],
        employee: sampleEmployee,
        criteria: [
          { label: 'Kỹ năng chuyên môn', score: 4.5, comment: 'Rất tốt' },
          { label: 'Làm việc nhóm', score: 4.0, comment: 'Tốt' }
        ]
      };
      await exportAssessmentSummary(assessmentData);
      alert('✅ Báo cáo tổng hợp đã được tạo!');
    } catch (error) {
      alert('❌ Lỗi: ' + error.message);
    }
  };

  const handleTestCriteriaReport = async () => {
    try {
      await exportCriteriaReport(sampleCriteria);
      alert('✅ Báo cáo tiêu chí đã được tạo!');
    } catch (error) {
      alert('❌ Lỗi: ' + error.message);
    }
  };

  const handleTestEmployeeList = async () => {
    try {
      await exportEmployeeList(sampleEmployeeList);
      alert('✅ Danh sách nhân viên đã được xuất!');
    } catch (error) {
      alert('❌ Lỗi: ' + error.message);
    }
  };

  const handleTestDetailedEmployeeList = async () => {
    try {
      await exportDetailedEmployeeList(sampleEmployeeList);
      alert('✅ Báo cáo chi tiết nhân viên đã được xuất!');
    } catch (error) {
      alert('❌ Lỗi: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            🧪 Test Xuất PDF Tiếng Việt
          </h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                Báo cáo Nhân viên
              </h2>
              <p className="text-blue-600 mb-3">
                Test xuất báo cáo chi tiết của nhân viên với đầy đủ thông tin tiếng Việt
              </p>
              <button 
                onClick={handleTestEmployeeReport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                📄 Xuất Báo cáo Nhân viên
              </button>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Báo cáo Đánh giá
              </h2>
              <p className="text-green-600 mb-3">
                Test xuất báo cáo tổng hợp đánh giá với các tiêu chí chi tiết
              </p>
              <button 
                onClick={handleTestAssessmentSummary}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                📊 Xuất Báo cáo Đánh giá
              </button>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h2 className="text-lg font-semibold text-purple-800 mb-2">
                Báo cáo Tiêu chí
              </h2>
              <p className="text-purple-600 mb-3">
                Test xuất báo cáo quản lý tiêu chí đánh giá
              </p>
              <button 
                onClick={handleTestCriteriaReport}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                📋 Xuất Báo cáo Tiêu chí
              </button>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-800 mb-2">
                Danh sách Nhân viên
              </h2>
              <p className="text-orange-600 mb-3">
                Test xuất danh sách nhân viên dạng bảng đơn giản
              </p>
              <button 
                onClick={handleTestEmployeeList}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors mr-3"
              >
                📋 Xuất Danh sách
              </button>
              <button 
                onClick={handleTestDetailedEmployeeList}
                className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                📊 Báo cáo Chi tiết
              </button>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                Test Tổng hợp
              </h2>
              <p className="text-yellow-600 mb-3">
                Chạy test tự động với dữ liệu mẫu
              </p>
              <PDFTestButton />
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ✨ Các cải tiến đã thực hiện:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>✅ Thêm hỗ trợ font tiếng Việt với UTF-8</li>
              <li>✅ Sửa tất cả text thành tiếng Việt có dấu đúng</li>
              <li>✅ Cải thiện định dạng và layout PDF</li>
              <li>✅ Thêm helper function để setup font</li>
              <li>✅ Xuất danh sách nhân viên dạng bảng</li>
              <li>✅ Báo cáo chi tiết với thống kê phòng ban</li>
              <li>✅ Test với dữ liệu tiếng Việt thực tế</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFTest;