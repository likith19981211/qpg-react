import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const QuestionMasters = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [strWeightage, setStrWeightage] = useState('');
  const [weightage, setWeightage] = useState(null);
  const [id, setId] = useState(null);
  const [questionType, setQuestionType] = useState([]);
  const [questionTypeMaster, setQuestionTypeMaster] = useState('');
  const [difficultyType, setDifficultyType] = useState([]);
  const [difficultyTypeMaster, setDifficultyTypeMaster] = useState('');
  const [subTopic, setSubTopic] = useState([]);
  const [subTopicMaster, setSubTopicMaster] = useState('');
  const [parentQuestion, setParentQuestion] = useState([]);
  const [parentQuestionMaster, setParentQuestionMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);


  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Text', field: 'text'},
    {title: 'Weightage', field: 'weightage'},
    {title: 'Question Type', field: 'questionTypeMaster.name'},
    {title: 'Difficulty Type', field: 'difficultyTypeMaster.name'},
    {title: 'Sub-Topic', field: 'subTopicMaster.name'},
    //   {title: "Parent Question", field: "parentQuestionMaster.name"}
  ];

  //Fetching question-master data
  const fetchData = async () => {
    await fetch('http://localhost:8080/api/question-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  const fetchQuestionTypes = () => {
    fetch('http://localhost:8080/api/question-type-masters')
      .then((res) => res.json())
      .then((res) => setQuestionType(res));
  };

  const fetchDifficultyType = () => {
    fetch('http://localhost:8080/api/difficulty-type-masters')
      .then((res) => res.json())
      .then((res) => setDifficultyType(res));
  };

  const fetchSubTopic = () => {
    fetch('http://localhost:8080/api/sub-topic-masters')
      .then((res) => res.json())
      .then((res) => setSubTopic(res));
  };

  const fetchParentQuestion = () => {
    fetch('http://localhost:8080/api/question-masters')
      .then((res) => res.json())
      .then((res) => setParentQuestion(res));
  };

  useEffect(() => {
    fetchData();
    fetchQuestionTypes();
    fetchParentQuestion();
    fetchDifficultyType();
    fetchSubTopic();
  }, []);

  //Add a difficulty-type
  const addQuestion = () => {
    console.log(weightage);
    try {
      console.log(text);
      axios
        .post('http://localhost:8080/api/question-masters', {
          text,
          weightage,
          questionTypeMaster,
          difficultyTypeMaster,
          subTopicMaster
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      setText('');
      setWeightage(null);
      setStrWeightage('');
      setQuestionTypeMaster('');
      setDifficultyTypeMaster('');
      setSubTopicMaster('');
      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  //Deleting question-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;
      axios
        .delete(`http://localhost:8080/api/question-masters/${cid}`, {
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

    const getQuestion = (id) => {
        let qid = id.data.id;
        axios
            .get(`http://localhost:8080/api/question-masters/${qid}`)
            .then((res) => {
                res.data;
                setText(res.data.text);
                setWeightage(res.data.weightage);
                setStrWeightage(String(res.data.weightage));
                setSubTopicMaster(res.data.subTopicMaster);
                setQuestionTypeMaster(res.data.questionTypeMaster);
                setDifficultyTypeMaster(res.data.difficultyTypeMaster);
                setId(qid);

            });
        setEditOpen(true);
        console.log(id);
    };

    const updateQuestion = () => {
        axios
            .put(
                `http://localhost:8080/api/question-masters`,
                {
                    id,
                    text,
                    questionTypeMaster,
                    difficultyTypeMaster,
                    weightage,
                    subTopicMaster,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                res.data;
                setText('');
                setWeightage(null);
                setStrWeightage('');
                setQuestionTypeMaster('');
                setDifficultyTypeMaster('');
                setSubTopicMaster('');
                setId(null);
                setEditOpen(false);
            });

        setEditOpen(false);
        fetchData();
    };

  return (
    <div>
      <div>
        <h3>Questions</h3>
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
                Add Question
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
                onClick={() => getQuestion(id)}
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
            minHeight: {xs: 600, sm: 600},
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
              <label>Question Types</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Question'
                  name='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
                <TextField
                  placeholder='Weightage'
                  name='strWeightage'
                  value={strWeightage}
                  onChange={(e) => {
                      setStrWeightage(e.target.value);
                      setWeightage(parseFloat(e.target.value));
                  }}
                  variant='outlined'
                  style={{
                    width: '100px',
                  }}
                  label='Weightage'
                />

                <TextField
                  select
                  placeholder='Que Type'
                  name='questionTypeMaster'
                  value={questionTypeMaster}
                  onChange={(e) => setQuestionTypeMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '210px',
                    marginLeft: '20px',
                  }}
                  label='Que Type'
                >
                  {questionType.map((result) => {
                    return (
                      <MenuItem key={result.id} value={result}>
                        {result.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <label>Difficulty Type</label>
                <TextField
                  select
                  placeholder='Difficulty Type'
                  name='difficultyTypeMaster'
                  value={difficultyTypeMaster}
                  onChange={(e) => setDifficultyTypeMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {difficultyType.map((result) => {
                    return (
                      <MenuItem key={result.id} value={result}>
                        {result.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <label>Sub-Topic</label>
                <TextField
                  select
                  placeholder='Sub-Topic'
                  name='subTopicMaster'
                  value={subTopicMaster}
                  onChange={(e) => setSubTopicMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {subTopic.map((result) => {
                    return (
                      <MenuItem key={result.id} value={result}>
                        {result.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid
                item
                style={{
                  width: '330px',
                  marginTop: '30px',
                }}
              >
                <label>Parent Question</label>

                <TextField
                  select
                  placeholder='Parent Question'
                  name='parentQuestionMaster'
                  value={parentQuestionMaster}
                  onChange={(e) => setParentQuestionMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '100%',
                  }}
                >
                  {parentQuestion.map((result) => {
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
                      marginLeft: '15px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => addQuestion()}
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
                        setText('');
                        setDifficultyTypeMaster('');
                        setWeightage(null);
                        setStrWeightage('');
                        setQuestionTypeMaster('');
                    }
                  }
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
                    minHeight: {xs: 600, sm: 600},
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
                        <label>Question Types</label>
                        <Grid
                            item
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                placeholder='Enter Question'
                                name='text'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
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
                            <TextField
                                placeholder='Weightage'
                                name='strWeightage'
                                value={strWeightage}
                                onChange={(e) => {
                                    setStrWeightage(e.target.value);
                                    setWeightage(parseFloat(e.target.value));
                                }}
                                variant='outlined'
                                style={{
                                    width: '100px',
                                }}
                                label='Weightage'
                            />

                            <TextField
                                select
                                placeholder='Que Type'
                                name='questionTypeMaster'
                                value={questionTypeMaster}
                                onChange={(e) => setQuestionTypeMaster(e.target.value)}
                                variant='outlined'
                                style={{
                                    width: '210px',
                                    marginLeft: '20px',
                                }}
                                label='Que Type'
                            >
                                {questionType.map((result) => {
                                    return (
                                        <MenuItem key={result.id} value={result}>
                                            {result.name}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            style={{
                                width: '100%',
                                marginTop: '30px',
                            }}
                        >
                            <label>Difficulty Type</label>
                            <TextField
                                select
                                placeholder='Difficulty Type'
                                name='difficultyTypeMaster'
                                value={difficultyTypeMaster}
                                onChange={(e) => setDifficultyTypeMaster(e.target.value)}
                                variant='outlined'
                                style={{
                                    width: '330px',
                                }}
                            >
                                {difficultyType.map((result) => {
                                    return (
                                        <MenuItem key={result.id} value={result}>
                                            {result.name}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            style={{
                                width: '100%',
                                marginTop: '30px',
                            }}
                        >
                            <label>Sub-Topic</label>
                            <TextField
                                select
                                placeholder='Sub-Topic'
                                name='subTopicMaster'
                                value={subTopicMaster}
                                onChange={(e) => setSubTopicMaster(e.target.value)}
                                variant='outlined'
                                style={{
                                    width: '330px',
                                }}
                            >
                                {subTopic.map((result) => {
                                    return (
                                        <MenuItem key={result.id} value={result}>
                                            {result.name}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Grid>

                        <Grid
                            item
                            style={{
                                width: '330px',
                                marginTop: '30px',
                            }}
                        >
                            <label>Parent Question</label>

                            <TextField
                                select
                                placeholder='Parent Question'
                                name='parentQuestionMaster'
                                value={parentQuestionMaster}
                                onChange={(e) => setParentQuestionMaster(e.target.value)}
                                variant='outlined'
                                style={{
                                    width: '100%',
                                }}
                            >
                                {parentQuestion.map((result) => {
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
                                        marginLeft: '15px',
                                    }}
                                    color='primary'
                                    variant='contained'
                                    onClick={() => updateQuestion()}
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
                                        setText('');
                                        setDifficultyTypeMaster('');
                                        setWeightage(null);
                                        setStrWeightage('');
                                        setQuestionTypeMaster('');
                                        setSubTopicMaster('');
                                        setId(null);
                                    }
                                    }
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

export default QuestionMasters;
