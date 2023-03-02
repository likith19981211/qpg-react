import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from "@mui/material/Select/Select";
import MenuItem from '@mui/material/MenuItem';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const SubSubjectMasters = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState([]);
  const [subjectMaster, setSubjectMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

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

  //Fetching sub-category-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/sub-subject-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    async function fetchSubject() {
      await fetch('http://localhost:8080/api/subject-masters')
        .then((res) => res.json())
        .then((res) => {
          console.log(subject);
          setSubject(res);
        });
    }
    fetchData();
    fetchSubject();
  }, []);

  //Adding a sub-subject-master
  const addSubSubject = (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(subjectMaster);
      axios
        .post('http://localhost:8080/api/sub-subject-masters', {
          name,
          subjectMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setName('');
      setSubjectMaster('');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubSubject = (id) => {
    let sid = id.data.id;
    axios
      .get(`http://localhost:8080/api/sub-subject-masters/${sid}`)
      .then((res) => {
        res.data;
        setName(res.data.name);
        setId(sid);
      });
    setEditOpen(true);
  };

  //Deleting sub-category-master data
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/sub-subject-masters/${cid}`, {
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

    const updateSubSubject = () => {
        try {
            axios
                .put('http://localhost:8080/api/sub-subject-masters', {
                    id,
                    name,
                    subjectMaster,
                })
                .then((res) => {
                    res.data;
                    console.log(res);
                    setId(null);
                    setEditOpen(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>
      <div>
        <h3>Sub-Subjects</h3>
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
                Add Sub-Subject
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
                onClick={() => getSubSubject(id)}
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
              <label>Sub-Subject</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Sub-Category Name'
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
                <label>Select Subject</label>

                <TextField
                  select
                  value={subjectMaster}
                  name='subjectMaster'
                  onChange={(e) => {
                    setSubjectMaster(e.target.value);
                    console.log('subjectMaster', subjectMaster);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {subject.map((result) => {
                    return (
                      <MenuItem key={result.id} value={result}>
                        {result.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
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
                    onClick={addSubSubject}
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

      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
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
              <label>Sub-Subject</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Sub-Category Name'
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
                <label>Select Subject</label>

                <TextField
                  select
                  value={subjectMaster}
                  name='subjectMaster'
                  onChange={(e) => {
                    setSubjectMaster(e.target.value);
                    console.log('subjectMaster', subjectMaster);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {subject.map((result) => {
                    return (
                      <MenuItem key={result.id} value={result}>
                        {result.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
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
                    onClick={() => updateSubSubject()}
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
                    onClick={() => {
                        setEditOpen(false);
                        setName('');
                    }}
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

export default SubSubjectMasters;
