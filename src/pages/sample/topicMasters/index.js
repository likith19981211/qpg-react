import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const TopicMasters = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [subSubject, setSubSubject] = useState([]);
  const [subSubjectMaster, setSubSubjectMaster] = useState('');
  const [shortCode, setShortCode] = useState('');

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

  //Fetching topic-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/topic-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect( () => {
      async function fetchSubSubject() {
          await fetch('http://localhost:8080/api/sub-subject-masters')
              .then((res) => res.json())
              .then((res) => {
                  console.log(subSubject);
                  setSubSubject(res);
              });
      }
     fetchData();
      fetchSubSubject();
  }, []);

    //Adding a topic-master
    const addTopic = (e) => {
        e.preventDefault();
        try {
            console.log(name);
            console.log(subSubjectMaster);
            axios
                .post('http://localhost:8080/api/topic-masters', {
                    name,
                    shortCode,
                    subSubjectMaster,
                })
                .then((res) => res.data)
                .then((res) => console.log(res.data));
            fetchData();
            setName('');
            setSubSubjectMaster('');
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

  //Deleting topic-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/topic-masters/${cid}`, {
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
        <h3>Topics</h3>
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
                Add Topic
              </Button>
            </div>
          ),

          Action: (id) => (
            <>
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
            minHeight: {xs: 350, sm: 400},
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
              <label>Topic</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Topic Name'
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
                <label>Select Sub-Subject</label>

                <TextField
                    select
                    value={subSubjectMaster}
                    name = 'subSubjectMaster'
                    onChange={(e) => {
                        setSubSubjectMaster(e.target.value);
                        console.log('subSubjectMaster', subSubjectMaster);
                    }}
                  style={{
                    width: '100%',
                  }}
                >
                    {
                        subSubject.map((result) => {
                            return (
                                <MenuItem key={result.id} value={result}>
                                    {result.name}
                                </MenuItem>
                            );
                        })
                    }
                </TextField>
              </Grid>

                <Grid
                    item
                    style={{
                        width: '100%',
                        marginTop : '30px'
                    }}
                >
                    <label>Short Code</label>
                    <TextField
                        placeholder='Enter ShortCode'
                        name='shortCode'
                        value={shortCode}
                        onChange={(e) => setShortCode(e.target.value)}
                        variant='outlined'
                        style={{
                            width: '300px',
                        }}
                    />
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
                       onClick={addTopic}
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

export default TopicMasters;
