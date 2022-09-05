import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const TopicMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Topic', field: 'name'},

    {title: 'Sub-Subject', field: 'subSubjectMaster.name'},
    {title: 'Subject', field: 'subSubjectMaster.subjectMaster.name'},
    {
      title: 'Sub-Category',
      field: 'subSubjectMaster.subjectMaster.subCategoryMaster.name',
    },
    {
      title: 'Category',
      field:
        'subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.name',
    },
    {
      title: 'Course',
      field:
        'subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.courseMaster.name',
    },
    {
      title: 'Department',
      field:
        'subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field:
        'subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/topic-masters')
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

export default TopicMasters;
