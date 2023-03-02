import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from "@mui/material/Select/Select";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const ExamMasters = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [college, setCollege] = useState([]);
  const [startDate, setStartDate] = useState(null);
  //    const [dValue, setDValue] = React.useState(null);
  const [collegeMaster, setCollegeMaster] = useState('');
  const [questionBluePrint, setQuestionBluePrint] = useState([]);
  const [department, setDepartment] = useState([]);
  const [questionBluePrintMaster, setQuestionBluePrintMaster] = useState('');
  const [departmentMaster, setDepartmentMaster] = useState('');
  const [course, setCourse] = useState([]);
  // const [eid, setEid] = useState(null);
  const [id, setId] = useState(null);
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
  const [subTMaster, setSubTopicMaster] = useState('');
  const [generateOpen, setGenerateOpen] = useState(false);
const [subTopicMaster, setSubTM] = useState(null);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Title', field: 'title'},
    {title: 'Start Date', field: 'startDate'},
    {title: 'College', field: 'collegeMaster.name'},
    {title: 'Department', field: 'departmentMaster.name'},
    {title: 'Course', field: 'courseMaster.name'},
    {title: 'Category', field: 'categoryMaster.name'},
    {title: 'Sub Category', field: 'subCategoryMaster.name'},
    {title: 'Subject', field: 'subjectMaster.name'},
    {title: 'Sub Subject', field: 'subSubjectMaster.name'},
    {title: 'Topic', field: 'topicMaster.name'},
    {title: 'Sub Topic', field: 'subTopicMaster.name'},
  ];

  //Fetching question-blue-print-masters data
  const fetchData = () => {
    fetch('http://localhost:8080/api/exam-masters')
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
    fetchQuestionBluePrints();
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

  const fetchQuestionBluePrints = () => {
    fetch('http://localhost:8080/api/question-blue-print-masters')
      .then((res) => res.json())
      .then((res) => setQuestionBluePrint(res));
  };

  //Deleting question-blue-print-masters data
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/exam-masters/${cid}`, {
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

  const getDataById = (id) => {
    let eid = id.data.id;

    try {
      axios
        .get(`http://localhost:8080/api/exam-masters/${eid}`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setTitle(res.title);
          setCollegeMaster(res.collegeMaster);
          setDepartmentMaster(res.departmentMaster);
          setCourseMaster(res.courseMaster);
          setCategoryMaster(res.categoryMaster);
          setSubCategoryMaster(res.subCategoryMaster);
          setSubjectMaster(res.subjectMaster);
          setSubSubjectMaster(res.subSubjectMaster);
          setTopicMaster(res.topicMaster);
          setSubTM(res.subTopicMaster);
          setStartDate(res.startDate);
          setId(eid);
          setGenerateOpen(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Generating Question Paper
  const saveAndGenerate = () => {
    try {
      axios
        .put(`http://localhost:8080/api/exam-masters/${id}`, {
          categoryMaster,
          collegeMaster,
          courseMaster,
          departmentMaster,
          questionBluePrintMaster,
          startDate,
          id,
          subCategoryMaster,
          subSubjectMaster,
          subTopicMaster,
          subjectMaster,
          title,
          topicMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setGenerateOpen(false);
      setId(null);
     // alert("Question Paper is successfully Generated..");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h3>Exams</h3>
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
                Add Exam
              </Button>
            </div>
          ),

          Action: (id) => (
            <>
              <Button
                color='inherit'
                variant='contained'
                style={{textTransform: 'none'}}
                size='small'
                onClick={() => getDataById(id)}
              >
                Generate
              </Button>
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
            minHeight: {xs: 500, sm: 500},
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
                  marginTop: '20px',
                }}
              >
                <label>Name</label>
                <TextField
                  placeholder='Name'
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  marginTop: '20px',
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
                  value={subTMaster}
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
                  marginTop: '20px',
                }}
              >
                <label style={{width: '2px'}}>Start of Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    placeholder='Select Date'
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        style={{
                          width: '330px',
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
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
                      marginLeft: '20px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => console.log('Add Exam')}
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
            minHeight: {xs: 500, sm: 500},
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
                  marginTop: '20px',
                }}
              >
                <label>Name</label>
                <TextField
                  placeholder='Name'
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  marginTop: '20px',
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
                  value={subTMaster}
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
                      marginLeft: '20px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => console.log('Add Exam')}
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

      <Modal
        open={generateOpen}
        onClose={() => {
          setGenerateOpen(false);
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
            maxWidth: 1200,
            minHeight: {xs: 800, sm: 800},
            width: '100%',
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
                marginTop: '10px',
                marginRight: '10px',
              }}
            >
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '10px',
                }}
              >
                <label>
                  <h5>Title</h5>
                </label>
                <p>{title}</p>
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>College</h5>
                </label>
                <p>{collegeMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Department</h5>
                </label>
                <p>{departmentMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Course</h5>
                </label>
                <p>{courseMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Category</h5>
                </label>
                <p>{categoryMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Sub Category</h5>
                </label>
                <p>{subCategoryMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Subject</h5>
                </label>
                <p>{subjectMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Sub Subject</h5>
                </label>
                <p>{subSubjectMaster.name}</p>
              </Grid>
              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Topic</h5>
                </label>
                <p>{topicMaster.name}</p>
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Sub Topic</h5>
                </label>
                <p>{subTMaster.name}</p>
              </Grid>

              <Grid
                item
                style={{
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <label>
                  <h5>Start Date</h5>
                </label>
                <p>{startDate}</p>
              </Grid>

              <div>
                <Grid
                  item
                  style={{
                    width: '100%',
                    marginTop: '20px',
                  }}
                >
                  <label>
                    <h5>Question Blue Print</h5>
                  </label>
                  <TextField
                    select
                    placeholder='Select Blue Print'
                    name='questionBluePrintMaster'
                    value={questionBluePrintMaster}
                    onChange={(e) => setQuestionBluePrintMaster(e.target.value)}
                    variant='outlined'
                    style={{
                      width: '1100px',
                    }}
                  >
                    {questionBluePrint.map((result) => {
                      return (
                        <MenuItem key={result.id} value={result}>
                          {result.bpMasterLabel}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </div>

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
                      marginLeft: '20px',
                    }}
                    color='primary'
                    variant='contained'
                    onClick={() => saveAndGenerate()}
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
                    onClick={() => setGenerateOpen(false)}
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

export default ExamMasters;
