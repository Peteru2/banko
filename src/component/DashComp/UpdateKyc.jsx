import React, { useState, useEffect } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { useAuth } from "../AuthContext.jsx";


const UpdateKyc = ({ onClose }) => {
  const {fetchData, setUserData} = useAuth()
  const [bvn, setBVN] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericRegex = /^\d+$/;
    if (bvn.length < 10 || bvn.length > 10) {
      toast.error("Invalid BVN Pin", {
        position: "top-right",
      });
    } else if (!numericRegex.test(bvn)) {
      toast.error("Invalid BVN Pin", {
        position: "top-right",
      });
    } else {
      try {


        setUserData((prev) => ({
      ...prev,
      bvn: bvn,
    }));
         await api.put("/updatekyc", { bvn });

        onClose();

        // const response = await api.put("/updatekyc", { bvn });
        // const userResponse = await api.get("/");
        // toast.success(response.data.message, {
        //   position: "top-right",
        // });
    //     toast.success("Transaction Pin updated", {
    //   position: "top-right",
    // });
        console.log("KYC Level Upgraded");
        setBVN("");
       
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1200);

      } catch (error) {
        if (error.response.status === 401) {
          toast.error(error.response.data.error, {
            position: "top-right",
          });
        } else {
          toast.error(error.response.data.error, {
            position: "top-right",
          });
          onClose();
          setBVN("");
        }
      }
    }
  };

  return (
    <div className="bg-white w-[250px] p-4 rounded-[8px] shadow-lg">
      <div className="flex w-full ">
        <h2 className=" font-bold">Enter Your BVN</h2>
        <span className="ml-auto" onClick={onClose}>
          <i className="fa fa-times cursor-pointer"></i>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="bvn"
            value={bvn}
            onChange={(e) => setBVN(e.target.value)}
            required
            placeholder="Bank Verification Number"
            className="border-[1px] rounded-md px-2 py-2 my-2 border-gray  w-full rounded-md outline-none"
          />
        </div>
        <button
          className="text-center w-full bg-private text-white rounded-md py-2"
          type="submit "
        >
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateKyc;
