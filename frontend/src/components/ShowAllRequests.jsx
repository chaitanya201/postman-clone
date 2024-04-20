import axios from "axios";
import "../CSS/ShowRequests.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import AddReq from "./AddReq";
import DeleteImage from "../Images/Delete.jpg";
export default function ShowAllRequests() {
  const [allRequests, setAllRequests] = useState([]);
  const [singleRequestData, setSingleRequestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/get`);
      setAllRequests(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error======>", error);
      setAllRequests([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    alert("edit is not possible as of now....");
    console.log("data ", data);
    try {
      const res = await axios.post(`${BASE_URL}/update`, data);
      console.log("res ", res);
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleDelete = async (id) => {
    alert("deleting......");
    // alert("")
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

  if (loading) {
    return <div>Loading...........</div>;
  }

  if (allRequests.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <AddReq />
      <div>
        {allRequests.map((req) => {
          return (
            <div>
              <div className="titEditDel" key={req._id}>
                <button
                  className="title"
                  onClick={() => {
                    handleClick(req._id);
                  }}
                >
                  {req.title.length > 16
                    ? req.title.slice(0, 16) + ".."
                    : req.title}
                </button>
                <button
                  className="edit"
                  onClick={() => {
                    handleEdit(req);
                  }}
                >
                  Edit
                </button>

                <button
                  className="deleteB"
                  onClick={() => {
                    handleDelete(req._id);
                  }}
                >
                  {/* Delete */}
                  {/* <img src={Delete} alt="delete"></img> */}
                  <img className="delete" src={DeleteImage} alt="Delete" />
                </button>

                {/* <AddReq /> */}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {!singleRequestData ? (
          <div>No Data Found.</div>
        ) : (
          <div className="reqData">
            <table className="table2">
              <tr>
                <th>
                  <h3>
                    <div>{singleRequestData.request.method}</div>
                  </h3>
                </th>
              </tr>
              <tr>
                <td>
                  <div>{singleRequestData.request.url}</div>
                </td>
              </tr>
            </table>

            {/*  */}
            <div className="options">
              <table className="table tableData">
                <div className="HeadersP">
                  <th>
                    <h3 className="Headers">Headers</h3>
                  </th>
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
              </table>
              {/* Do same for params */}
              <table className="table tableData">
                <div>
                  <h3>Params</h3>
                  <div className="opt">
                    {singleRequestData.params.map((header) => {
                      return (
                        <tr>
                          <div key={header._id}>
                            <td>
                              <div>{header.key}</div>
                            </td>
                            <div>{header.value}</div>
                            <td></td>
                          </div>
                        </tr>
                      );
                    })}
                  </div>
                </div>
              </table>

              {/* Body code */}
              <table className=" table tableData">
                <div className="bodyData ">
                  <th>
                    <h3 className="Body">Body</h3>
                    <br></br>
                  </th>
                  <div className="opt">
                    {singleRequestData.body ? (
                      JSON.stringify(singleRequestData.body || null, null, 2)
                    ) : (
                      // <tr>
                      <td>
                        <div>No data in body </div>
                      </td>
                      // </tr>
                    )}
                  </div>
                </div>
              </table>
            </div>
            {/*  */}
          </div>
        )}
      </div>
    </div>
  );
}
