import React, { useState, useEffect, useRef } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import PropTypes from "prop-types";
import ReactTable from "react-table";

import { makeData } from "../common/util";
import Pagination from "../common/Pagination";

import axios from "axios";
import Table from "../common/TableContainer";
import { SelectColumnFilter } from "../common/Filter";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import Select from "react-validation/build/select";

import Select from 'react-select'


import CheckButton from "react-validation/build/button";
import SchedulerService from "../services/scheduler.service";


import TimeRange from 'react-time-range';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";

import jsPDF from "jspdf";
import "jspdf-autotable";


const ref = React.createRef();

const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [4,2]
};


// import "react-table/react-table.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const ScheduleManager = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [departmentsData, setDepartmentsData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [intervalsData, setIntevalsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputVal] = useState("");
  const [inputType, setInputType] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [intervalName, setTimeIntervalName] = useState("");
  
  const [sessionInputValue, setSessionInputValue] = useState("");
  const [departmenSelected, setDepartmentSelected] = useState("");
  const [doctorSelected, setDoctorSelected] = useState("");
  const [patientSelected, setPatientSelected] = useState("");
  const [intervalSelected, setIntervalSelected] = useState("");

  const [sessionDate, setSessionDate] = useState(new Date());
  

  const [departmentSelectOptions, setDepartmentSelectOptions] = useState([]);
  const [doctorSelectOptions, setDoctorSelectOptions] = useState([]);
  const [patientSelectOptions, setPatientSelectOptions] = useState([]);
  const [intervalSelectOptions, setIntervalSelectOptions] = useState([]);

  const [schedulesData, setSchedulesData] = useState([]);
  const [reportDate, setReportData] = useState(new Date());

  
  // <option value='department'>Department</option>
  // <option value='doctor'>Doctor</option>
  // <option value='patient'>Patient</option>

  const typeOptions = [
    { value: 'department', label: 'Department' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'patient', label: 'Patient' }
  ];

  const people = [
    { name: "Keanu Reeves", profession: "Actor" },
    { name: "Lionel Messi", profession: "Football Player" },
    { name: "Cristiano Ronaldo", profession: "Football Player" },
    { name: "Jack Nicklaus", profession: "Golf Player" },
  ];


  useEffect(() => {

    // setLoading(t);

    const fetchData = async () => {


      const processIntervalsData = (inputData) => {
        var result = [];
        let intervalDict = {};
        let status = 'Inactive';


        inputData.map((a) => {
          // const capitalizedName = a.name[0].toUpperCase() + a.name.slice(1);
          // return `${captalizedName} image - ${a.width} x ${a.height}`;
          console.log(a.start_time);
          console.log(a.end_time)
          if (a.is_active) {
            status = 'Active';
          }
          intervalDict = {
            'id': a.id,
            'name': a.name,
            'interval': a.start_time + '-' + a.end_time,
            'updated': a.updated,
            'status': status
          }
          result.push(intervalDict);
          return result;
        });

        return result;

      }

      const processOtherTableData = (inputData) => {
        var result = [];
        let tableDict = {};
        let status = 'Inactive';

        inputData.map((a) => {
          // const capitalizedName = a.name[0].toUpperCase() + a.name.slice(1);
          // return `${captalizedName} image - ${a.width} x ${a.height}`;
          console.log(a.start_time);
          console.log(a.end_time);
          if (a.is_active) {
            status = 'Active';
          }


          tableDict = {
            'id': a.id,
            'name': a.name,
            'status': status,
            'updated': a.updated
          }
          result.push(tableDict);
          return result;
        });

        return result;

      }

      const processSelectData = (inputData) => {
        var selectOptions = [];
        let selectDict = {};


        inputData.map((a) => {
          // const capitalizedName = a.name[0].toUpperCase() + a.name.slice(1);
          // return `${captalizedName} image - ${a.width} x ${a.height}`;
          console.log(a.start_time);
          console.log(a.end_time)
         
          selectDict = {
            'value': a.id,
            'label': a.name
          }
          selectOptions.push(selectDict);
          return selectOptions;
        });

        return selectOptions;

      }
      const processIntervalSelectData = (inputData) => {
        var selectOptions = [];
        let selectDict = {};


        inputData.map((a) => {
          // const capitalizedName = a.name[0].toUpperCase() + a.name.slice(1);
          // return `${captalizedName} image - ${a.width} x ${a.height}`;
          // console.log(a.start_time);
          // console.log(a.end_time)
         
          selectDict = {
            'value': a.id,
            'label': a.start_time + '-' + a.end_time,
          }
          selectOptions.push(selectDict);
          return selectOptions;
        });

        return selectOptions;

      }

      const respIntervals = await SchedulerService.retrieveTimeIntervals().then(
        (res) => {
          // navigate("/profile");
          // window.location.reload();

          var intervalSelectData = processIntervalSelectData(res.data);
          setIntervalSelectOptions(intervalSelectData);

          var prcessedData = processIntervalsData(res.data);
          setIntevalsData(prcessedData);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );

      const respDepartments = await SchedulerService.retrieveDepartments().then(
        (res) => {
          // navigate("/profile");
          // window.location.reload();
          var deptSelectData = processSelectData(res.data);
          setDepartmentSelectOptions(deptSelectData);

          var prcessedData = processOtherTableData(res.data);
          setDepartmentsData(prcessedData);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );

      const respDoctors = await SchedulerService.retrieveDoctors().then(
        (res) => {
          // navigate("/profile");
          // window.location.reload();
          var doctorsSelectData = processSelectData(res.data);
          setDoctorSelectOptions(doctorsSelectData);

          var prcessedData = processOtherTableData(res.data);
          setDoctorsData(prcessedData);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );

      const respPatients = await SchedulerService.retrievePatients().then(
        (res) => {
          // navigate("/profile");
          // window.location.reload();

          var patientSelectData = processSelectData(res.data);
          setPatientSelectOptions(patientSelectData);


          var prcessedData = processOtherTableData(res.data);
          setPatientsData(prcessedData);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );


      const respSchedules = await SchedulerService.retrieveSchedules().then(
        (res) => {
          // navigate("/profile");
          // window.location.reload();

          // var patientSelectData = processSelectData(res.data);
          // setPatientSelectOptions(patientSelectData);


          // var prcessedData = processOtherTableData(res.data);
          // setPatientsData(prcessedData);

          setSchedulesData(res.data);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );



      // const respRepos = await axios(
      //   `https://api.github.com/users/${username}/repos`
      // );

      // setGitData({ data: respGlobal.data, repos: respGlobal.data });
    };

    fetchData();

    // axios("http://api.tvmaze.com/search/shows?q=girls")
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);


  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 40;

    var processDate = moment(reportDate.toLocaleDateString()).format('YYYY-MM-DD')

    let filteredResults = schedulesData.filter(function (schedule) {
      return schedule.schedule_date === processDate;
    });

    console.log(filteredResults);


    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = processDate;
    const headers = [["Name", "Time", "Department", "Case Name", "Doctor"]];

    const data = filteredResults.map(sch=> [sch.name, sch.time_start+ '-' + sch.time_end, sch.department, sch.patient, sch.doctor]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(processDate+"_schedule.pdf")

  }

  const deptColumns = [

    {
      dataField: "id",
      text: "Dept ID",
      sort: true
    },
    {
      text: "Name",
      dataField: "name",
      sort: true
    },
    {
      text: "Status",
      dataField: "status",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Time",
      dataField: "updated",
      sort: true

    },
  ];
  const timeIntervalColumns = [

    {
      dataField: "id",
      text: "Dept ID",
      sort: true
    },
    {
      text: "Name",
      dataField: "name",
      sort: true

    },
    {
      text: "Time",
      dataField: "interval",
      sort: true

    },
    {
      text: "Status",
      dataField: "status",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Time",
      dataField: "updated",
      sort: true

    },
  ];
  const doctorColumns = [
    {
      dataField: "id",
      text: "Dept ID",
      sort: true
    },
    {
      text: "Name",
      dataField: "name",
      sort: true

    },
    {
      text: "Status",
      dataField: "status",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Time",
      dataField: "updated",
      sort: true

    },
  ];
  const patientColumns = [
    {
      dataField: "id",
      text: "Dept ID",
      sort: true
    },
    {
      text: "Name",
      dataField: "name",
      sort: true

    },
    {
      text: "Status",
      dataField: "status",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Time",
      dataField: "updated",
      sort: true

    },
  ];

  const scheduleColumns = [
    {
      dataField: "id",
      text: "Schedule ID",
      sort: true
    },
    {
      text: "Name",
      dataField: "name",
      sort: true

    },
    {
      text: "Status",
      dataField: "status",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Time Start",
      dataField: "time_start",
      sort: true

    },
    {
      text: "Time End",
      dataField: "time_end",
      sort: true

    },
    {
      text: "Date",
      dataField: "schedule_date",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Department",
      dataField: "department",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Case Name",
      dataField: "patient",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    {
      text: "Doctor",
      dataField: "doctor",
      sort: true

      // Filter: SelectColumnFilter,
      // filter: "includes",
    },
    
  ];

  const onChangeInputValue = (e) => {
    const inputValue = e.target.value;
    setInputVal(inputValue);
    // setInputType(e.target.name);
  };

  const onChangeInputType = (e) => {
    const type = e.value;
    setInputType(type);
  };

  const onChangeDoctor = (e) => {
    const department = e.target.value;
    setDoctor(department);
  };

  const onChangeInterval = (e) => {
    const name = e.target.value;
    setTimeIntervalName(name);
  };

  const onChangeSessionInputValue = (e) => {
    const name = e.target.value;
    setSessionInputValue(name);
  };

  const returnFunctionStart = (time) => {
    // this.setState({ startTime: event.startTime });
    var actualTime = timeFromInt(time)
    setStartTime(actualTime);
  };

  const returnFunctionEnd = (time) => {
    // this.setState({ endTime: event.endTime });
    var actualTime = timeFromInt(time)
    setEndTime(actualTime);
  };

  const onChangePatient = (e) => {
    const patient = e.target.value;
    setPatient(patient);
  };

  const onChangeDepartmentSelect = (e) => {
    const patient = e.value;
    setDepartmentSelected(patient);
  };

  const onChangeDoctorSelect = (e) => {
    const patient = e.value;
    setDoctorSelected(patient);
  };

  const onChangePatientSelect = (e) => {
    const patient = e.value;
    setPatientSelected(patient);
  };

  const onChangeSessionDate = (date) => {
    // const date = e.target.value;
    setSessionDate(date);
  };
  
  const onChangeReportDate = (date) => {
    // const date = e.target.value;
    setReportData(date);
  };


  const onChangeIntervalSelect = (e) => {
    const interval = e.value;
    setIntervalSelected(interval);
  };

  const vinputValue = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="invalid-feedback d-block">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const handleInput = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
    SchedulerService.create(inputValue, inputType).then(
      () => {
        // navigate("/profile");
        window.location.reload();
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
    // } else {
    //   setLoading(false);
    // }
  };

  const handleTimeInterval = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    // var interval_text_value = startTime + ' - ' + endTime;



    SchedulerService.createInterval(intervalName, startTime, endTime).then(
      () => {
        // navigate("/profile");
        window.location.reload();
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );

  };

  const handleSchedule = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    let scheduleData = {
      'interval': intervalSelected,
      'doctor': doctorSelected,
      'patient': patientSelected,
      'schedule_date': moment(sessionDate.toLocaleDateString()).format('YYYY-MM-DD'),
      'name': sessionInputValue,
      'department': departmenSelected
    }

    SchedulerService.createSchedule(scheduleData).then(
      (res) => {
        // navigate("/profile");
        console.log(res);
        // window.location.reload();
        setLoading(false);
        if (res.status !== 200) {
          // alert(res.statusText);
          setMessage(res.statusText);
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );


   
  };


  return (
    <div className="App">
      <div className="container">
  
      {message &&
  <h3 className="error" style={{color: 'red'}}> { message } </h3> }

      <div className="row">
          <div className="col">
            <div className="col-md-12">
              <div className="card card-container">
                <Form onSubmit={handleSchedule} ref={form}>
                  <div className="form-group">
                    {/* <label htmlFor="inputValue">Enter Session Name</label> */}
                    <DatePicker dateFormat="yyyy/MM/dd" selected={sessionDate} onChange={onChangeSessionDate} className="form-control"/>

                    <Input
                      type="text"
                      className="form-control"
                      name="sessionInputValue"
                      value={sessionInputValue}
                      onChange={onChangeSessionInputValue}
                      validations={[required]}
                      placeholder={'Enter Session Name'}
                    />

                    <Select name='departmenSelect' options={departmentSelectOptions} onChange={onChangeDepartmentSelect} />
                    <Select name='doctorSelect' options={doctorSelectOptions} onChange={onChangeDoctorSelect} />
                    <Select name='patientSelect' options={patientSelectOptions} onChange={onChangePatientSelect} />
                    <Select name='intervalSelect' options={intervalSelectOptions} onChange={onChangeIntervalSelect} />
 
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Create</span>
                    </button>
                  </div>
                  {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                </Form>
              </div>
            </div>
          </div>
          <div className="col">
           
          </div>
          <div className="w-100"></div>
          <div className="col">
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>
              <center>schedule List</center>
            </h1>
            <div className="col-md-12">
              <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="card card-container">
                    <DatePicker dateFormat="yyyy/MM/dd" selected={reportDate} onChange={onChangeReportDate} className="form-control"/>
                    <button className="btn btn-primary btn-block" onClick={() => exportPDF()}>Download PDF</button>
                  </div>
                </div>
              <div className="col-md-4"></div>
            </div>

            <div className="col-md-12">
              <div className="card card-container">
              {/* <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                {({toPdf}) => (
                    <button onClick={toPdf}>Generate pdf</button>
                )}
            </ReactToPdf>
            <div style={{width: 500, height: 500, background: 'blue'}} ref={ref}/> */}

            
                
                {/* <Table usePagination columns={deptColumns} data={departmentsData} /> */}
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  striped={true}
                  data={schedulesData}
                  columns={scheduleColumns}
                  pagination={paginationFactory({ sizePerPage: 5 })}
                />
              </div>
            </div>
          </div>
          </div>
          
        <div className="row">
          <div className="col">
            <div className="col-md-12">
              <div className="card card-container">
                <Form onSubmit={handleInput} ref={form}>
                  <div className="form-group">
                    <label htmlFor="inputValue">Enter Name</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="inputValue"
                      value={inputValue}
                      onChange={onChangeInputValue}
                      validations={[required]}
                    />

<Select name='type' options={typeOptions} onChange={onChangeInputType} />
{/* 

                    <Select name='type' value='' validations={[required]} onChange={onChangeInputType} className="form-control">
                      <option value=''>Choose your Type</option>
                      <option value='department'>Department</option>
                      <option value='doctor'>Doctor</option>
                      <option value='patient'>Patient</option>
                    </Select> */}
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Create</span>
                    </button>
                  </div>
                  {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                </Form>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="col-md-12">
              <div className="card card-container">
                <Form onSubmit={handleTimeInterval} ref={form}>
                  <div className="form-group">
                    <label htmlFor="time">Time interval</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="interval"
                      value={intervalName}
                      onChange={onChangeInterval}
                      validations={[required]}
                      label="Name"
                    />

                    <TimePicker start="06:00" end="18:00" step={15} onChange={returnFunctionStart} value={startTime} />
                    <TimePicker start="06:00" end="18:00" step={15} onChange={returnFunctionEnd} value={endTime} />


                    {/* <TimeRange
                        startMoment={startTime}
                        endMoment={endTime}
                        onStartTimeChange={returnFunctionStart}
                        onEndTimeChange={returnFunctionEnd}
                    /> */}
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Create Time interval</span>
                    </button>
                  </div>

                  {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                </Form>
              </div>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col">
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>
              <center>Department List</center>
            </h1>
            <div className="col-md-12">
              <div className="card card-container">
                {/* <Table usePagination columns={deptColumns} data={departmentsData} /> */}
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={departmentsData}
                  columns={deptColumns}
                  pagination={paginationFactory({ sizePerPage: 5 })}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h1>
              <center>Time Interval List</center>
            </h1>
            <div className="col-md-12">
              <div className="card card-container">
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={intervalsData}
                  columns={timeIntervalColumns}
                  pagination={paginationFactory({ sizePerPage: 5 })}
                />
                {/* <Table columns={timeIntervalColumns} data={intervalsData} /> */}
              </div>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col">
            <h1>
              <center>Doctor List</center>
            </h1>
            <div className="col-md-12">
              <div className="card card-container">
                {/* <Table PaginationComponent={Pagination} columns={doctorColumns} data={doctorsData} /> */}
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={doctorsData}
                  columns={doctorColumns}
                  pagination={paginationFactory({ sizePerPage: 5 })}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h1>
              <center>Patient List</center>
            </h1>
            <div className="col-md-12">
              <div className="card card-container">
                {/* <Table PaginationComponent={Pagination} columns={patientColumns} data={patientsData} /> */}
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={patientsData}
                  columns={patientColumns}
                  pagination={paginationFactory({ sizePerPage: 5 })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleManager;
