import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InterviewService from "../services/InterviewService";

const EditInterview = () => {
  const [interview, setInterview] = useState({
    bookWithId: "",
    newStartTime: "",
    newEndTime: "",
  });

  const [msg, setMsg] = useState("");

  const [user, setUser] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((results) => results.json())
      .then((data) => {
        setUser((previousList) => [...data.userList]);
      });
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    let itv = interview;
    itv[e.target.name] = e.target.value;
    setInterview({ ...interview, [e.target.name]: value });
    console.dir(interview);
  };

  const updateInterview = (e) => {
    e.preventDefault();
    console.log(params.id, interview);

    InterviewService.updateInterview(params.id, { ...interview, id: params.id })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setInterview({
      bookWithId: "",
      newStartTime: "",
      newEndTime: "",
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
                  {/* <div className="mb-3">
                    <label>User Id To Book</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bookWithId"
                      value={interview.bookWithId}
                      onChange={(e) => handleChange(e)}
                    />
                  </div> */}

                  <div className="mb-3">
                    <label> Select User to Book Interview With</label>
                    <select
                      className="form-control"
                      value={interview.bookWithId}
                      onChange={handleChange}
                      name="bookWithId"
                    >
                      <option value="" selected={true} disabled>
                        Choose here
                      </option>
                      {user.map((usr) => (
                        <option key={usr.id} value={usr.id}>
                          {usr.e_mail}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Enter New Start time</label>
                    <input
                      type="text"
                      className="form-control"
                      name="newStartTime"
                      value={interview.newStartTime}
                      onChange={handleChange}
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
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={resetForm}
                    >
                      Reset
                    </button>
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
