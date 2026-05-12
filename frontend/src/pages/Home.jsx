import {
  useNavigate,
} from "react-router-dom";

import collegeLogo from "../assets/collegeLogo.jpg";

import collegeBackground from "../assets/college.jpg";

export default function Home() {

  const navigate =
    useNavigate();

  return (

    <div
      style={{
        minHeight:
          "100vh",

        display:
          "flex",

        flexDirection:
          "column",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          background:
            "white",

          padding:
            "18px 30px",

          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          borderBottom:
            "4px solid #1d4ed8",

          width:
            "100%",

          boxSizing: "border-box"
        }}
      >

        {/* LEFT */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "20px",
          }}
        >

          <img
            src={collegeLogo}
            alt="DEC Logo"

            style={{
              width:
                "110px",

              height:
                "110px",

              objectFit:
                "contain",
            }}
          />

          <div>

            <h1
              style={{
                margin:
                  "0",

                color:
                  "#0b1f59",

                fontSize:
                  "30px",

                fontWeight:
                  "900",

                lineHeight:
                  "1.2",
              }}
            >
              Dhemaji Engineering College
            </h1>

            <p
              style={{
                marginTop:
                  "6px",

                color:
                  "#334155",

                fontSize:
                  "17px",

                fontWeight:
                  "500",
              }}
            >
              A GOVT. OF ASSAM INSTITUTION APPROVED BY AICTE
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <h1
          style={{
            color:
              "#0f172a",

            fontSize:
              "30px",

            fontWeight:
              "900",

            margin:
              "0",

            whiteSpace:
              "nowrap",

            marginTop:
              "0px",
          }}
        >
          DEC PLACEMENT PORTAL
          <br />
        </h1>

      </div>

      {/* MAIN SECTION */}

      <div
        style={{
          padding:
            "40px 0px 0px 0px",

          background:
            `url(${collegeBackground})`,

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          width:
            "100%",
        }}
      >

        {/* CARDS */}

        <div
          style={{
            width:
              "100%",

            padding:
              "0px",

            display:
              "grid",

            gridTemplateColumns:
              "repeat(3, 350px)",

            justifyContent:
              "center",

            gap:
              "20px",
          }}
        >

          {portalCards.map(
            (card) => (

              <div
                key={card.title}

                style={{
                  background:
                    "white",

                  borderRadius:
                    "18px",

                  overflow:
                    "hidden",

                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >

                <div
                  style={{
                    height:
                      "150px",

                    background:
                      `linear-gradient(rgba(37,99,235,0.70), rgba(37,99,235,0.70)), url(${card.image})`,

                    backgroundSize:
                      "cover",

                    backgroundPosition:
                      "center",

                    display:
                      "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  }}
                >

                  <h2
                    style={{
                      color:
                        "#facc15",

                      fontSize:
                        "26px",

                      fontWeight:
                        "900",

                      textAlign:
                        "center",

                      padding:
                        "0 20px",
                    }}
                  >
                    {
                      card.title
                    }
                  </h2>

                </div>

                <div
                  style={{
                    padding:
                      "22px",
                  }}
                >

                  <p
                    style={{
                      color:
                        "#0f172a",

                      lineHeight:
                        "1.8",

                      marginBottom:
                        "25px",

                      minHeight:
                        "90px",

                      fontSize:
                        "18px",
                    }}
                  >
                    {
                      card.description
                    }
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        card.route
                      )
                    }

                    style={{
                      width:
                        "100%",

                      padding:
                        "15px",

                      borderRadius:
                        "999px",

                      border:
                        "none",

                      background:
                        "#2563eb",

                      color:
                        "white",

                      fontWeight:
                        "700",

                      fontSize:
                        "17px",

                      cursor:
                        "pointer",
                    }}
                  >
                    {
                      card.button
                    }
                  </button>

                </div>

              </div>
            )
          )}

        </div>

        {/* FOOTER */}

        <div
          style={{
            background:
              "#07143d",

            color:
              "white",

            padding:
              "35px 50px",

            marginTop:
              "40px",

            marginBottom:
              "0",

            flex:
              "1",

            borderTop:
              "4px solid #1d4ed8",
          }}
        >

          <div
            style={{
              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              flexWrap:
                "wrap",

              gap:
                "30px",
            }}
          >

            {/* LEFT */}

            <div>

              <h2
                style={{
                  margin:
                    "0 0 10px 0",

                  fontSize:
                    "28px",

                  fontWeight:
                    "800",
                }}
              >
                Dhemaji Engineering College
              </h2>

              <p
                style={{
                  margin:
                    "0",

                  color:
                    "#cbd5e1",

                  lineHeight:
                    "1.8",

                  fontSize:
                    "16px",
                }}
              >
                Tekjuri, Railway Station Road
                <br />
                Dhemaji, Assam - 787057
                <br />
                Email: dhemajiec@gmail.com
              </p>

            </div>

            {/* RIGHT */}

            <div
              style={{
                textAlign:
                  "right",
              }}
            >

              <h2
                style={{
                  margin:
                    "0 0 10px 0",

                  fontSize:
                    "24px",

                  fontWeight:
                    "800",
                }}
              >
                DEC Placement Portal
              </h2>

              <p
                style={{
                  color:
                    "#cbd5e1",

                  lineHeight:
                    "1.8",

                  fontSize:
                    "15px",

                  margin:
                    "0",
                }}
              >
                Smart Placement Management System
                <br />
                For Students, Recruiters & Placement Cell
              </p>

            </div>

          </div>

          <hr
            style={{
              margin:
                "30px 0",

              border:
                "1px solid rgba(255,255,255,0.1)",
            }}
          />

          <p
            style={{
              textAlign:
                "center",

              margin:
                "0",

              color:
                "#94a3b8",

              fontSize:
                "15px",
            }}
          >
            © 2026 Dhemaji Engineering College • All Rights Reserved
          </p>

        </div>

      </div>

    </div>
  );
}

const portalCards = [

  {
    title:
      "Job Search",

    description:
      "Search and apply for placement opportunities offered by recruiters visiting Dhemaji Engineering College.",

    button:
      "Student Login",

    route:
      "/login",

    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title:
      "Training & Placement",

    description:
      "Access placement training resources, aptitude preparation, interview guidance and campus updates.",

    button:
      "Student Registration",

    route:
      "/register",

    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title:
      "Recruiter Zone",

    description:
      "Companies can register, post jobs and manage campus recruitment drives.",

    button:
      "Recruiter Register",

    route:
      "/recruiter-login",

    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title:
      "Interview Experiences",

    description:
      "Learn from seniors by reading experiences and preparation tips.",

    button:
      "View Experiences",

    route:
      "/experiences",

    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title:
      "Placement Leaderboard",

    description:
      "Track highest packages, top recruiters and placement statistics.",

    button:
      "View Leaderboard",

    route:
      "/leaderboard",

    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title:
      "Resume Builder",

    description:
      "Upload resumes, improve profiles and prepare for placements.",

    button:
      "Get Started",

    route:
      "/resume-builder",

    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
];