import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const QuestionMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Text', field: 'text'},
    {title: 'Weightage', field: 'weightage'},
    {title: 'Question Type', field: 'questionTypeMaster.name'},
    {title: 'Difficulty Type', field: 'difficultyTypeMaster.name'},
    {title: 'Sub-Topic', field: 'subTopicMaster.name'},
    //   {title: "Parent Question", field: "parentQuestionMaster.name"}
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/question-masters')
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

export default QuestionMasters;
