function ImageCard({
  imageLink,
  documentName,
}: {
  imageLink: string;
  documentName: string;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-xl hover:shadow-md transition">
      <p className="font-medium text-gray-700 mb-2">{documentName}</p>
      {imageLink ? (
        <a href={imageLink} target="_blank" rel="Addhar Card">
          <img
            src={imageLink}
            alt={imageLink}
            className="w-full h-40 object-cover rounded"
          />
        </a>
      ) : (
        <p className="text-gray-400 text-sm">No document uploaded</p>
      )}
    </div>
  );
}

export default ImageCard;
