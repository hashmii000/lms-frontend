import React, { useState } from "react";
import { IndianRupee, Edit, Trash2 } from "lucide-react";
import ToggleSwitch from "../../components/ToggleSwitch";

const FeeMaster = () => {
  const [fees, setFees] = useState([
    {
      id: 1,
      feeName: "Tuition Fee",
      feeType: "Monthly",
      amount: 1500,
      isActive: true,
    },
    {
      id: 2,
      feeName: "Admission Fee",
      feeType: "One Time",
      amount: 5000,
      isActive: true,
    },
    {
      id: 3,
      feeName: "Exam Fee",
      feeType: "Annual",
      amount: 1200,
      isActive: false,
    },
  ]);

  const toggleStatus = (id) => {
    setFees(
      fees.map((f) =>
        f.id === id ? { ...f, isActive: !f.isActive } : f
      )
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div className="px-4 py-3 bg-white rounded-lg border border-blue-100 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <IndianRupee className="text-[#e24028]" />
            Fee Master
          </h1>
          <p className="text-sm text-gray-500">
            Manage school fee structure
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          + Add Fee
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="border p-2 text-center">Sr. No.</th>
              <th className="border p-2">Fee Name</th>
              <th className="border p-2">Fee Type</th>
              <th className="border p-2 text-right">Amount (₹)</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Fee Records Found
                </td>
              </tr>
            ) : (
              fees.map((f, i) => (
                <tr key={f.id} className="text-sm hover:bg-gray-50">
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">{f.feeName}</td>
                  <td className="border p-2">{f.feeType}</td>
                  <td className="border p-2 text-right font-medium">
                    ₹ {f.amount}
                  </td>

                  {/* STATUS */}
                  <td className="border p-2 text-center">
                    <ToggleSwitch
                      checked={f.isActive}
                      onChange={() => toggleStatus(f.id)}
                    />
                  </td>

                  {/* ACTION */}
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeMaster;
