import { useState, useRef } from "react";
import Filters from "../../components/Reports_Page/Filters";
import ReportTable from "../../components/Reports_Page/ReportTable";
import ReportChart from "../../components/Reports_Page/ReportChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
//import dummyData from "../../data/dummyData";

export default function Reports() {
    const [reportData, setReportData] = useState([]);
    const chartRef = useRef(null);

    const columns = reportData[0]
        ? Object.keys(reportData[0]).map((key) => ({
            header: key,
            accessor: key,
        }))
        : [];

    // --- Filter Data ---
    const handleFilter = ({ startDate, endDate, vendor, category }) => {
        const filteredData = dummyData.filter((item) => {
        const itemDate = new Date(item.Date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const dateMatch =
            (!start || itemDate >= start) && (!end || itemDate <= end);
        const vendorMatch =
            !vendor || item.Vendor.toLowerCase().includes(vendor.toLowerCase());
        const categoryMatch =
            !category ||
            item.Category.toLowerCase().includes(category.toLowerCase());

        return dateMatch && vendorMatch && categoryMatch;
        });

    setReportData(filteredData);
    };

    // --- Export PDF ---
    const exportPDF = async () => {
        if (!reportData.length) return alert("No data to export");

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Report", 14, 22);
        doc.setFontSize(12);

        // Add table
        const rows = reportData.map((row) => Object.values(row));
        const headers = [Object.keys(reportData[0])];
        autoTable(doc, { head: headers, body: rows, startY: 30 });

        // Add chart below table
        const yPos = doc.lastAutoTable.finalY + 10;

        if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 180;
        const pdfHeight = (canvas.height / canvas.width) * pdfWidth;
        doc.addImage(imgData, "PNG", 14, yPos, pdfWidth, pdfHeight);
        }

        doc.save("report.pdf");
    };

    // --- Export Excel with chart image ---
    const exportExcel = async () => {
        if (!reportData.length) return alert("No data to export");

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report");

        // Add headers
        const headers = Object.keys(reportData[0]);
        worksheet.addRow(headers);

        // Add data
        reportData.forEach((row) => worksheet.addRow(Object.values(row)));

        // Style headers
        headers.forEach((_, i) => {
            const cell = worksheet.getRow(1).getCell(i + 1);
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4CAF50" } };
            worksheet.getColumn(i + 1).width = 15;
        });

        // Convert chart to image using html2canvas
        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const imageId = workbook.addImage({
            base64: imgData,
            extension: "png",
            });

            // --- Adjust chart placement ---
            const chartWidth = 1000;
            const chartHeight = (canvas.height / canvas.width) * chartWidth * 1.5;
            const lastRow = worksheet.lastRow.number + 5;

            // Center the chart horizontally
            const startCol = Math.floor((headers.length - 6) / 2);

            worksheet.addImage(imageId, {
            tl: { col: startCol, row: lastRow },
            ext: { width: chartWidth, height: chartHeight },
            });
        }

        // Generate Excel file and save
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "report_with_chart.xlsx");
    };



    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <Filters onFilter={handleFilter} />

        <div className="flex gap-4 mb-4">
            <button
            onClick={exportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
            Download PDF
            </button>
            <button
            onClick={exportExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
            Download Excel
            </button>
        </div>

        <ReportTable columns={columns} data={reportData} />

        <div ref={chartRef} className="mt-6 flex justify-center">
            <ReportChart
            data={reportData.map((d) => ({
                name: d.Product,
                value: d.Sales,
            }))}
            />
        </div>
        </div>
    );
}

