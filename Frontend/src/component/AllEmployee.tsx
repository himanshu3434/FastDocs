import React, { useEffect } from "react";

import { fetchAllUsers } from "../api/userApi";
import { Link } from "react-router-dom";
import GenericLoader from "./GenericLoader";

function AllEmployee() {
  const [employees, setEmployees] = React.useState([]);

  const [loading, SetLoading] = React.useState(true);

  const fetchEmployees = async () => {
    const allEmployeeDetails = await fetchAllUsers();
    if (allEmployeeDetails.data.success) {
      setEmployees(allEmployeeDetails.data.data);
    }
  };

  useEffect(() => {
    fetchEmployees().then(() => {
      SetLoading(false);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        All Employees
      </h2>
      {loading ? (
        <div>
          <GenericLoader />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {employees.map((emp: any) => (
              <Link key={emp._id} to={`/employee/${emp._id}`}>
                <li className="p-4 hover:bg-gray-50 cursor-pointer transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {emp.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{emp.email}</p>
                    </div>
                    <span className="text-sm text-blue-500">View &rarr;</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AllEmployee;
