import { useState } from "react";
import ReqUrl from "../components/ReqUrl";
import axios from "axios";
import ShowResponse from "../components/ShowResponse";
import HeadersAndParams from "../components/HeadersAndParams";
export default function HomePage() {
  const [selected, setSelected] = useState({
    method: "",
    url: "",
    headers: [{ key: "", value: "" }],
    params: [{ key: "", value: "" }],
  });
  const [response, setResponse] = useState(null);
  const handleSendApi = async () => {
    try {
      let headersObj = {};
      selected.headers.map((item) => {
        headersObj = { ...headersObj, [item.key.trim()]: item.value };
      });
      let paramsObj = {};
      selected.params.map((item) => {
        paramsObj = { ...paramsObj, [item.key.trim()]: item.value };
      });
      const apiRes = await axios({
        method: selected.method,
        url: selected.url,
        headers: headersObj,
        params: paramsObj,
      });
      setResponse(apiRes);
    } catch (error) {
      console.log("error", error);
      setResponse(error);
    }
  };
  return (
    <div>
      <div>
        <ReqUrl
          selected={selected}
          setSelected={setSelected}
          handleSendApi={handleSendApi}
        />
      </div>
      <div>
        <HeadersAndParams
          key={"headers-key"}
          selected={selected}
          setSelected={setSelected}
          type="headers"
        />
      </div>
      <div>
        <HeadersAndParams
          key={"params-key"}
          selected={selected}
          setSelected={setSelected}
          type="params"
        />
      </div>
      <div>
        <ShowResponse response={response} />
      </div>
    </div>
  );
}
