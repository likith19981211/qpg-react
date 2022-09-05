import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const QuestionTypeMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'QuestionType', field: 'name'},
    {title: 'Short Name', field: 'shortName'},
    {title: 'Default Weightage', field: 'defaultWeightage'},
    {title: 'Question Type Category', field: 'questionTypeCategoryMaster.name'},
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/question-type-masters')
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

export default QuestionTypeMasters;
