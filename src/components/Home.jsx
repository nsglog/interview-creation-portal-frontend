import React, { useEffect, useState } from "react";
import InterviewService from "../services/InterviewService";
import {Link} from "react-router-dom";

const Home = () => {

    const [interviewList, setInterviewList] = useState([]);
    const [msg, setMsg] = useState("");
    useEffect(() => {init();}, []);

    const init = () => {
        InterviewService.getInterview()
                    .then((res) => {console.log(res.data);
                                    setInterviewList(res.data.interviewList);})
                    .catch((error) => {console.log(error);});
    };

    const deleteInterview = (id) => {
        InterviewService.deleteInterview(id)
                    .then((res) => {setMsg("Delete Sucessfully");
                                    init();
                                    })
                    .catch((error) => { console.log(error);});
    };


    return (
        <div className="container">
            <h1 className="text-center mt-3">Scheduled Interviews</h1>
            <table className="table mt-5">
                <thead className="bg-light">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">startTime</th>
                        <th scope="col">endTime</th>
                        <th scope="col">bookedBy</th>
                        <th scope="col">bookedWith</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewList.map((e, num) => (
                        <tr>
                        <td>{e.id}</td>
                        <td>{e.startTime}</td>
                        <td>{e.endTime}</td>
                        <td>{e.bookedBy.e_mail}</td>
                        <td>{e.bookedWith.e_mail}</td>
                        <td>
                            <Link to={`/interview/${e.id}`} className="btn btn-sm btm-primary">edit</Link>
                            {/* <a className="btn btn-sm btm-danger ms-2">delete</a> */}

                        </td>
                        </tr>
                    ))}

                    </tbody>
            </table>
        </div>
    )
}
export default Home