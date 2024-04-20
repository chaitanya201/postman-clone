import { useState } from "react";
import ReqUrl from "../components/ReqUrl";
import axios from "axios";
import ShowResponse from "../components/ShowResponse";
import Body from "../components/Body";
import { BASE_URL, safeParse } from "../utils";
import { Link } from "react-router-dom";
import HeadersAndParams from "../components/HeadersAndParams";
import "../CSS/HomePage.css";
import AddReq from "../components/AddReq";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [selected, setSelected] = useState({
    method: "get",
    url: "",
    headers: [],
    params: [],
    body: "",
    title: "",
    description: "",
  });
  const [response, setResponse] = useState(null);
  const [currentSelectedOption, setCurrentSelectedOption] = useState({
    option: "headers",
    component: HeadersAndParams,
  });

  const OPTIONS = {
    headers: HeadersAndParams,
    params: HeadersAndParams,
    body: Body,
  };

  const handleSendApi = async () => {
    try {
      let headersObj = {};
      selected.headers.map((item) => {
        if (item.key.trim().length > 0) {
          headersObj = { ...headersObj, [item.key.trim()]: item.value };
        }
      });
      let paramsObj = {};
      selected.params.map((item) => {
        if (item.key.trim().length > 0) {
          paramsObj = { ...paramsObj, [item.key.trim()]: item.value };
        }
      });
      console.log("before  apiRes......... ");
      const apiRes = await axios({
        method: selected.method,
        url: selected.url,
        headers: headersObj,
        params: paramsObj,
        data: safeParse(selected.body),
      });
      console.log("API Res-------------->", apiRes);
      toast.success("Request Sent Successfully.");
      setResponse(apiRes);
    } catch (error) {
      console.log("error--------->", error);
      toast.error(error.message || "Something went wrong.");
      setResponse(error);
    }
  };

  const handleSaveReq = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, { ...selected });
      if (!res.data.status) {
        toast.error("Something went wrong..");
        setResponse([]);
        return;
      }
      toast("Request added!!", { type: "success" });
      window.location.reload();
    } catch (error) {
      console.log("err..", error);
      toast.error("Something went wrong..");
    }
  };

  return (
    <div className="allElements">
      <ToastContainer />

      <div className="saveShow">
        {/* <div className="ShowRequests">
          <Link to={"/view-reqs"}>Show Requests</Link>
        </div> */}
        <div className="save">
          <button className="saveReqBtn" onClick={handleSaveReq}>
            Save Request
          </button>
        </div>
        {/* <div>
          <AddReq />
        </div> */}
      </div>
      <div className="middlePart">
        {/* <form> */}
        {/* / */}
        <div className="titDesc">
          <div>
            <input
              type="text"
              value={selected.title}
              placeholder="Title"
              onChange={(e) => {
                selected.title = e.target.value;
                setSelected({ ...selected });
              }}
            />
          </div>
          {/*  */}
          {/*  */}
          <div className="description">
            <input
              type="text"
              value={selected.description}
              placeholder="description"
              onChange={(e) => {
                selected.description = e.target.value;
                setSelected({ ...selected });
              }}
            />
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div className="ReqUrl">
          <ReqUrl
            selected={selected}
            setSelected={setSelected}
            handleSendApi={handleSendApi}
          />
        </div>
        {/*  */}
        {/* / */}
        {/* </form> */}
        <div className="listItems">
          <ul>
            {Object.keys(OPTIONS).map((option) => {
              return (
                <li key={option}>
                  <button
                    className={
                      currentSelectedOption.option === option
                        ? "selectedHeader"
                        : "headers"
                    }
                    onClick={() => {
                      setCurrentSelectedOption({
                        option,
                        component: OPTIONS[option],
                      });
                    }}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* flex end */}
      <div className="option">
        <currentSelectedOption.component
          key={currentSelectedOption.option}
          selected={selected}
          setSelected={setSelected}
          type={currentSelectedOption.option}
        />
      </div>

      <div>
        <ShowResponse response={response} />
      </div>
    </div>
  );
}
