import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from "@mui/material/Button";
import {Card, CardContent, Grid, Modal, TextField} from "@mui/material";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const ExamMasters = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

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

  //Fetching question-blue-print-masters data
  const fetchData = () => {
    fetch('http://localhost:8080/api/exam-masters')
        .then((res) => res.json())
        .then((res) => setData(res));
  };

  useEffect( () => {
     fetchData();
  }, []);

  //Deleting question-blue-print-masters data
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
          .delete(`http://localhost:8080/api/exam-masters/${cid}`, {
            withCredentials: true,
          })
          .then((res) => res.data)
          .then((res) => {
            console.log('Successfully deleted');
            console.log(res.data);
            fetchData();
          });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
        <div>
            <h3>Exams</h3>
        </div>
      <MaterialTable
        title=' '
        columns={columns}
        data={data}

        components={{
            Toolbar: (props) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // margin: '10px'
                    }}
                >
                    <div style={{width: '25rem'}}>
                        <MTableToolbar {...props} />
                    </div>
                    <Button
                        style={{height: 'fit-content'}}
                        color='primary'
                        variant='contained'
                        onClick={() => setOpen(true)}
                    >
                        Add Exam
                    </Button>
                </div>
            ),

            Action: (id) => (
                <>
                    <Button
                        color='inherit'
                        variant='contained'
                        style={{textTransform: 'none'}}
                        size='small'
                        onClick={() => console.log('generated')}
                    >
                        Generate
                    </Button>
                    <Button
                        color='primary'
                        variant='contained'
                        style={{textTransform: 'none'}}
                        size='small'
                        onClick={() => console.log('edit')}
                    >
                        Edit
                    </Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        style={{textTransform: 'none'}}
                        size='small'
                        onClick={() => deleteData(id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        }}
        options={{
            search: true,
            searchFieldAlignment: 'left',
            actionsColumnIndex: -1,
            toolbarButtonAlignment: 'left',
        }}
        actions={[
            {
                icon: 'edit and delete',
                tooltip: 'Edit and Delete',
            },
        ]}
      />
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                sx={{
                    maxWidth: 370,
                    minHeight: {xs: 250, sm: 300},
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                }}
            >
                <CardContent>
                    <Grid
                        container
                        style={{
                            display: 'flex',
                            marginLeft: '20px',
                            marginTop: '30px',
                            marginRight: '10px',
                        }}
                    >
                        <label>Exam</label>
                        <Grid
                            item
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                placeholder='Enter Exam'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant='outlined'
                                style={{
                                    width: '300px',
                                }}
                            />
                        </Grid>

                        <Grid
                            item
                            style={{
                                width: '300px',
                                marginTop: '30px',
                            }}
                        >
                            <label>Entity Name</label>

                            <Select
                                style={{
                                    width: '100%',
                                }}
                            >
                                <MenuItem>Sample Entity</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <div
                                style={{
                                    marginTop: '30px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Button
                                    style={{
                                        height: '40px',
                                        width: '130px',
                                        marginRight: '20px',
                                    }}
                                    color='primary'
                                    variant='contained'
                                    //   onClick={addDepartment}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{
                                        height: '40px',
                                        width: '130px',
                                        marginLeft: '20px',
                                    }}
                                    color='secondary'
                                    variant='contained'
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    </div>
  );
};

export default ExamMasters;
