import axios from "axios";

import AuthService from "./auth.service";

const API_URL = "http://127.0.0.1:8000/api/";


const create = (name, type) => {
  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  
//   const config = {
//     headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2NTc0MzU5LCJqdGkiOiIyMDY4Mjc3NjM4NGQ0MjZkYWE5YjU2ZDM2N2QxMTM2ZSIsInVzZXJfaWQiOjF9.55ArrGp42iWzF_YHTCHy8QmWfUetECDTqCOJR_do9WE` }
// };

  var UrlType = '';
  var data = {};

  if (type === 'department') {
    UrlType = 'department/';
    data = {'name': name};
  }else if (type === 'doctor') {
    UrlType = 'doctor/';
    data = {'name': name};
  }
  else if (type === 'patient') {
    UrlType = 'patient/';
    data = {'name': name};
  }
  else{
    console.log('elseeeee');
  }

  // return axios.post(API_URL + UrlType, config, {
  //  name
  // });


  return axios.post(API_URL + UrlType, data, {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});
};


const createInterval = (name, startTime, endTime) => {
  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  
//   const config = {
//     headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2NTc0MzU5LCJqdGkiOiIyMDY4Mjc3NjM4NGQ0MjZkYWE5YjU2ZDM2N2QxMTM2ZSIsInVzZXJfaWQiOjF9.55ArrGp42iWzF_YHTCHy8QmWfUetECDTqCOJR_do9WE` }
// };

  var UrlType = 'interval/';
  var data = {
    'name': name,
    'start_time': startTime,
    'end_time': endTime
  };


  return axios.post(API_URL + UrlType, data, {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});
};


const createSchedule = (scheduleData) => {
  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  
//   const config = {
//     headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2NTc0MzU5LCJqdGkiOiIyMDY4Mjc3NjM4NGQ0MjZkYWE5YjU2ZDM2N2QxMTM2ZSIsInVzZXJfaWQiOjF9.55ArrGp42iWzF_YHTCHy8QmWfUetECDTqCOJR_do9WE` }
// };

  var UrlType = 'schedule/';
  // var data = {
  //   'name': name,
  //   'start_time': startTime,
  //   'end_time': endTime
  // };


  return axios.post(API_URL + UrlType, scheduleData, {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});
};


const retrieveDepartments = () => {
  // return axios.get(API_URL + "department/");

  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  return axios.get(API_URL + 'department/', {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});

};


const retrieveDoctors = () => {
  // return axios.get(API_URL + "department/");

  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  return axios.get(API_URL + 'doctor/', {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});

};


const retrievePatients = () => {
  // return axios.get(API_URL + "department/");

  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  return axios.get(API_URL + 'patient/', {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});

};


const retrieveTimeIntervals = () => {
  // return axios.get(API_URL + "department/");

  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  return axios.get(API_URL + 'interval/', {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});

};

const retrieveSchedules = () => {
  // return axios.get(API_URL + "department/");

  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.access;

  return axios.get(API_URL + 'schedule/', {
    headers: {
        'Authorization': `Bearer ` + token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
});

};


// const logout = () => {
//   localStorage.removeItem("user");
//   return axios.post(API_URL + "signout").then((response) => {
//     return response.data;
//   });
// };

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

const SchedulerService = {
  create,
  createInterval,
  createSchedule,
  retrieveDepartments,
  retrieveDoctors,
  retrievePatients,
  retrieveTimeIntervals,
  retrieveSchedules
}

export default SchedulerService;
