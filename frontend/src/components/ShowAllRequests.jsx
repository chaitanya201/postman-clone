import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";

export default function ShowAllRequests({}) {
  const [allRequests, setAllRequests] = useState([]);
  const [singleRequestData, setSingleRequestData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get`);
        setAllRequests(res.data.data);
      } catch (error) {
        console.log("error", error);
        setAllRequests([]);
      }
    };
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
  return (
    <div>
      <div>
        {allRequests.map((req) => {
          return (
            <button
              key={req._id}
              onClick={() => {
                handleClick(req._id);
              }}
            >
              {req.title.length > 16
                ? req.title.slice(0, 16) + ".."
                : req.title}
            </button>
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
            <div>
              <h3>Headers</h3>
              <div>
                {singleRequestData.headers.headers.map((header) => {
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
            {/* <div>
              <h3>Params</h3>
              <div>
                {singleRequestData.params.params.map((header) => {
                  return (
                    <div key={header._id}>
                      <div>{header.key}</div>
                      <div>{header.value}</div>
                    </div>
                  );
                })}
              </div>
            </div> */}

            {/* Body code */}
            {/* <div>
              <h3>Headers</h3>
              <div>
                {singleRequestData.headers.headers.map((header) => {
                  return (
                    <div key={header._id}>
                      <div>{header.key}</div>
                      <div>{header.value}</div>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
