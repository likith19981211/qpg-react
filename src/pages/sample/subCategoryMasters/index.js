import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable from 'material-table';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const SubCategoryMasters = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Sub-Category', field: 'name'},

    {title: 'Category', field: 'categoryMaster.name'},
    {title: 'Course', field: 'categoryMaster.courseMaster.name'},
    {
      title: 'Department',
      field: 'categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field: 'categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/sub-category-masters')
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

export default SubCategoryMasters;
