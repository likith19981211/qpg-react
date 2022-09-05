import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const QuestionBluePrintMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Name', field: 'name'},
    {title: 'Total Marks', field: 'totalMarks'},
    {title: 'Part-A Duration', field: 'partaDuration'},
    {title: 'Part-B Duration', field: 'partbDuration'},
    {title: 'Description', field: 'description'},
    {title: 'BP Details', field: 'bpMasterLabel'},
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/question-blue-print-masters')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  return (
    <>
      <MaterialTable
        title='Courses'
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          toolbarButtonAlignment: 'left',
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
          },
        ]}
      />
    </>
  );
};

export default QuestionBluePrintMasters;
