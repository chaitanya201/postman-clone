import { useState } from "react";
import ReqUrl from "../components/ReqUrl";
import axios from "axios";
import ShowResponse from "../components/ShowResponse";
import HeadersAndParams from "../components/HeadersAndParams";
import Body from "../components/Body";
import { BASE_URL, safeParse } from "../utils";
import { Link } from "react-router-dom";
export default function HomePage() {
  const [selected, setSelected] = useState({
    method: "get",
    url: "",
    headers: [{ key: "", value: "" }],
    params: [{ key: "", value: "" }],
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
      const apiRes = await axios({
        method: selected.method,
        url: selected.url,
        headers: headersObj,
        params: paramsObj,
        data: safeParse(selected.body),
      });
      setResponse(apiRes);
    } catch (error) {
      console.log("error", error);
      setResponse(error);
    }
  };

  const handleSaveReq = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, { ...selected });
      if (!res.data.status) {
        console.log("error in data saving...");
      }
    } catch (error) {
      console.log("err..", error);
    }
  };

  return (
    <div>
      <div>
        <Link to={"/view-reqs"}>Show Requests</Link>
      </div>
      <div>
        <button onClick={handleSaveReq}>Save Request</button>
      </div>
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
      <div>
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
      <div>
        <ReqUrl
          selected={selected}
          setSelected={setSelected}
          handleSendApi={handleSendApi}
        />
      </div>
      <ul>
        {Object.keys(OPTIONS).map((option) => {
          return (
            <li key={option}>
              <button
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
      <div>
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
