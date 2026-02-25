/* eslint-disable prettier/prettier */
import React, { useRef } from 'react'
import { Button } from 'antd'
import { useReactToPrint } from 'react-to-print'

const MonthlyInvoice = ({ student, monthLedger }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN')
  }
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${student.name}_${monthLedger.period || 'Fee Payment Report'}_Fee Payment Report`,
    printStyles: `
@media print {

  @page {
    size: A4;
    margin: 10mm;
  }
 
  html, body {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

 
  body * {
    visibility: hidden;
  }

  #print-section,
  #print-section * {
    visibility: visible;
  }

  #print-section {
    position: relative;
    bottom: 12mm;
    left: 50%;
    transform: translateX(-50%);
    width: 190mm;
    max-height: 190mm;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
 .print-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 9pt;
    font-weight: bold;
  }
    @media print { 
        body { 
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
}
`,
  })
  const numberToWords = (num) => {
    const a = [
      '',
      'One ',
      'Two ',
      'Three ',
      'Four ',
      'Five ',
      'Six ',
      'Seven ',
      'Eight ',
      'Nine ',
      'Ten ',
      'Eleven ',
      'Twelve ',
      'Thirteen ',
      'Fourteen ',
      'Fifteen ',
      'Sixteen ',
      'Seventeen ',
      'Eighteen ',
      'Nineteen ',
    ]
    const b = [
      '',
      '',
      'Twenty ',
      'Thirty ',
      'Forty ',
      'Fifty ',
      'Sixty ',
      'Seventy ',
      'Eighty ',
      'Ninety ',
    ]

    if ((num = num.toString()).length > 9) return ''
    const n = ('000000000' + num).substr(-9).match(/.{1,2}/g)
    let str = ''
    str += Number(n[0]) !== 0 ? (a[Number(n[0])] || b[n[0][0]] + a[n[0][1]]) + 'Crore ' : ''
    str += Number(n[1]) !== 0 ? (a[Number(n[1])] || b[n[1][0]] + a[n[1][1]]) + 'Lakh ' : ''
    str += Number(n[2]) !== 0 ? (a[Number(n[2])] || b[n[2][0]] + a[n[2][1]]) + 'Thousand ' : ''
    str += Number(n[3]) !== 0 ? (a[Number(n[3])] || b[n[3][0]] + a[n[3][1]]) + 'Hundred ' : ''
    str +=
      Number(n[4]) !== 0
        ? (str !== '' ? 'and ' : '') + (a[Number(n[4])] || b[n[4][0]] + a[n[4][1]])
        : ''
    return str + 'Only'
  }

  if (!student || !monthLedger) return null
 

  return (
    <>
      {/* <style>{printStyles}</style> */}

      <div className="bg-white p-6 print:p-2 text-[13px]" ref={printRef}>
        {/* PRINT BUTTON */}
        <div className="flex justify-end mb-4 print:hidden">
          <Button type="primary" onClick={handlePrint}>
            Print / Download PDF
          </Button>
        </div>

        <div id="print-section" className="bg-gray-100 p-2 md:p-6 print:p-0 print:bg-white">
          <div className="bg-white border-2 border-black p-2 md:p-4 overflow-x-auto print:overflow-visible">
            {/* ===== SCHOOL HEADER ===== */}
            <div className="text-center border-b-2 border-black pb-2">
              <h1 className="text-xl md:text-3xl font-bold print:text-2xl mb-0 pb-0">
                YOUR SCHOOL NAME HERE
              </h1>
              <span className="text-xs md:text-xs print:text-sm">
                School Address Here (Affiliated to CBSE | UDISE Code - 0123456789)
              </span>
            </div>

            <div className="text-center font-bold border-b border-black py-1 text-sm md:text-base print:text-base">
              FEE PAYMENT REPORT : {monthLedger.period}
            </div>

            {/* ===== INVOICE INFO ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 border-b border-black text-xs md:text-sm print:text-sm">
              <span className="text-center border-r p-1">
                <b>Invoice No:</b> INV-{student.admissionNo}-{new Date().getFullYear()}-
                {String(new Date().getMonth() + 1).padStart(2, '0')}
                {String(new Date().getDate()).padStart(2, '0')}
              </span>
              <span className="text-center p-1">
                <b>Date:</b> {new Date().toLocaleDateString('en-GB')}
              </span>
            </div>

            {/* ===== STUDENT DETAILS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-2 p-2 text-xs md:text-sm print:text-sm border-b border-black">
              <p className="mb-1">
                <b>Admission No:</b> {student.admissionNo || '-'}
              </p>
              <p className="mb-1">
                <b>Student Name:</b> {student.name}
              </p>
              <p className="mb-1">
                <b>Class:</b> {student.class} ({student.section}) {student.stream || ''}
              </p>
              <p className="mb-1">
                <b>Father Name:</b> {student.fatherName}
              </p>
              {/* <p className="mb-1">
                <b>Mother Name:</b> {student.motherName}
              </p> */}
              <p className="mb-1">
                <b>Contact No:</b> {student.phone}
              </p>
            </div>

            {/* ===== FEE TABLE ===== */}
            <div className="overflow-x-auto mt-4 print:overflow-visible">
              <table className="w-full table-fixed border-collapse border-2 border-black text-[10px] md:text-sm print:text-xs">
                <thead>
                  <tr>
                    <th
                      className="border-2 border-black px-2 py-2 bg-gray-100 text-center"
                      style={{ width: '8%' }}
                    >
                      Sr.
                    </th>
                    <th
                      className="border-2 border-black px-2 py-2 bg-gray-100 text-left"
                      style={{ width: '25%' }}
                    >
                      Fee Head
                    </th>
                    <th className="border-2 border-black px-2 py-2 bg-gray-100 text-center">
                      Due Date
                    </th>
                    <th className="border-2 border-black px-2 py-2 bg-gray-100 text-center">
                      Total Amount
                    </th>
                    <th className="border-2 border-black px-2 py-2 bg-gray-100 text-center">
                      Paid Amount
                    </th>
                    <th className="border-2 border-black px-2 py-2 bg-gray-100 text-center">
                      Balance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {monthLedger.items.map((item, index) => (
                    <tr key={item.referenceId}>
                      <td className="border border-black text-center py-2">{index + 1}</td>

                      <td className="border border-black px-2 py-2 text-left font-medium">
                        {item.feeHead}
                      </td>

                      <td className="border border-black text-center">
                        {new Date(item.dueDate).toLocaleDateString('en-GB')}
                      </td>

                      <td className="border border-black text-center">₹{item.totalAmount}</td>

                      <td className="border border-black text-center text-green-700 font-semibold">
                        ₹{item.paidAmount}
                      </td>

                      <td className="border border-black text-center text-red-600 font-semibold">
                        ₹{item.dueAmount}
                      </td>
                    </tr>
                  ))}

                  {/* ===== TOTAL ROW ===== */}
                  <tr className="font-bold bg-gray-100">
                    <td colSpan={3} className="border-2 border-black text-center py-2">
                      Grand Total
                    </td>

                    <td className="border-2 border-black text-center">
                      ₹{monthLedger.totalAmount}
                    </td>

                    <td className="border-2 border-black text-center text-green-700">
                      ₹{monthLedger.totalPaid}
                    </td>

                    <td className="border-2 border-black text-center text-red-600">
                      ₹{monthLedger.totalDue}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ===== SIGNATURES ===== */}
            <div className="grid grid-cols-3 mt-10 text-center text-xs md:text-sm print:text-sm">
              <p>Parent / Guardian Sign</p>
              <p>Accounts Officer Sign</p>
              <p>Principal Sign & Stamp</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden print:block print-footer">
        {student.name}_{monthLedger.period}_Fee Payment Report
      </div>
    </>
  )
}

export default MonthlyInvoice
