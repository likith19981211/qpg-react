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

const QuestionTypeMasters = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'QuestionType', field: 'name'},
    {title: 'Short Name', field: 'shortName'},
    {title: 'Default Weightage', field: 'defaultWeightage'},
    {title: 'Question Type Category', field: 'questionTypeCategoryMaster.name'},
  ];

  //Fetching question-type-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/question-type-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect( () => {
     fetchData();
  }, []);

  //Deleting question-type-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/question-type-masters/${cid}`, {
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
                Add Question Type
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
            maxWidth: 400,
            minHeight: {xs: 500, sm: 500},
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
              <label>Question-Type</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Question-Type'
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
                        marginTop: '30px'
                    }}
                >
                    <label>Short Name</label>
                    <TextField
                        placeholder='Enter Short Name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                        style={{
                            width: '330px',
                        }}
                    />
                </Grid>

               <Grid>
                   <TextField
                       name='name'
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       variant='outlined'
                       label='Default Weightage'
                       style={{
                           width: '150px',
                           marginTop: '30px'
                       }}
                   />

                   <TextField
                       name='name'
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       variant='outlined'
                       label='Default Duration'
                       style={{
                           width: '150px',
                           marginTop: '30px',
                           marginLeft: '25px'
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
                <label>Question Type Category</label>

                <TextField
                    select
                  style={{
                    width: '100%',
                  }}
                >
                  <MenuItem>Sample Entity</MenuItem>
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

export default QuestionTypeMasters;
