import React from 'react';
import { testVietnamesePDF } from '../utils/testPDF.js';

const PDFTestButton = () => {
  const handleTestPDF = async () => {
    try {
      const success = await testVietnamesePDF();
      if (success) {
        alert('✅ PDF tiếng Việt đã được tạo thành công! Kiểm tra file tải về.');
      }
    } catch (error) {
      alert('❌ Có lỗi khi tạo PDF: ' + error.message);
    }
  };

  return (
    <button 
      onClick={handleTestPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      🧪 Test PDF Tiếng Việt
    </button>
  );
};

export default PDFTestButton;