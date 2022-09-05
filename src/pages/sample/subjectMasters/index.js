import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const SubjectMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Subject', field: 'name'},

    {title: 'Sub-Category', field: 'subCategoryMaster.name'},
    {title: 'Category', field: 'subCategoryMaster.categoryMaster.name'},
    {
      title: 'Course',
      field: 'subCategoryMaster.categoryMaster.courseMaster.name',
    },
    {
      title: 'Department',
      field:
        'subCategoryMaster.categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field:
        'subCategoryMaster.categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/subject-masters')
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

export default SubjectMasters;
