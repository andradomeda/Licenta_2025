import React, { useState } from "react";
import Map from "../../Components/Map/Map";
import { useGlobalContext } from '../../GlobalContext';
import axios from 'axios';

const General = () => 
  {
  const [coords, setCoords] = useState(null);
  const { isAuthenticated, volunteer, token } = useGlobalContext();

  const handleLocationSelect = (location) => {
    console.log("📦 Coordonate primite în General:", location);
    setCoords(location);
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    county: "",
    street: "",
    birth_date: "",
    description: "",
    clothing_size: "",
    shoe_size: "",
    needs: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!coords) {
    alert("Te rugăm să selectezi o locație pe hartă.");
    return;
  }

  const elderData = {
    ...formData,
    lat: coords.lat,
    lng: coords.lon, // atenție: în modelul Sequelize coloana e `lng`, nu `lon`
  };

  try {
    const response = await axios.post("/elders", elderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Elder adăugat cu succes!");
    console.log(response.data);
  } catch (error) {
    console.error(error);
    alert("Eroare la salvare!");
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Selectează locația pe hartă</h2>
      <Map onLocationSelect={handleLocationSelect} />

      {coords && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <h3 className="font-bold mb-2">📍 Coordonate selectate:</h3>
          <p><strong>Latitudine:</strong> {coords.lat}</p>
          <p><strong>Longitudine:</strong> {coords.lon}</p>
        </div>
      )}
      <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Adaugă un bătrân</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {[
          { label: "Nume", name: "name" },
          { label: "Telefon", name: "phone" },
          { label: "Oraș", name: "city" },
          { label: "Județ", name: "county" },
          { label: "Stradă", name: "street" },
          { label: "Data nașterii", name: "birth_date", type: "date" },
          { label: "Descriere", name: "description" },
          { label: "Mărime haine", name: "clothing_size" },
          { label: "Mărime pantofi", name: "shoe_size" },
          { label: "Nevoi", name: "needs" }
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
              required={["name", "phone", "city", "county", "street", "birth_date", "description"].includes(name)}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Salvează
        </button>
      </form>
    </div>
    </div>
  );
};

export default General;