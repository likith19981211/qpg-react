import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const ExamMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Title', field: 'title'},
    {title: 'Start Date', field: 'startDate'},
    {title: 'College', field: 'collegeMaster.name'},
    {title: 'Department', field: 'departmentMaster.name'},
    {title: 'Course', field: 'courseMaster.name'},
    {title: 'Category', field: 'categoryMaster.name'},
    {title: 'Sub Category', field: 'subCategoryMaster.name'},
    {title: 'Subject', field: 'subjectMaster.name'},
    {title: 'Sub Subject', field: 'subSubjectMaster.name'},
    {title: 'Topic', field: 'topicMaster.name'},
    {title: 'Sub Topic', field: 'subTopicMaster.name'},
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/exam-masters')
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

export default ExamMasters;
