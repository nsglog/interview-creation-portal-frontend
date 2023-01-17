import axios from "axios";

const BASE_API_URL = "http://localhost:8080/interview"

class InterviewService {

    saveInterview (interview)   {

        return axios.post(BASE_API_URL, interview)
    }

    getInterview ()    {
        return axios.get(`${BASE_API_URL}`)
    }

    updateInterview (id, interview) {
        return axios.put(`${BASE_API_URL}/${id}`, interview);
    }

}

export default new InterviewService();