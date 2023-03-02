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

const Page2 = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [college, setCollege] = useState([]);
  const [collegeMaster, setCollegeMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Department', field: 'name'},

    {
      title: 'College',
      field: 'collegeMaster.name',
    },
  ];

  //select college from dropdown
  //   const selectCollege = (e) => {
  //       setCollegeMaster({
  //           [e.target.name] : (e.target.value)
  //       });
  //       console.log(collegeMaster);
  //   };

  //Fetch college-master data
  // const fetchCollege = async () => {
  //   fetch('http://localhost:8080/api/college-masters')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(college);
  //       setCollege(res);
  //     });
  // };

  //Adding a college
  const addDepartment = (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(collegeMaster);
      axios
        .post('http://localhost:8080/api/department-masters', {
          name,
          collegeMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setName('');
    setCollegeMaster('');
  };

  //Fetching department-masters data
  const fetchData = () => {
    fetch('http://localhost:8080/api/department-masters')
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  //Deleting department-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/department-masters/${cid}`, {
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

  //Fetching individual department
  const getDepartment = (id) => {
    let did = id.data.id;
    axios
      .get(`http://localhost:8080/api/department-masters/${did}`)
      .then((res) => {
        res.data;
        setName(res.data.name);
        setCollegeMaster(res.data.collegeMaster);
        setId(did);
        console.log('collegeMaster', res.data.collegeMaster);
      });
    setEditOpen(true);
  };

  const updateDepartment = () => {
    try {
      axios
        .put('http://localhost:8080/api/department-masters', {
          id,
          name,
          collegeMaster,
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

  useEffect(() => {
    async function fetchCollege() {
      await fetch('http://localhost:8080/api/college-masters')
        .then((res) => res.json())
        .then((res) => {
          console.log(college);
          setCollege(res);
        });
    }
    fetchData();
    fetchCollege();
  }, []);

  return (
    <div>
      <div>
        <h3>Department</h3>
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
                Add Department
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
                onClick={() => getDepartment(id)}
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
              <label>Department</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Department Name'
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
                <label>College</label>

                <TextField
                  select
                  defaultValue=''
                  value={collegeMaster}
                  name='collegeMaster'
                  onChange={(e) => {
                    setCollegeMaster(e.target.value);
                    console.log('collegeMaster', collegeMaster);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {college.map((result) => {
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
                    onClick={addDepartment}
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
              <label>Department</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Department Name'
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
                <label>College</label>

                <TextField
                  select
                  defaultValue={collegeMaster}
                  name='collegeMaster'
                  onChange={(e) => {
                    setCollegeMaster(e.target.value);
                    // console.log('collegeMaster', collegeMaster);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {college.map((result) => {
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
                    onClick={() => updateDepartment()}
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

export default Page2;
