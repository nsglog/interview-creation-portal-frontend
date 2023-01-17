import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InterviewService from "../services/InterviewService";

const EditInterview = () => {
  const [interview, setInterview] = useState({
    bookWithId: "",
    newStartTime: "",
    newEndTime: ""
  });

  const [msg, setMsg] = useState("");

  const params = useParams();
  const navigate = useNavigate();

//   useEffect(() => {
//     InterviewService
//       .getInterviewById(data.id)
//       .then((res) => {
//         setInterview(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInterview({ ...interview, [e.target.name]: value });
  };

  const updateInterview = (e) => {
    e.preventDefault();
    console.log(params.id, interview);
  
    InterviewService
      .updateInterview(params.id, {...interview, id: params.id })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header text-center fs-3">
                Edit
                {msg && <p className="text-success">{msg}</p>}
              </div>

              <div className="card-body">
                <form onSubmit={(e) => updateInterview(e)}>
                  <div className="mb-3">
                    <label>User Id To Book</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bookWithId"
                      value={interview.bookWithId}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter New Start time</label>
                    <input
                      type="text"
                      className="form-control"
                      name="newStartTime"
                      value={interview.newStartTime}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter New End time</label>
                    <input
                      type="text"
                      className="form-control"
                      name="newEndTime"
                      value={interview.newEndTime}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="text-center">
                    <button className="btn btn-success">Submit</button>
                    <input
                      type="Reset"
                      className="btn btn-danger ms-2"
                      value="Reset"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInterview;
