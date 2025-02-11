import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext"; // Correct the import as per your actual context path
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Myprofile = () => {
  const { userData, setuserData, backend_url, loaduserprofile, token } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // const address = userData.address || {}; // Fallback to an empty object if address is undefined
  const updateprofile = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", userData.name);
      formdata.append("phone", userData.phone);
      formdata.append("address", JSON.stringify(userData.address));
      formdata.append("gender", userData.gender);
      formdata.append("dob", userData.dob);
      image && formdata.append("image", image);

      const { data } = await axios.post(
        backend_url + "/api/user/update-profile",
        formdata,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loaduserprofile();
         setIsEdit(false);
         setImage(false);
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className=" flex flex-col max-w-lg gap-2 text-sm">

        {/* Image section */}
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="profile"
              />

              {!image && (
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={assets.upload_icon}
                  alt="upload profile"
                />
              )}
            </div>
            <input
              onChange={(e)=>setImage(e.target.files[0])}
              type="file"
              id="image"
              name="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="profile" />
        )}

        {/* Name section */}
        {isEdit ? (
          <input
            className="text-3xl bg-gray-50 font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setuserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        {/* Contact Information */}
        <div>
          <p className="text-neutral-500 underline mt-5">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr]">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            {/* Address section */}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                <input
                  className="bg-gray-50"
                  type="text"
                  onChange={(e) =>
                    setuserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  onChange={(e) =>
                    setuserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                />
              </div>
            ) : (
              <div>
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="text-neutral-500 underline mt-3">
          <p>BASIC INFORMATION</p>

          {/* Gender section */}
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            {/* Birthday section */}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Edit/Save button */}
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateprofile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Myprofile;
{
  /* <button 
                className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' 
                onClick={() => setIsEdit(false)} */
}
