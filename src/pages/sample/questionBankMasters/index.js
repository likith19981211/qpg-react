import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from "@mui/material/Select/Select";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const QuestionBankMasters = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [college, setCollege] = useState([]);
  const [collegeMaster, setCollegeMaster] = useState('');
  const [department, setDepartment] = useState([]);
  const [departmentMaster, setDepartmentMaster] = useState('');
  const [course, setCourse] = useState([]);
  const [courseMaster, setCourseMaster] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryMaster, setCategoryMaster] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryMaster, setSubCategoryMaster] = useState('');
  const [subject, setSubject] = useState([]);
  const [subjectMaster, setSubjectMaster] = useState('');
  const [subSubject, setSubSubject] = useState([]);
  const [subSubjectMaster, setSubSubjectMaster] = useState('');
  const [topic, setTopic] = useState([]);
  const [topicMaster, setTopicMaster] = useState('');
  const [subTopic, setSubTopic] = useState([]);
  const [subTopicMaster, setSubTopicMaster] = useState('');
  const [questionBankFile, setQuestionBankFile] = useState(null);
  const [questionBankFileContentType, setQuestionBankFileContentType] =
    useState('');

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Question Bank Master', field: 'questionBankFileContentType'},
  ];

  const fetchData = () => {
    fetch('http://localhost:8080/api/question-bank-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    fetchData();
    fetchCollege();
    fetchDepartment();
    fetchCourse();
    fetchCategory();
    fetchSubCategory();
    fetchSubject();
    fetchSubSubject();
    fetchTopic();
    fetchSubTopic();
  }, []);


  const fetchCollege = () => {
    fetch('http://localhost:8080/api/college-masters')
      .then((res) => res.json())
      .then((res) => setCollege(res));
  };

  const fetchDepartment = () => {
    fetch('http://localhost:8080/api/department-masters')
      .then((res) => res.json())
      .then((res) => setDepartment(res));
  };
  const fetchCourse = () => {
    fetch('http://localhost:8080/api/course-masters')
      .then((res) => res.json())
      .then((res) => setCourse(res));
  };

  const fetchCategory = () => {
    fetch('http://localhost:8080/api/category-masters')
      .then((res) => res.json())
      .then((res) => setCategory(res));
  };

  const fetchSubCategory = () => {
    fetch('http://localhost:8080/api/sub-category-masters')
      .then((res) => res.json())
      .then((res) => setSubCategory(res));
  };

  const fetchSubject = () => {
    fetch('http://localhost:8080/api/subject-masters')
      .then((res) => res.json())
      .then((res) => setSubject(res));
  };

  const fetchSubSubject = () => {
    fetch('http://localhost:8080/api/sub-subject-masters')
      .then((res) => res.json())
      .then((res) => setSubSubject(res));
  };

  const fetchTopic = () => {
    fetch('http://localhost:8080/api/topic-masters')
      .then((res) => res.json())
      .then((res) => setTopic(res));
  };

  const fetchSubTopic = () => {
    fetch('http://localhost:8080/api/sub-topic-masters')
      .then((res) => res.json())
      .then((res) => setSubTopic(res));
  };

  //Add a question-bank
  const addQuestionBank = () => {

    console.log('qbfile', questionBankFile);
    console.log('qbfileCT', questionBankFileContentType);
    try {
      axios
        .post('http://localhost:8080/api/question-bank-masters', {
          collegeMaster,
          departmentMaster,
          courseMaster,
          categoryMaster,
          subCategoryMaster,
          subjectMaster,
          subSubjectMaster,
          topicMaster,
          subTopicMaster,
          questionBankFile,
          questionBankFileContentType,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));

      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  //Deleting sub-category-master data
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/question-bank-masters/${cid}`, {
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
                Add Question Bank
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
          overflow: 'scroll',
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            height: {xs: 500, sm: 500},
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
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <label>College</label>
                <TextField
                  select
                  placeholder='Select College'
                  name='collegeMaster'
                  value={collegeMaster}
                  onChange={(e) => setCollegeMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
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

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>Department</label>
                <TextField
                  select
                  placeholder='Select Department'
                  name='departmentMaster'
                  value={departmentMaster}
                  onChange={(e) => setDepartmentMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {department.map((result) => {
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
                  marginTop: '20px',
                }}
              >
                <label>Course</label>
                <TextField
                  select
                  placeholder='Select Course'
                  name='courseMaster'
                  value={courseMaster}
                  onChange={(e) => setCourseMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
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

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>Category</label>
                <TextField
                  select
                  placeholder='Select Category'
                  name='categoryMaster'
                  value={categoryMaster}
                  onChange={(e) => setCategoryMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {category.map((result) => {
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
                  marginTop: '20px',
                }}
              >
                <label>Sub-Category</label>
                <TextField
                  select
                  placeholder='Select Sub-Category'
                  name='subCategoryMaster'
                  value={subCategoryMaster}
                  onChange={(e) => setSubCategoryMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {subCategory.map((result) => {
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
                  marginTop: '20px',
                }}
              >
                <label>Subject</label>
                <TextField
                  select
                  placeholder='Select Subject'
                  name='subjectMaster'
                  value={subjectMaster}
                  onChange={(e) => setSubjectMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
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

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>Sub-Subject</label>
                <TextField
                  select
                  placeholder='Select Sub-Subject'
                  name='subSubjectMaster'
                  value={subSubjectMaster}
                  onChange={(e) => setSubSubjectMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {subSubject.map((result) => {
                    return (
                      <MenuItem key={result.id} value={result}>
                        {result.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <label
                style={{
                  marginTop: '20px',
                }}
              >
                Topic
              </label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  select
                  placeholder='Select Topic'
                  name='topicMaster'
                  value={topicMaster}
                  onChange={(e) => setTopicMaster(e.target.value)}
                  variant='outlined'
                  style={{
                    width: '330px',
                  }}
                >
                  {topic.map((result) => {
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
                  marginTop: '20px',
                }}
              >
                <label>Sub-Topic</label>
                <TextField
                  select
                  placeholder='Select Sub-Topic'
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
                  width: '100%',
                  marginTop: '30px',
                }}
              >
                <Button
                  variant='contained'
                  component='label'
                  style={{
                    width: '330px',
                    height: '40px',
                  }}
                >
                  Upload File
                  <input
                    type='file'
                    hidden
                    name='questionBankFile'
                    onChange={(e) => {
                        if(e.target.files != null) {
                            setQuestionBankFile(e.target.files);
                        }
                        //   console.log(questionBankFile.type);
                        setQuestionBankFileContentType(e.target.files[0].type);
                        console.log(e.target.files);
                    }}
                  />
                </Button>
              </Grid>

              <Grid item>
                <div
                  style={{
                    marginTop: '30px',
                    marginBottom: '20px',
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
                      marginLeft: '20px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => addQuestionBank()}
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

export default QuestionBankMasters;
