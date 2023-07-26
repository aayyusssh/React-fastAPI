import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGetData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get_data/");
      setData(response.data);
      console.log(data)
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Xlsx Data Upload and Display</h1>
      <div className="flex items-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded transition-colors duration-300"
          onClick={handleUpload}
        >
          Upload Data
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded transition-colors duration-300"
          onClick={handleGetData}
        >
          Get Data
        </button>
      </div>
      <p className="text-green-500 font-bold mb-4">{message}</p>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">DateTime</th>
            <th className="px-4 py-2">Close</th>
            <th className="px-4 py-2">High</th>
            <th className="px-4 py-2">Low</th>
            <th className="px-4 py-2">Open</th>
            <th className="px-4 py-2">Volume</th>
            <th className="px-4 py-2">Instrument</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.datetime} className="transition-opacity duration-300 hover:opacity-75">
              <td className="border px-4 py-2">{row.datetime}</td>
              <td className="border px-4 py-2">{row.close}</td>
              <td className="border px-4 py-2">{row.high}</td>
              <td className="border px-4 py-2">{row.low}</td>
              <td className="border px-4 py-2">{row.open}</td>
              <td className="border px-4 py-2">{row.volume}</td>
              <td className="border px-4 py-2">{row.instrument}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default App;