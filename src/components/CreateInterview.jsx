import React, { useState } from "react";
import InterviewService from "../services/InterviewService";

const CreateInterview = () => {
    const [interview, setInterview] = useState({
        requestedById: "",
        requestedToId: "",  
        startTime: "",
        endTime: ""
      
    });

    const [msg, setMsg] = useState("");
  
    const handleChange = (e) => {
        const value = e.target.value;
        setInterview({ ...interview, [e.target.name]: value });
      };
  
    const submitInterview = (e) => {
      e.preventDefault();
  
      InterviewService
        .saveInterview(interview)
        .then((res) => {
          setMsg("Interview Added Sucessfully");
          setInterview({
            requestedById: "",
            requestedToId: "",
            startTime: "",
            endTime: "",
          });
        })
        .catch((error) => {
          console.log(error);
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
                <form onSubmit= {(e) => submitInterview(e)}>
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
  
                  <div className="mb-3">
                    <label>requestBy</label>
                    <input
                      type="number"
                      className="form-control"
                      name="requestedById"
                      value={interview.requestedById}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
  
                  <div className="mb-3">
                    <label>requestTo</label>
                    <input
                      type="number"
                      className="form-control"
                      name="requestedToId"
                      value={interview.requestedToId}
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
    );
  };
  
  export default CreateInterview;
