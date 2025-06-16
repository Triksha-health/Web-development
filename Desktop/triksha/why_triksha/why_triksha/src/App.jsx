import React from "react";
import ReactDOM from "react-dom";
import { data } from "./data";
function App(){
    return (
    <div className="px-4 py-12 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-2">Why Triksha is Different</h2>
      <p className="text-gray-600 mb-8">
        See how Triksha compares to other popular health wearables in the market.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4">&nbsp;</th>
              {brands.map((b) => (
                <th key={b} className="py-3 px-4 text-gray-700 font-semibold">
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="text-left py-3 px-4">
                  {item.feature}
                  {item.tag && (
                    <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </td>
                {["triksha", "apple", "whoop", "oura"].map((brandKey) => (
                  <td key={brandKey} className="text-center py-3 px-4">
                    {item[brandKey] ? "✔️" : "❌"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg p-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">The Triksha Difference</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">Proprietary AI</h4>
            <p className="text-sm">
              Developed by top AI researchers from India’s premier technical institutions.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">Early Warning System</h4>
            <p className="text-sm">
              Alerts you to potential health issues days or weeks before symptoms appear.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">Holistic Analysis</h4>
            <p className="text-sm">
              Considers all vital signs together, not in isolation, for comprehensive insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


