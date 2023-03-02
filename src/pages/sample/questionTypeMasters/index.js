import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const QuestionTypeMasters = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [qtCatData, setQtCatData] = useState([]);
  const [shortName, setShortName] = useState('');
  const [weightage, setWeightage] = useState('');
  const [duration, setDuration] = useState('');
  const [defaultDuration, setDefaultDuration] = useState(null);
  const [defaultWeightage, setDefaultWeightage] = useState(null);
  const [questionTypeCategoryMaster, setQuestionTypeCategoryMaster] =
    useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);
  const [questionMasters, setQuestionMasters] = useState(null);

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

  //Fetching question type category masters data
  const fetchQtCategoryData = () => {
    try {
      fetch('http://localhost:8080/api/question-type-category-masters')
        .then((res) => res.json())
        .then((res) => {
          setQtCatData(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchQtCategoryData();
  }, []);

  //Add question type master
  const addQuestionType = () => {
    try {
      console.log(name);

      axios
        .post('http://localhost:8080/api/question-type-masters', {
          name,
          shortName,
          defaultWeightage,
          defaultDuration,
          questionTypeCategoryMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setName('');
      setShortName('');
      setDefaultDuration(null);
      setDefaultWeightage(null);
      setOpen(false);
      setQuestionTypeCategoryMaster('');
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionType = (id) => {
    let sid = id.data.id;
    axios
      .get(`http://localhost:8080/api/question-type-masters/${sid}`)
      .then((res) => {
        res.data;
        setName(res.data.name);
        setShortName(res.data.shortName);
        setDefaultWeightage(res.data.defaultWeightage);
        setDefaultDuration(res.data.defaultDuration);
        setWeightage(String(res.data.defaultWeightage));
        setDuration(String(res.data.defaultDuration));
        setId(sid);
        setQuestionMasters(res.data.questionMasters);
      });
    setEditOpen(true);
  };

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

    const updateQuestionType = () => {
        try {
            axios
                .put('http://localhost:8080/api/question-type-masters', {
                    id,
                    name,
                    shortName,
                    defaultWeightage,
                    defaultDuration,
                    questionTypeCategoryMaster,
                    questionMasters,
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
        <h3>Question Types</h3>
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
                onClick={() => getQuestionType(id)}
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
                  marginTop: '30px',
                }}
              >
                <label>Short Name</label>
                <TextField
                  placeholder='Enter Short Name'
                  name='shortName'
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  name='weightage'
                  value={weightage}
                  onChange={(e) => {
                    setWeightage(e.target.value);
                    setDefaultWeightage(parseFloat(e.target.value));
                  }}
                  variant='outlined'
                  label='Default Weightage'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                  }}
                />

                <TextField
                  name='duration'
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setDefaultDuration(parseFloat(e.target.value));
                  }}
                  variant='outlined'
                  label='Default Duration'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                    marginLeft: '25px',
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
                  name='questionTypeCategoryMaster'
                  value={questionTypeCategoryMaster}
                  onChange={(e) => {
                    setQuestionTypeCategoryMaster(e.target.value);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {qtCatData.map((res) => {
                    return (
                      <MenuItem key={res.id} value={res}>
                        {res.name}
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
                      marginLeft: '15px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => addQuestionType()}
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
                        setOpen(false);
                        setQuestionTypeCategoryMaster('');
                        setShortName('');
                        setWeightage('');
                        setDuration('');
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
                  marginTop: '30px',
                }}
              >
                <label>Short Name</label>
                <TextField
                  placeholder='Enter Short Name'
                  name='shortName'
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  name='weightage'
                  value={weightage}
                  onChange={(e) => {
                    setWeightage(e.target.value);
                    setDefaultWeightage(parseFloat(e.target.value));
                  }}
                  variant='outlined'
                  label='Default Weightage'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                  }}
                />

                <TextField
                  name='duration'
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setDefaultDuration(parseFloat(e.target.value));
                  }}
                  variant='outlined'
                  label='Default Duration'
                  style={{
                    width: '150px',
                    marginTop: '30px',
                    marginLeft: '25px',
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
                  name='questionTypeCategoryMaster'
                  value={questionTypeCategoryMaster}
                  onChange={(e) => {
                    setQuestionTypeCategoryMaster(e.target.value);
                  }}
                  style={{
                    width: '100%',
                  }}
                >
                  {qtCatData.map((res) => {
                    return (
                      <MenuItem key={res.id} value={res}>
                        {res.name}
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
                      marginLeft: '15px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => updateQuestionType()}
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
                      setShortName('');
                      setWeightage('');
                      setDuration('');
                      setDefaultDuration(null);
                      setDefaultWeightage(null);
                      setQuestionTypeCategoryMaster('');
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

export default QuestionTypeMasters;
