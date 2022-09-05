import React, {useEffect} from 'react';
//import {Box} from '@mui/material';
//import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const Department = () => {
  // const [data, setData] = useState([]);
  //
  // const columns = [
  //     {
  //         title: "ID", field: "id"
  //     },
  //     {title : "Department", field: "name"},
  //     {title: "College", field: "name"}
  // ];

  useEffect(() => {
    fetch('http://localhost:8080/api/department-masters')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  return (
    <div>
      {/*<MaterialTable*/}
      {/*    title="Department"*/}
      {/*    columns={columns} data={data} />*/}
    </div>
  );
};

export default Department;
