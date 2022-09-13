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

const CategoryMasters = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [course, setCourse] = useState([]);
  const [courseMaster, setCourseMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Category', field: 'name'},

    {title: 'Course', field: 'courseMaster.name'},
    {title: 'Department', field: 'courseMaster.departmentMaster.name'},

    {
      title: 'College',
      field: 'courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  //Fetching category-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/category-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    async function fetchCourse() {
      await fetch('http://localhost:8080/api/course-masters')
        .then((res) => res.json())
        .then((res) => {
          console.log(course);
          setCourse(res);
        });
    }
    fetchData();
    fetchCourse();
  }, []);

  //Adding a category-master
  const addCategory = (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(courseMaster);
      axios
        .post('http://localhost:8080/api/category-masters', {
          name,
          courseMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setName('');
      setCourseMaster('');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = (id) => {
      let cid = id.data.id;
          axios
              .get(`http://localhost:8080/api/category-masters/${cid}`)
              .then((res) => {
                  res.data;
                  setName(res.data.name);

              });
          setEditOpen(true);
  };

  //Deleting category-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/category-masters/${cid}`, {
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
        <h3>Categories</h3>
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
                Add Category
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
                onClick={() => getCategory(id)}
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
          toolbarButtonAlignment: 'right',
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
              <label>Category</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Category Name'
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
                <label>Select Course</label>

                <TextField
                  select
                  value={courseMaster}
                  name='courseMaster'
                  onChange={(e) => {
                    setCourseMaster(e.target.value);
                    console.log('courseMaster', courseMaster);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {course.map((result) => {
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
                    onClick={addCategory}
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
                        <label>Category</label>
                        <Grid
                            item
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                placeholder='Enter Category Name'
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
                            <label>Select Course</label>

                            <TextField
                                select
                                value={courseMaster}
                                name='courseMaster'
                                onChange={(e) => {
                                    setCourseMaster(e.target.value);
                                    console.log('courseMaster', courseMaster);
                                }}
                                style={{
                                    width: '100%',
                                }}
                            >
                                {course.map((result) => {
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
                                    onClick={addCategory}
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

export default CategoryMasters;
