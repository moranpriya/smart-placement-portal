import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

export default function EditProfile() {

  const navigate =
    useNavigate();

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [formData,
    setFormData] =
    useState({
      name:
        storedUser.name || "",

      branch:
        storedUser.branch || "",

      cgpa:
        storedUser.cgpa || "",

      batch:
        storedUser.batch || "",
    });

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave =
    () => {

      const updatedUser = {
        ...storedUser,
        ...formData,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert(
        "Profile Updated Successfully"
      );

      navigate("/dashboard");
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        display:
          "flex",

        flexWrap: "wrap",

        justifyContent:
          "center",

        alignItems:
          "center",
      }}
    >

      <div
        style={{
          width:
            "450px",

          background:
            "rgba(255,255,255,0.1)",

          padding:
            "40px",

          borderRadius:
            "20px",

          backdropFilter:
            "blur(10px)",
        }}
      >

        <h1
          style={{
            color:
              "white",

            marginBottom:
              "25px",
          }}
        >
          Edit Profile
        </h1>

        {[
          "name",
          "branch",
          "cgpa",
          "batch",
        ].map((field) => (

          <input
            key={field}

            type="text"

            name={field}

            placeholder={field}

            value={
              formData[field]
            }

            onChange={
              handleChange
            }

            style={{
              width:
                "100%",

              padding:
                "14px",

              marginBottom:
                "15px",

              borderRadius:
                "12px",

              border:
                "none",

              background:
                "#1e293b",

              color:
                "white",

              boxSizing:
                "border-box",
            }}
          />
        ))}

        <button
          onClick={
            handleSave
          }

          style={{
            width:
              "100%",

            padding:
              "14px",

            border:
              "none",

            borderRadius:
              "12px",

            background:
              "#2563eb",

            color:
              "white",

            fontWeight:
              "700",

            cursor:
              "pointer",
          }}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}