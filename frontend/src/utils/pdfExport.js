import jsPDF from 'jspdf';
import 'jspdf/dist/jspdf.es.min.js';
import html2canvas from 'html2canvas';

// Helper function to setup Vietnamese font support
const setupVietnameseFont = (pdf) => {
  try {
    // Set font that supports Vietnamese characters better
    pdf.setFont('helvetica', 'normal');
    pdf.setLanguage('vi');
    
    // Add UTF-8 support
    pdf.setCharSpace(0);
    pdf.setR2L(false);
    
    return true;
  } catch (error) {
    console.warn('Vietnamese font setup failed, using default:', error);
    pdf.setFont('helvetica', 'normal');
    return false;
  }
};

// Utility function to export element to PDF
export const exportToPDF = async (elementId, filename = 'report.pdf', options = {}) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Default options
    const defaultOptions = {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      ...options
    };

    // Create canvas from HTML element
    const canvas = await html2canvas(element, defaultOptions);
    const imgData = canvas.toDataURL('image/png');

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

// Export employee detail report
export const exportEmployeeReport = async (employee, assessments) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Setup Vietnamese font support
    setupVietnameseFont(pdf);

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(102, 126, 234); // Updated brand color
    pdf.text('BÁO CÁO ĐÁNH GIÁ NHÂN VIÊN', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Employee info
    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55);
    pdf.text(`Họ tên: ${employee.fullName}`, 20, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Chức vụ: ${employee.position}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Phòng ban: ${employee.department || 'Chưa phân phòng ban'}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Email: ${employee.email || 'Chưa cập nhật'}`, 20, yPosition);
    yPosition += 15;

    // Statistics
    if (assessments.length > 0) {
      const avgScore = (assessments.reduce((sum, a) => sum + a.overall, 0) / assessments.length).toFixed(1);
      const latestScore = assessments[0]?.overall || 0;
      
      pdf.setFontSize(14);
      pdf.setTextColor(31, 41, 55);
      pdf.text('THỐNG KÊ TỔNG QUAN', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.text(`Tổng số đánh giá: ${assessments.length}`, 20, yPosition);
      yPosition += 6;
      pdf.text(`Điểm trung bình: ${avgScore}/5`, 20, yPosition);
      yPosition += 6;
      pdf.text(`Đánh giá gần nhất: ${latestScore}/5`, 20, yPosition);
      yPosition += 15;
    }

    // Assessment history
    if (assessments.length > 0) {
      pdf.setFontSize(14);
      pdf.setTextColor(31, 41, 55);
      pdf.text('LỊCH SỬ ĐÁNH GIÁ', 20, yPosition);
      yPosition += 10;

      assessments.forEach((assessment, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(12);
        pdf.setTextColor(79, 70, 229);
        pdf.text(`${index + 1}. ${assessment.cycleLabel}`, 20, yPosition);
        yPosition += 6;
        
        pdf.setTextColor(107, 114, 128);
        pdf.text(`Kỳ: ${assessment.period}`, 25, yPosition);
        yPosition += 5;
        pdf.text(`Điểm: ${assessment.overall}/5`, 25, yPosition);
        yPosition += 5;
        
        if (assessment.comment) {
          const comment = assessment.comment.length > 80 
            ? assessment.comment.substring(0, 80) + '...' 
            : assessment.comment;
          pdf.text(`Nhận xét: ${comment}`, 25, yPosition);
          yPosition += 5;
        }
        
        if (assessment.nextGoals) {
          const goals = assessment.nextGoals.length > 80 
            ? assessment.nextGoals.substring(0, 80) + '...' 
            : assessment.nextGoals;
          pdf.text(`Mục tiêu: ${goals}`, 25, yPosition);
          yPosition += 5;
        }
        
        yPosition += 5;
      });
    }

    // Footer
    const currentDate = new Date().toLocaleDateString('vi-VN');
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Báo cáo được tạo ngày: ${currentDate}`, 20, pageHeight - 10);
    pdf.text('Hệ thống Đánh giá Nhân viên - EPS', pageWidth - 20, pageHeight - 10, { align: 'right' });

    // Save PDF
    const filename = `BaoCao_${employee.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting employee report:', error);
    throw error;
  }
};

// Export assessment summary report
export const exportAssessmentSummary = async (assessmentData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    setupVietnameseFont(pdf);

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(79, 70, 229);
    pdf.text('BÁO CÁO TỔNG HỢP ĐÁNH GIÁ', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Summary info
    pdf.setFontSize(14);
    pdf.setTextColor(31, 41, 55);
    pdf.text('THÔNG TIN CHUNG', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Kỳ đánh giá: ${assessmentData.cycleLabel}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Thời gian: ${assessmentData.period}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Nhân viên: ${assessmentData.employee?.fullName}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Điểm tổng: ${assessmentData.overall}/5`, 20, yPosition);
    yPosition += 15;

    // Criteria details
    if (assessmentData.criteria && assessmentData.criteria.length > 0) {
      pdf.setFontSize(14);
      pdf.setTextColor(31, 41, 55);
      pdf.text('CHI TIẾT TIÊU CHÍ', 20, yPosition);
      yPosition += 10;

      assessmentData.criteria.forEach((criterion, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(12);
        pdf.setTextColor(79, 70, 229);
        pdf.text(`${index + 1}. ${criterion.label}`, 20, yPosition);
        yPosition += 6;
        
        pdf.setTextColor(107, 114, 128);
        pdf.text(`Điểm: ${criterion.score}/5`, 25, yPosition);
        yPosition += 5;
        
        if (criterion.comment) {
          const comment = criterion.comment.length > 80 
            ? criterion.comment.substring(0, 80) + '...' 
            : criterion.comment;
          pdf.text(`Nhận xét: ${comment}`, 25, yPosition);
          yPosition += 5;
        }
        
        yPosition += 3;
      });
      yPosition += 10;
    }

    // Overall comments
    if (assessmentData.comment) {
      pdf.setFontSize(14);
      pdf.setTextColor(31, 41, 55);
      pdf.text('NHẬN XÉT TỔNG QUAN', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128);
      const lines = pdf.splitTextToSize(assessmentData.comment, pageWidth - 40);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 5 + 10;
    }

    // Goals
    if (assessmentData.nextGoals) {
      pdf.setFontSize(14);
      pdf.setTextColor(31, 41, 55);
      pdf.text('MỤC TIÊU KỲ TỚI', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128);
      const lines = pdf.splitTextToSize(assessmentData.nextGoals, pageWidth - 40);
      pdf.text(lines, 20, yPosition);
    }

    // Footer
    const currentDate = new Date().toLocaleDateString('vi-VN');
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Báo cáo được tạo ngày: ${currentDate}`, 20, pageHeight - 10);
    pdf.text('Hệ thống Đánh giá Nhân viên - EPS', pageWidth - 20, pageHeight - 10, { align: 'right' });

    // Save PDF
    const filename = `DanhGia_${assessmentData.cycleLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting assessment summary:', error);
    throw error;
  }
};

// Export criteria management report
export const exportCriteriaReport = async (criteriaData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    setupVietnameseFont(pdf);

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(79, 70, 229);
    pdf.text('BÁO CÁO QUẢN LÝ TIÊU CHÍ', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Active criteria
    const activeCriteria = criteriaData.filter(c => c.isActive);
    const inactiveCriteria = criteriaData.filter(c => !c.isActive);

    pdf.setFontSize(14);
    pdf.setTextColor(31, 41, 55);
    pdf.text('TIÊU CHÍ ĐANG HOẠT ĐỘNG', 20, yPosition);
    yPosition += 10;

    if (activeCriteria.length > 0) {
      activeCriteria.forEach((criterion, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(12);
        pdf.setTextColor(79, 70, 229);
        pdf.text(`${index + 1}. ${criterion.name} (${criterion.code})`, 20, yPosition);
        yPosition += 6;
        
        pdf.setTextColor(107, 114, 128);
        pdf.text(`Version: ${criterion.version}`, 25, yPosition);
        yPosition += 5;
        pdf.text(`Trọng số: ${criterion.weight || 1}`, 25, yPosition);
        yPosition += 5;
        pdf.text(`Phòng ban: ${criterion.department || 'Chung'}`, 25, yPosition);
        yPosition += 5;
        
        if (criterion.description) {
          const desc = criterion.description.length > 60 
            ? criterion.description.substring(0, 60) + '...' 
            : criterion.description;
          pdf.text(`Mô tả: ${desc}`, 25, yPosition);
          yPosition += 5;
        }
        
        yPosition += 3;
      });
    } else {
      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128);
      pdf.text('Không có tiêu chí nào đang hoạt động', 20, yPosition);
      yPosition += 10;
    }

    yPosition += 10;

    // Inactive criteria summary
    pdf.setFontSize(14);
    pdf.setTextColor(31, 41, 55);
    pdf.text('THỐNG KÊ TIÊU CHÍ KHÔNG HOẠT ĐỘNG', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Tổng số: ${inactiveCriteria.length}`, 20, yPosition);
    yPosition += 6;

    // Statistics
    const versions = [...new Set(criteriaData.map(c => c.version))];
    const departments = [...new Set(criteriaData.map(c => c.department).filter(Boolean))];

    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setTextColor(31, 41, 55);
    pdf.text('THỐNG KÊ TỔNG QUAN', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Tổng số tiêu chí: ${criteriaData.length}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Tiêu chí hoạt động: ${activeCriteria.length}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Số version: ${versions.length}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Số phòng ban: ${departments.length}`, 20, yPosition);

    // Footer
    const currentDate = new Date().toLocaleDateString('vi-VN');
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Báo cáo được tạo ngày: ${currentDate}`, 20, pageHeight - 10);
    pdf.text('Hệ thống Đánh giá Nhân viên - EPS', pageWidth - 20, pageHeight - 10, { align: 'right' });

    // Save PDF
    const filename = `BaoCao_TieuChi_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting criteria report:', error);
    throw error;
  }
};

// Export employee list report
export const exportEmployeeList = async (employees) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    setupVietnameseFont(pdf);

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(79, 70, 229);
    pdf.text('DANH SÁCH NHÂN VIÊN', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Summary info
    pdf.setFontSize(14);
    pdf.setTextColor(31, 41, 55);
    pdf.text('THÔNG TIN TỔNG QUAN', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Tổng số nhân viên: ${employees.length}`, 20, yPosition);
    yPosition += 6;

    // Count by department
    const departmentCounts = employees.reduce((acc, emp) => {
      const dept = emp.department || 'Chưa phân phòng ban';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    pdf.text(`Số phòng ban: ${Object.keys(departmentCounts).length}`, 20, yPosition);
    yPosition += 6;

    const currentDate = new Date().toLocaleDateString('vi-VN');
    pdf.text(`Ngày xuất báo cáo: ${currentDate}`, 20, yPosition);
    yPosition += 15;

    // Department breakdown
    if (Object.keys(departmentCounts).length > 0) {
      pdf.setFontSize(14);
      pdf.setTextColor(31, 41, 55);
      pdf.text('PHÂN BỔ THEO PHÒNG BAN', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128);
      
      Object.entries(departmentCounts).forEach(([dept, count]) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          setupVietnameseFont(pdf);
          yPosition = 20;
        }
        pdf.text(`• ${dept}: ${count} nhân viên`, 25, yPosition);
        yPosition += 6;
      });
      yPosition += 10;
    }

    // Employee list table header
    pdf.setFontSize(14);
    pdf.setTextColor(31, 41, 55);
    pdf.text('CHI TIẾT DANH SÁCH NHÂN VIÊN', 20, yPosition);
    yPosition += 15;

    // Table headers
    pdf.setFontSize(10);
    pdf.setTextColor(79, 70, 229);
    pdf.setFont('helvetica', 'bold');
    
    const colWidths = [15, 45, 50, 40, 40];
    const colPositions = [20, 35, 80, 130, 170];
    const headers = ['STT', 'Họ tên', 'Email', 'Phòng ban', 'Chức vụ'];
    
    headers.forEach((header, index) => {
      pdf.text(header, colPositions[index], yPosition);
    });
    
    // Draw header line
    pdf.setDrawColor(79, 70, 229);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
    yPosition += 8;

    // Employee rows
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(107, 114, 128);
    
    employees.forEach((employee, index) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        setupVietnameseFont(pdf);
        yPosition = 20;
        
        // Repeat headers on new page
        pdf.setFontSize(10);
        pdf.setTextColor(79, 70, 229);
        pdf.setFont('helvetica', 'bold');
        headers.forEach((header, headerIndex) => {
          pdf.text(header, colPositions[headerIndex], yPosition);
        });
        pdf.setDrawColor(79, 70, 229);
        pdf.line(20, yPosition + 2, pageWidth - 20, yPosition + 2);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(107, 114, 128);
      }

      const rowData = [
        (index + 1).toString(),
        employee.fullName || employee.username,
        employee.email || '-',
        employee.department || 'Chưa phân phòng ban',
        employee.position || '-'
      ];

      rowData.forEach((data, colIndex) => {
        let text = data;
        // Truncate long text to fit column width
        if (colIndex === 1 && text.length > 20) text = text.substring(0, 18) + '...';
        if (colIndex === 2 && text.length > 25) text = text.substring(0, 23) + '...';
        if (colIndex === 3 && text.length > 18) text = text.substring(0, 16) + '...';
        if (colIndex === 4 && text.length > 18) text = text.substring(0, 16) + '...';
        
        pdf.text(text, colPositions[colIndex], yPosition);
      });

      yPosition += 6;
    });

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Báo cáo được tạo ngày: ${currentDate}`, 20, pageHeight - 10);
    pdf.text('Hệ thống Đánh giá Nhân viên - EPS', pageWidth - 20, pageHeight - 10, { align: 'right' });

    // Save PDF
    const filename = `DanhSach_NhanVien_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting employee list:', error);
    throw error;
  }
};

// Export detailed employee list with statistics
export const exportDetailedEmployeeList = async (employees) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    setupVietnameseFont(pdf);

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(79, 70, 229);
    pdf.text('BÁO CÁO CHI TIẾT NHÂN VIÊN', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Statistics section
    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55);
    pdf.text('📊 THỐNG KÊ TỔNG QUAN', 20, yPosition);
    yPosition += 12;

    const stats = {
      total: employees.length,
      withEmail: employees.filter(emp => emp.email).length,
      withDepartment: employees.filter(emp => emp.department).length,
      withPosition: employees.filter(emp => emp.position).length
    };

    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`• Tổng số nhân viên: ${stats.total}`, 25, yPosition);
    yPosition += 6;
    pdf.text(`• Có thông tin email: ${stats.withEmail} (${((stats.withEmail/stats.total)*100).toFixed(1)}%)`, 25, yPosition);
    yPosition += 6;
    pdf.text(`• Đã phân phòng ban: ${stats.withDepartment} (${((stats.withDepartment/stats.total)*100).toFixed(1)}%)`, 25, yPosition);
    yPosition += 6;
    pdf.text(`• Có chức vụ: ${stats.withPosition} (${((stats.withPosition/stats.total)*100).toFixed(1)}%)`, 25, yPosition);
    yPosition += 15;

    // Department breakdown
    const departmentCounts = employees.reduce((acc, emp) => {
      const dept = emp.department || 'Chưa phân phòng ban';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55);
    pdf.text('🏢 PHÂN BỔ THEO PHÒNG BAN', 20, yPosition);
    yPosition += 12;

    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    
    Object.entries(departmentCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([dept, count]) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          setupVietnameseFont(pdf);
          yPosition = 20;
        }
        const percentage = ((count/stats.total)*100).toFixed(1);
        pdf.text(`• ${dept}: ${count} nhân viên (${percentage}%)`, 25, yPosition);
        yPosition += 6;
      });

    yPosition += 15;

    // Detailed employee list
    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55);
    pdf.text('👥 DANH SÁCH CHI TIẾT', 20, yPosition);
    yPosition += 15;

    employees.forEach((employee, index) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        setupVietnameseFont(pdf);
        yPosition = 20;
      }

      // Employee card
      pdf.setFillColor(248, 250, 252);
      pdf.rect(20, yPosition - 5, pageWidth - 40, 25, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(79, 70, 229);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${employee.fullName || employee.username}`, 25, yPosition + 3);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128);
      
      pdf.text(`Tên đăng nhập: ${employee.username}`, 25, yPosition + 8);
      pdf.text(`Email: ${employee.email || 'Chưa cập nhật'}`, 25, yPosition + 13);
      pdf.text(`Phòng ban: ${employee.department || 'Chưa phân phòng ban'}`, 25, yPosition + 18);
      pdf.text(`Chức vụ: ${employee.position || 'Chưa cập nhật'}`, 120, yPosition + 18);

      yPosition += 30;
    });

    // Footer
    const currentDate = new Date().toLocaleDateString('vi-VN');
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Báo cáo được tạo ngày: ${currentDate}`, 20, pageHeight - 10);
    pdf.text('Hệ thống Đánh giá Nhân viên - EPS', pageWidth - 20, pageHeight - 10, { align: 'right' });

    // Save PDF
    const filename = `BaoCao_ChiTiet_NhanVien_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting detailed employee list:', error);
    throw error;
  }
};