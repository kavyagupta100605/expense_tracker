
import React, { useContext, useEffect, useState, useRef } from "react";
import ExpenseContext from "../context/ExpenseContext";
import "../components/user.css";
import { uploadImage } from "../api/imageApi";


const OfferForm = () => {
  const [offerTitle, setOfferTitle] = useState("");
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const fileInputRef = useRef(null);
  const {
    expenses,
    addExpense,
    deleteExpense,
    editid,
    setEditid,
    updateExpense,
  } = useContext(ExpenseContext);

  useEffect(() => {
    if (editid) {
      setOfferTitle(editid.offerTitle || "");
      setCode(editid.code || "");
      setPercentage(editid.percentage || "");
      setStartDate(
        editid.startDate
          ? new Date(editid.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        editid.endDate
          ? new Date(editid.endDate).toISOString().split("T")[0]
          : ""
      );
      setStatus(editid.status);
      setExistingImage(editid.image || "");
    }
  }, [editid]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  let imageUrl = existingImage;

  if (image) {
    const uploaded = await uploadImage(image);
    imageUrl = uploaded.imageUrl;
  }

  const offerData = {
    offerTitle,
    code,
    percentage,
    startDate,
    endDate,
    status,
    image: imageUrl,
    creationDate: new Date(),
  };

  if (editid) {
    updateExpense({
      _id: editid._id,
      ...offerData,
    });
  } else {
    addExpense(offerData);
  }

  setOfferTitle("");
  setCode("");
  setPercentage("");
  setStartDate("");
  setEndDate("");
  setStatus(true);
  setImage(null);
  setEditid(null);
  setExistingImage("");
  if (fileInputRef.current) {
  fileInputRef.current.value = "";
}
};

  return (
    <>
      <div className="offer-form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>{editid ? "Edit Offer" : "Add Offer"}</h2>

        <div>
          <label>Offer Title</label>
          <input
            type="text"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
            placeholder="Enter Offer Title"
            required
          />
        </div>

        <div>
          <label>Offer Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Offer Code"
            required
          />
        </div>

        <div>
          <label>Percentage (%)</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter Percentage"
            required
          />
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div>
            <label>Offer Image</label>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setImage(e.target.files[0])}
            />

            {existingImage && (
                <div style={{ marginTop: "10px" }}>
                <p>Current Image:</p>
                <img
                src={`http://localhost:5000/uploads/${existingImage}`}
                alt="Current"
                width="100"
                />
            </div>
            )}

        </div>  

        <button type="submit">
          {editid ? "Update Offer" : "Add Offer"}
        </button>
      </form>
      </div>

      <div className="offer-table-wrapper">
      <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Offer Title</th>
                <th>Code</th>
                <th>Percentage</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>

        <tbody>
          {expenses.map((offer) => (
            <tr key={offer._id}>
                <td>
                    {offer.image ? (
                    <img
                        src={`http://localhost:5000/uploads/${offer.image}`}
                        alt={offer.offerTitle}
                        width="60"
                        height="60"
                    />
                    ) : "No image"}
                </td>
              <td>{offer.offerTitle}</td>
              <td>{offer.code}</td>
              <td>{offer.percentage}%</td>

              <td>
                {offer.startDate
                  ? new Date(offer.startDate)
                      .toISOString()
                      .split("T")[0]
                  : ""}
              </td>

              <td>
                {offer.endDate
                  ? new Date(offer.endDate)
                      .toISOString()
                      .split("T")[0]
                  : ""}
              </td>

              <td style={{color:offer.status ? "black" : "red"}}>{offer.status ? "Active" : "Inactive"}</td>

              <td>
                {offer.creationDate
                  ? new Date(offer.creationDate)
                      .toISOString()
                      .split("T")[0]
                  : ""}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => setEditid(offer)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => deleteExpense(offer._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default OfferForm;
