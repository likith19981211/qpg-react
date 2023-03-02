import React, {useEffect, useState} from 'react';
//import {Box} from '@mui/material';
import MaterialTable, {MTableToolbar} from 'material-table';
import Button from '@mui/material/Button';
import axios from 'axios';
import {Card, CardContent, Grid, Modal, TextField} from '@mui/material';
//import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem';
//import axios from 'axios';
//axios.defaults.withCredentials = true;

const SubjectMasters = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryMaster, setSubCategoryMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Subject', field: 'name'},

    {title: 'Sub-Category', field: 'subCategoryMaster.name'},
    {title: 'Category', field: 'subCategoryMaster.categoryMaster.name'},
    {
      title: 'Course',
      field: 'subCategoryMaster.categoryMaster.courseMaster.name',
    },
    {
      title: 'Department',
      field:
        'subCategoryMaster.categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field:
        'subCategoryMaster.categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  //Fetching subject-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/subject-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    async function fetchSubCategory() {
      await fetch('http://localhost:8080/api/sub-category-masters')
        .then((res) => res.json())
        .then((res) => {
          console.log(subCategory);
          setSubCategory(res);
        });
    }
    fetchData();
    fetchSubCategory();
  }, []);

  //Adding a subject-master
  const addSubject = (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(subCategoryMaster);
      axios
        .post('http://localhost:8080/api/subject-masters', {
          name,
          subCategoryMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setName('');
      setSubCategoryMaster('');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

    const getSubject = (id) => {
        let sid = id.data.id;
        axios
            .get(`http://localhost:8080/api/subject-masters/${sid}`)
            .then((res) => {
                res.data;
                setName(res.data.name);
                setId(sid);
            });
        setEditOpen(true);
    };

  //Deleting subject-master
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/subject-masters/${cid}`, {
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

    const updateSubject = () => {
        try {
            axios
                .put('http://localhost:8080/api/subject-masters', {
                    id,
                    name,
                   subCategoryMaster,
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
        <h3>Subjects</h3>
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
                Add Subject
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
                onClick={() =>getSubject(id)}
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
              <label>Subject</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Subject Name'
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
                <label>Select Sub-Category</label>

                <TextField
                  select
                  value={subCategoryMaster}
                  name='subCategoryMaster'
                  onChange={(e) => {
                    setSubCategoryMaster(e.target.value);
                    console.log('subCategoryMaster', subCategoryMaster);
                  }}
                  style={{
                    width: '100%',
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
                    onClick={addSubject}
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
                        <label>Subject</label>
                        <Grid
                            item
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                placeholder='Enter Subject Name'
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
                            <label>Select Sub-Category</label>

                            <TextField
                                select
                                value={subCategoryMaster}
                                name='subCategoryMaster'
                                onChange={(e) => {
                                    setSubCategoryMaster(e.target.value);
                                    console.log('subCategoryMaster', subCategoryMaster);
                                }}
                                style={{
                                    width: '100%',
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
                                    onClick={() => updateSubject()}
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

export default SubjectMasters;
