import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const SubSubjectMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Sub-Subject', field: 'name'},
    {title: 'Subject', field: 'subjectMaster.name'},
    {title: 'Sub-Category', field: 'subjectMaster.subCategoryMaster.name'},
    {
      title: 'Category',
      field: 'subjectMaster.subCategoryMaster.categoryMaster.name',
    },
    {
      title: 'Course',
      field: 'subjectMaster.subCategoryMaster.categoryMaster.courseMaster.name',
    },
    {
      title: 'Department',
      field:
        'subjectMaster.subCategoryMaster.categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field:
        'subjectMaster.subCategoryMaster.categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/sub-subject-masters')
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

export default SubSubjectMasters;
