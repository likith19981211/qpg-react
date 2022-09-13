import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from "@mui/material/Button";
import {Card, CardContent, Grid, Modal, TextField} from "@mui/material";
//import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
//axios.defaults.withCredentials = true;

const SubTopicMasters = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [topic, setTopic] = useState([]);
  const [topicMaster, setTopicMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Sub-Topic', field: 'name'},
    {title: 'Topic', field: 'topicMaster.name'},
    {title: 'Sub-Subject', field: 'topicMaster.subSubjectMaster.name'},
    {
      title: 'Subject',
      field: 'topicMaster.subSubjectMaster.subjectMaster.name',
    },
    {
      title: 'Sub-Category',
      field:
        'topicMaster.subSubjectMaster.subjectMaster.subCategoryMaster.name',
    },
    {
      title: 'Category',
      field:
        'topicMaster.subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.name',
    },
    {
      title: 'Course',
      field:
        'topicMaster.subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.courseMaster.name',
    },
    {
      title: 'Department',
      field:
        'topicMaster.subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field:
        'topicMaster.subSubjectMaster.subjectMaster.subCategoryMaster.categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  //Fetching sub-topic-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/sub-topic-masters', {
      withCredentials: true,
    })
        .then((res) => res.json())
        .then((res) => setData(res));
  };

  useEffect( () => {
      async function fetchTopic() {
          await fetch('http://localhost:8080/api/topic-masters')
              .then((res) => res.json())
              .then((res) => {
                  console.log(topic);
                  setTopic(res);
              });
      }
     fetchData();
      fetchTopic();
  }, []);

    //Adding a sub-topic-master
    const addSubTopic = (e) => {
        e.preventDefault();
        try {
            console.log(name);
            console.log(topicMaster);
            axios
                .post('http://localhost:8080/api/sub-topic-masters', {
                    name,
                    topicMaster,
                })
                .then((res) => res.data)
                .then((res) => console.log(res.data));
            fetchData();
            setName('');
            setTopicMaster('');
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubTopic = (id) => {
        let sid = id.data.id;
        axios
            .get(`http://localhost:8080/api/sub-topic-masters/${sid}`)
            .then((res) => {
                res.data;
                setName(res.data.name);
            });
        setEditOpen(true);
    };

  //Deleting topic-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
          .delete(`http://localhost:8080/api/sub-topic-masters/${cid}`, {
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
                  Add Sub-Topic
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
                    onClick={() => getSubTopic(id)}
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
              <label>Sub-Topic</label>
              <Grid
                  item
                  style={{
                    width: '100%',
                  }}
              >
                <TextField
                    placeholder='Enter Sub-Topic'
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
                <label>Topic</label>

                <TextField
                    select
                    value={topicMaster}
                    name= 'topicMaster'
                    onChange={(e) => {
                        setTopicMaster(e.target.value);
                        console.log('topicMaster', topicMaster);
                    }}
                    style={{
                      width: '100%',
                    }}
                >
                    {
                        topic.map((result) => {
                            return (
                                <MenuItem key={result.id} value={result}>
                                    {result.name}
                                </MenuItem>
                            );
                        })
                    }
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
                         onClick={addSubTopic}
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
                        <label>Sub-Topic</label>
                        <Grid
                            item
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                placeholder='Enter Sub-Topic'
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
                            <label>Topic</label>

                            <TextField
                                select
                                value={topicMaster}
                                name= 'topicMaster'
                                onChange={(e) => {
                                    setTopicMaster(e.target.value);
                                    console.log('topicMaster', topicMaster);
                                }}
                                style={{
                                    width: '100%',
                                }}
                            >
                                {
                                    topic.map((result) => {
                                        return (
                                            <MenuItem key={result.id} value={result}>
                                                {result.name}
                                            </MenuItem>
                                        );
                                    })
                                }
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
                                    onClick={addSubTopic}
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

export default SubTopicMasters;
