import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from "@mui/material/Select/Select";
//import MenuItem from "@mui/material/MenuItem";
import axios from 'axios';
//import axios from 'axios';
import Divider from '@mui/material/Divider';
//axios.defaults.withCredentials = true;

const QuestionBluePrintMasters = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [partAStr, setPartAStr] = useState('');
  const [partaDuration, setPartaDuration] = useState(null);
  const [partBStr, setPartBStr] = useState('');
  const [partbDuration, setPartbDuration] = useState(null);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Name', field: 'name'},
    {title: 'Total Marks', field: 'totalMarks'},
    {title: 'Part-A Duration', field: 'partaDuration'},
    {title: 'Part-B Duration', field: 'partbDuration'},
    {title: 'Description', field: 'description'},
    {title: 'BP Details', field: 'bpMasterLabel'},
  ];

  //Fetching question-blue-print-masters data
  const fetchData = () => {
    fetch('http://localhost:8080/api/question-blue-print-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addQBluePrint = () => {
    setPartbDuration(parseFloat(partBStr));
    setPartaDuration(parseFloat(partAStr));
    console.log(partaDuration, partbDuration);
  };

  //Deleting question-blue-print-masters data
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(
          `http://localhost:8080/api/question-blue-print-masters/${cid}`,
          {
            withCredentials: true,
          },
        )
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
                Add Question Blue-Print
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
                onClick={() => setEditOpen(true)}
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
          overflow: 'scroll',
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            minHeight: {xs: 1000, sm: 1000},
            width: '100%',
            overflow: 'scroll',
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
              <label>Name</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <label>Part-A Duration</label>
                <TextField
                  placeholder='Part-A Duration'
                  name='partAStr'
                  value={partAStr}
                  onChange={(e) => {
                    setPartAStr(e.target.value);
                  }}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <label>Part-B Duration</label>
                <TextField
                  name='partBStr'
                  value={partBStr}
                  onChange={(e) => {
                    setPartBStr(e.target.value);
                  }}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <label>Description</label>

                <TextField
                  name='description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
              </Grid>

              <label
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '30px',
                  color: 'blue',
                }}
              >
                <h3>Part A</h3>
              </label>
              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Multiple Choice Single Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Multiple Choice Multiple Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Fill In The Blanks</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Match The Following</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Re-Order</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Formulae/Abbreviation/Expand The Following</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <label
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '30px',
                  color: 'blue',
                }}
              >
                <h3>Part B</h3>
              </label>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Very Short Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Short Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Long Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Very Long Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Short Answer (Combo)</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Long Answer (Combo)</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Very Long Answer (Combo)</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
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
                      marginLeft: '15px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={addQBluePrint}
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
          overflow: 'scroll',
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            minHeight: {xs: 1000, sm: 1000},
            width: '100%',
            overflow: 'scroll',
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
              <label>Name</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <label>Part-A Duration</label>
                <TextField
                  placeholder='Part-A Duration'
                  name='partAStr'
                  value={partAStr}
                  onChange={(e) => {
                    setPartAStr(e.target.value);
                  }}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <label>Part-B Duration</label>
                <TextField
                  name='partBStr'
                  value={partBStr}
                  onChange={(e) => {
                    setPartBStr(e.target.value);
                  }}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <label>Description</label>

                <TextField
                  name='description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
              </Grid>

              <label
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '30px',
                  color: 'blue',
                }}
              >
                <h3>Part A</h3>
              </label>
              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Multiple Choice Single Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Multiple Choice Multiple Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Fill In The Blanks</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Match The Following</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Re-Order</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Formulae/Abbreviation/Expand The Following</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <label
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '30px',
                  color: 'blue',
                }}
              >
                <h3>Part B</h3>
              </label>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Very Short Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Short Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Long Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Very Long Answer</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Short Answer (Combo)</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Long Answer (Combo)</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <Divider>Very Long Answer (Combo)</Divider>
                <TextField
                  select
                  label='Choice'
                  placeholder='Choice'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  select
                  label='Difficulty'
                  placeholder='Difficulty'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
                  }}
                />

                <TextField
                  number
                  label='Total Questions'
                  placeholder='Total Questions'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                  }}
                />
                <TextField
                  number
                  label='No of Choices'
                  placeholder='No of Choices'
                  style={{
                    width: '150px',
                    marginTop: '20px',
                    marginLeft: '30px',
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
                      marginLeft: '15px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={addQBluePrint}
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

export default QuestionBluePrintMasters;
