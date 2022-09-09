import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
axios.defaults.withCredentials = true;
import axios from 'axios';
import Button from '@mui/material/Button';
import {Modal} from '@mui/material';
import {Card, CardContent, Grid, TextField} from '@mui/material';
//import Typography from "@mui/material/Typography";

const Page1 = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('');
  const [collegeData, setCollegeData] = useState('');

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'College', field: 'name'},
  ];

  //Adding a college
  const addCollege = (e) => {
    e.preventDefault();
    try {
      console.log(name);
      axios
        .post('http://localhost:8080/api/college-masters', {
          name,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      setName('');
      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  //Fetching College-Masters data
  const fetchData = () => {
    fetch('http://localhost:8080/api/college-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  //Deleting a record
  const deleteData = (id) => {
    try {
        console.log(id);
       let cid = id.data.id;

      axios.delete(`http://localhost:8080/api/college-masters/${cid}`, {
            withCredentials: true,
        }).then(res => res.data)
          .then(res => {
              console.log("Successfully deleted");
              console.log(res.data);
              fetchData();
          });
    } catch (error) {
      console.log(error);
    }
  };


    const getCollege = (id) => {
        let cid = id.data.id;
        axios.get(`http://localhost:8080/api/college-masters/${cid}`)
            .then(res => {
                res.data;
            console.log(res);
                setEditOpen(true);
                setName(res.data.name);
                console.log(res.data);
                setCollegeData(res.data);

            });
        setName('');
    };

    //Editing a college
    const editCollege = (e) => {
       axios.put(`http://localhost:8080/api/college-masters`, {
           id: collegeData.id,
        name
       }, {
           headers: {
               'Content-Type' : 'application/json'
           }
       })
           .then(res => {
               res.data;
           });
        e.preventDefault();

        setEditOpen(false);
        fetchData();
    };


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div>
        <h3>College</h3>
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
                Add College
              </Button>
            </div>
          ),

          Action: (id) => (
            <>
              <Button
                //   onClick={(event) => props.actions.onClick(event, props.data)}
                color='primary'
                variant='contained'
                style={{textTransform: 'none'}}
                size='small'
                onClick={() => getCollege(id)}
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
        onClose={() => setOpen(false)}
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
            minHeight: {xs: 150, sm: 250},
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
              <label>College</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter College Name'

                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                    onClick={addCollege}
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
            onClose={() => setEditOpen(false)}
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
                    minHeight: {xs: 150, sm: 250},
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
                        <label>College</label>
                        <Grid
                            item
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                placeholder='Enter College Name'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                    onClick={editCollege}
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
                                    onClick={() => setEditOpen(false)}
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

export default Page1;
