import React, { useState } from "react";

function ResourceManagement() {
  

  return (
    <div className="p-6 mt-10 bg-white rounded-md">
           <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left font-medium">
            <tr>
              <th className="px-3 py-2 border-b">Sl no</th>
              <th className="px-3 py-2 border-b">Resource Name</th>
              <th className="px-3 py-2 border-b">Resource ID no</th>
              <th className="px-3 py-2 border-b">Quantity</th>
              <th className="px-3 py-2 border-b">Last Maintained Date</th>
              <th className="px-3 py-2 border-b">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="text-left">
            <tr className="">
              <td className="px-3 py-2">01</td>
              <td className="px-3 py-2">Fire Extinguisher</td>
              <td className="px-3 py-2">5451200</td>
              <td className="px-3 py-2">15 Units</td>
              <td className="px-3 py-2">15/08/2025</td>
              <td className="px-3 py-2">19/12/2027</td>
            </tr>
            <tr className="">
                <td className="px-3 py-2">02</td>
                <td className="px-3 py-2">Fire Trucks</td>
                <td className="px-3 py-2">5451201</td>
                <td className="px-3 py-2">1 Unit</td>
                <td className="px-3 py-2">05/08/2025</td>
                <td className="px-3 py-2">-</td>
            </tr>
            <tr className="">
                <td className="px-3 py-2">03</td>
                <td className="px-3 py-2">Ambulance</td>
                <td className="px-3 py-2">5451202</td>
                <td className="px-3 py-2">2 Vehicles</td>
                <td className="px-3 py-2">15/08/2025</td>
                <td className="px-3 py-2">-</td>
            </tr>
            <tr className="">
                <td className="px-3 py-2">04</td>
                <td className="px-3 py-2">Mock Drill area Maintenance</td>
                <td className="px-3 py-2">5451203</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">21/06/2025</td>
                <td className="px-3 py-2">-</td>
            </tr>
            <tr className="">
                <td className="px-3 py-2">05</td>
                <td className="px-3 py-2">Water Hose</td>
                <td className="px-3 py-2">5451205</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">30/06/2025</td>
                <td className="px-3 py-2">-</td>
            </tr>
            <tr className="">
                <td className="px-3 py-2">06</td>
                <td className="px-3 py-2">Emergency Clinic</td>
                <td className="px-3 py-2">5451206</td>
                <td className="px-3 py-2">2 Clinic</td>
                <td className="px-3 py-2">15/08/2025</td>
                <td className="px-3 py-2">-</td>
            </tr>
            <tr className="">
                <td className="px-3 py-2">07</td>
                <td className="px-3 py-2">Sand Bucket</td>
                <td className="px-3 py-2">5451207</td>
                <td className="px-3 py-2">15 Units</td>
                <td className="px-3 py-2">15/08/2025</td>
                <td className="px-3 py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
}

export default ResourceManagement;
