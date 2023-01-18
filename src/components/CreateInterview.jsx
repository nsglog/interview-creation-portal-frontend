import React, { useState } from "react";
import InterviewService from "../services/InterviewService";

const CreateInterview = () => {
  const [interview, setInterview] = useState({
    requestedById: "",
    requestedToId: "",
    startTime: "",
    endTime: "",
  });

  const [user, setUser] = useState([]);
  const [msg, setMsg] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((results) => results.json())
      .then((data) => {
        setUser((previousList) => [...data.userList]);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    let itv = interview;
    itv[e.target.name] = e.target.value;
    setInterview({ ...interview, [e.target.name]: value });
    console.dir(interview);
  };

  const submitInterview = (e) => {
    e.preventDefault();

    InterviewService.saveInterview(interview)
      .then((res) => {
        setMsg(res.data.message);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setInterview({
      requestedById: "",
      requestedToId: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">
              CreateInterview
              {msg && <p className="text-success">{msg}</p>}
            </div>

            <div className="card-body">
              <form onSubmit={submitInterview}>
                <div className="mb-3">
                  <label>Requesting User</label>
                  <select
                    className="form-control"
                    value={interview.requestedById}
                    onChange={handleChange}
                    name="requestedById"
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
                  <label>Requested User</label>
                  <select
                    className="form-control"
                    value={interview.requestedToId}
                    onChange={handleChange}
                    name="requestedToId"
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
                  <label>startDateAndTime</label>
                  <input
                    type="text"
                    className="form-control"
                    name="startTime"
                    value={interview.startTime}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label>endDateAndTime</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endTime"
                    value={interview.endTime}
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
  );
};

export default CreateInterview;
