import axios from "axios";
import "../CSS/ShowRequests.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
export default function ShowAllRequests() {
  const [allRequests, setAllRequests] = useState([]);
  const [singleRequestData, setSingleRequestData] = useState(null);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get`);
      setAllRequests(res.data.data);
    } catch (error) {
      console.log("error======>", error);
      setAllRequests([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (allRequests.length === 0) {
    return <div>No data found</div>;
  }

  const handleClick = async (_id) => {
    try {
      const res = await axios.get(`${BASE_URL}/get?id=${_id}`);
      if (!res.data.status) {
        setSingleRequestData(null);
        return;
      }
      setSingleRequestData(res.data.data);
    } catch (error) {
      setSingleRequestData(null);
      console.log("error ", error);
    }
  };

  const handleEdit = async (data) => {
    console.log("data ", data);
    try {
      const res = await axios.post(`${BASE_URL}/update`, data);
      console.log("res ", res);
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleDelete = async (id) => {
    console.log("data ", id);
    try {
      const res = await axios.delete(`${BASE_URL}/delete?_id=${id}`);
      if (res.data.status) {
        fetchData();
        return;
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  return (
    <div>
      <div>
        {allRequests.map((req) => {
          return (
            <div key={req._id}>
              <button
                onClick={() => {
                  handleClick(req._id);
                }}
              >
                {req.title.length > 16
                  ? req.title.slice(0, 16) + ".."
                  : req.title}
              </button>
              <button
                onClick={() => {
                  handleEdit(req);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(req._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {!singleRequestData ? (
          <div>No Data Found.</div>
        ) : (
          <div>
            <div>{singleRequestData.request.method}</div>
            <div>{singleRequestData.request.url}</div>
            {/*  */}
            <div className="options">
              <div className="HeadersP">
                <h3 className="Headers">Headers</h3>
                <div className="opt">
                  {singleRequestData.headers.map((header) => {
                    return (
                      <div key={header._id}>
                        <div>{header.key}</div>
                        <div>{header.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Do same for params */}
              <div>
                <h3>Params</h3>
                <div className="opt">
                  {singleRequestData.params.map((header) => {
                    return (
                      <div key={header._id}>
                        <div>{header.key}</div>
                        <div>{header.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Body code */}
              <div className="bodyData">
                <h3 className="Body">Body</h3>
                <div className="opt">
                  {singleRequestData.body ? (
                    JSON.stringify(singleRequestData.body || null, null, 2)
                  ) : (
                    <div>No data in body </div>
                  )}
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        )}
      </div>
    </div>
  );
}
