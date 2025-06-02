import React from "react";
import { useParams } from "react-router-dom";
import { getSpecificUser } from "../api/userApi";
import { getAllDocument } from "../api/docNameApi";
import type { Iuser } from "../types/types";
import GenericLoader from "./GenericLoader";
import ImageCard from "./ImageCard";

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
          <div>
            <GenericLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ImageCard
              imageLink={images.aadharCard}
              documentName="Aadhar Card"
            />
            <ImageCard imageLink={images.panCard} documentName="PanCard" />
            <ImageCard imageLink={images.ssc} documentName="10th MarkSheet" />
            <ImageCard imageLink={images.hsc} documentName="12th Marksheet" />
            <ImageCard
              imageLink={images.graduation}
              documentName="Graduation MarkSheet"
            />
          </div>
        )}
      </div>
    )
  );
}

export default EmployeeDetail;
