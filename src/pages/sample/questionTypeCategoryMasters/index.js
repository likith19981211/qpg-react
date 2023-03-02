import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from '@mui/material/Select/Select';
//import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const QuestionTypeCategory = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [weightage, setWeightage] = useState('');
  const [defaultWeightage, setDefaultWeightage] = useState(null);
  const [open, setOpen] = useState(false);
//  const [qtCategoryData, setQtCategoryData] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Name', field: 'name'},

    {
      title: 'Short Name',
      field: 'shortName',
    },
    {
      title: 'Default Weightage',
      field: 'defaultWeightage',
    },
  ];

  //Adding a question type category
  const addQuestionTypeCategory = () => {
  //  e.preventDefault();

    try {
      console.log(name);
        console.log(defaultWeightage);
      axios
        .post('http://localhost:8080/api/question-type-category-masters', {
          name,
          shortName,
          defaultWeightage,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setName('');
    setShortName('');
    setWeightage('');
    setDefaultWeightage(null);
  };

  //Fetching question-type-category-masters data
  const fetchData = () => {
    fetch('http://localhost:8080/api/question-type-category-masters')
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  //Deleting question-type-category-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(
          `http://localhost:8080/api/question-type-category-masters/${cid}`,
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

  //Fetching individual question-type-category
  const getQuestionTypeCategory = (id) => {
    let did = id.data.id;
    axios
      .get(`http://localhost:8080/api/question-type-category-masters/${did}`)
      .then((res) => {
        res.data;
        setName(res.data.name);
        setShortName(res.data.shortName);
        setWeightage((String(res.data.defaultWeightage)));
        setId(did);

      });
    setEditOpen(true);

  };

  const updateQuestionTypeCategory = () => {
      console.log("defaultWeightage", defaultWeightage);
   try {
       console.log("defaultWeightage", defaultWeightage);
       axios
           .put('http://localhost:8080/api/question-type-category-masters', {
               id,
               name,
               shortName,
               defaultWeightage,
           })
           .then((res) => {
               setName('');
               setShortName('');
               setWeightage('');
               setDefaultWeightage(null);
               setEditOpen(false);
               res.data;
           });
   }catch (error) {
       console.log(error);
   }
  };

  useEffect(() => {
    fetchData();
    if(open || editOpen === false) {
        setName('');
        setShortName('');
        setWeightage('');
    }
  }, []);

  return (
    <div>
      <div>
        <h3>Question Type Categories</h3>
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
                Add Question Type Category
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
                onClick={() => getQuestionTypeCategory(id)}
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
            maxWidth: 400,
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
              <label>Question Type Category</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Question-Type Category'
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
                  name='shortName'
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  variant='outlined'
                  label='Short Name'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                  }}
                />

                <TextField
                  name='weightage'
                  value={weightage}
                  onChange={(e) => {
                    setWeightage(e.target.value);
                  }}
                  variant='outlined'
                  label='Def. Weightage'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                    marginLeft: '25px',
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
                      marginRight: '23px',
                      marginLeft: '10px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => {
                        setDefaultWeightage(parseFloat(weightage));
                        addQuestionTypeCategory();
                    }
                    }
                  >
                    Save
                  </Button>
                  <Button
                    style={{
                      height: '40px',
                      width: '130px',
                      marginLeft: '23px',
                    }}
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                      setOpen(false);
                      setName('');
                      setShortName('');
                      setWeightage('');
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
            maxWidth: 400,
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
              <label>Question Type Category</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Question Type Category'
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
                  name='shortName'
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  variant='outlined'
                  label='Short Name'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                  }}
                />

                <TextField
                  name='weightage'
                  value={weightage}
                  onChange={(e) => {
                    setWeightage(e.target.value);
                    setDefaultWeightage(parseFloat(e.target.value));
                  }
                }
                  variant='outlined'
                  label='Default Weightage'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                    marginLeft: '25px',
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
                      marginRight: '23px',
                      marginLeft: '10px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => updateQuestionTypeCategory()}
                  >
                    Save
                  </Button>
                  <Button
                    style={{
                      height: '40px',
                      width: '130px',
                      marginLeft: '23px',
                    }}
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                      setEditOpen(false);
                      setName('');
                      setShortName('');
                      setWeightage('');
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

export default QuestionTypeCategory;
