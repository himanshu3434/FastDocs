import React from "react";
import { useParams } from "react-router-dom";
import { getSpecificUser } from "../api/userApi";
import { getAllDocument } from "../api/docNameApi";
import type { Iuser } from "../types/types";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState<Iuser>();
  const [images, setImages] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);

  const fetchEmployeeDetails = async () => {
    const allBasicDetails = await getSpecificUser(id as string);
    if (allBasicDetails.data.success) {
      setEmployee(allBasicDetails.data.data);
      console.log("Employee Details 1: ", allBasicDetails.data.data);
    }
    const allDocuments = await getAllDocument(id as string);
    if (allDocuments.data.success) {
      if (allDocuments.data.data.flag) {
        setImages(allDocuments.data.data.documents);
        console.log("Employee Documents 1: ", allDocuments.data.data.documents);
      }
    }
  };

  React.useEffect(() => {
    fetchEmployeeDetails().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    employee && (
      <div className="max-w-4xl mx-auto p-6 flex flex-col  items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {employee.fullName}
        </h1>
        <p className="text-gray-600 mb-6">{employee.email}</p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4 ">
          Uploaded Documents
        </h2>
        {loading ? (
          <div>Loading ... </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-medium text-gray-700 mb-2">"Aadhar Card"</p>
              {images.aadharCard ? (
                <a
                  href={images.aadharCard}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={images.aadharCard}
                    alt={images.aadharCard}
                    className="w-full h-40 object-cover rounded"
                  />
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No document uploaded</p>
              )}
            </div>

            <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-medium text-gray-700 mb-2">PanCard</p>
              {images.panCard ? (
                <a
                  href={images.panCard}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={images.panCard}
                    alt={images.panCard}
                    className="w-full h-40 object-cover rounded"
                  />
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No document uploaded</p>
              )}
            </div>
            <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-medium text-gray-700 mb-2">10th MarkSheet</p>
              {images.ssc ? (
                <a href={images.ssc} target="_blank" rel="noopener noreferrer">
                  <img
                    src={images.ssc}
                    alt={images.ssc}
                    className="w-full h-40 object-cover rounded"
                  />
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No document uploaded</p>
              )}
            </div>
            <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-medium text-gray-700 mb-2">12th Marksheet</p>
              {images.hsc ? (
                <a href={images.hsc} target="_blank" rel="noopener noreferrer">
                  <img
                    src={images.hsc}
                    alt={images.hsc}
                    className="w-full h-40 object-cover rounded"
                  />
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No document uploaded</p>
              )}
            </div>
            <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-medium text-gray-700 mb-2">
                Graduation Marksheet
              </p>
              {images.graduation ? (
                <a
                  href={images.graduation}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={images.graduation}
                    alt={images.graduation}
                    className="w-full h-40 object-cover rounded"
                  />
                </a>
              ) : (
                <p className="text-gray-400 text-sm">No document uploaded</p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default EmployeeDetail;
