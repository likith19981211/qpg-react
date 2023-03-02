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

const SubCategoryMasters = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryMaster, setCategoryMaster] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      title: 'ID',
      field: 'id',
    },
    {title: 'Sub-Category', field: 'name'},

    {title: 'Category', field: 'categoryMaster.name'},
    {title: 'Course', field: 'categoryMaster.courseMaster.name'},
    {
      title: 'Department',
      field: 'categoryMaster.courseMaster.departmentMaster.name',
    },

    {
      title: 'College',
      field: 'categoryMaster.courseMaster.departmentMaster.collegeMaster.name',
    },
  ];

  //Fetching sub-category-master data
  const fetchData = () => {
    fetch('http://localhost:8080/api/sub-category-masters', {
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    async function fetchCategory() {
      await fetch('http://localhost:8080/api/category-masters')
        .then((res) => res.json())
        .then((res) => {
          console.log(category);
          setCategory(res);
        });
    }
    fetchData();
    fetchCategory();
  }, []);

  //Adding a sub-category-master
  const addSubCategory = (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(categoryMaster);
      axios
        .post('http://localhost:8080/api/sub-category-masters', {
          name,
          categoryMaster,
        })
        .then((res) => res.data)
        .then((res) => console.log(res.data));
      fetchData();
      setName('');
      setCategoryMaster('');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategory = (id) => {
    let cid = id.data.id;
    axios
      .get(`http://localhost:8080/api/sub-category-masters/${cid}`)
      .then((res) => {
        res.data;
        setName(res.data.name);
        setId(cid);
      });
    setEditOpen(true);
  };

  //Deleting sub-category-master data
  const deleteData = (id) => {
    try {
      let cid = id.data.id;

      axios
        .delete(`http://localhost:8080/api/sub-category-masters/${cid}`, {
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

    const updateSubCategory = () => {
        try {
            axios
                .put('http://localhost:8080/api/sub-category-masters', {
                    id,
                    name,
                    categoryMaster,
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
        <h3>Sub-Categories</h3>
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
                Add Sub-category
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
                onClick={() => getSubCategory(id)}
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
              <label>Sub-Category</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Sub-Category Name'
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
                <label>Select Category</label>

                <TextField
                  select
                  value={categoryMaster}
                  name='categoryMaster'
                  onChange={(e) => {
                    setCategoryMaster(e.target.value);
                    console.log('categoryMaster', categoryMaster);
                  }}
                  style={{
                    width: '100%',
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
                    onClick={addSubCategory}
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
              <label>Sub-Category</label>
              <Grid
                item
                style={{
                  width: '100%',
                }}
              >
                <TextField
                  placeholder='Enter Sub-Category Name'
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
                <label>Select Category</label>

                <TextField
                  select
                  value={categoryMaster}
                  name='categoryMaster'
                  onChange={(e) => {
                    setCategoryMaster(e.target.value);
                    console.log('categoryMaster', categoryMaster);
                  }}
                  style={{
                    width: '100%',
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
                    onClick={() => updateSubCategory()}
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

export default SubCategoryMasters;
