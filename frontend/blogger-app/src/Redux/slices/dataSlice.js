import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    userInfo: {
      id: '',
      name: '',
    },
    blogData: {
      title: '',
      content: '',
    },
    auth: {
      loginData: { email: '', password: '' },
      signupData: { name: '', email: '', password: '', confirmPassword: '' },
      errors: {
        loginEmail: '',
        loginPassword: '',
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
      },
    },
    newComment: '',
    blogs: [],
    myBlogs: [],
    comments: [],
    editComment: {
      id: null,
      comment: '',
    },
    blogDetails: {
      blog_master_id: null,
      blog_title: '',
      blog_detail: '',
      blog_author_id: null,
      blog_author_name: '',
      created_at: '',
    },
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },

    setLogin: (state, action) => {
      state.auth.loginData = action.payload;
    },
    setSignup: (state, action) => {
      state.auth.signupData = action.payload;
    },
    validate: (state, action) => {
      const { email, password, name, confirmPassword } = action.payload;

      // Reset all errors before validating
      state.auth.errors = {
        loginEmail: '',
        loginPassword: '',
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
      };

      // Validation for login
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        state.auth.errors.loginEmail = 'Invalid email address';
      }

      if (password && password.length < 6) {
        state.auth.errors.loginPassword =
          'Password must be at least 6 characters';
      }

      // Validation for signup
      if (name !== undefined && name.trim() === '') {
        state.auth.errors.signupName = 'Name is required';
      }

      if (email && !/\S+@\S+\.\S+/.test(email)) {
        state.auth.errors.signupEmail = 'Invalid email address';
      }

      if (password && password.length < 6) {
        state.auth.errors.signupPassword =
          'Password must be at least 6 characters';
      }

      if (confirmPassword !== undefined && confirmPassword !== password) {
        state.auth.errors.signupConfirmPassword = 'Passwords do not match';
      }
    },

    setNewComment: (state, action) => {
      state.newComment = action.payload;
    },

    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    setMyBlogs: (state, action) => {
      state.myBlogs = action.payload;
    },

    setComments: (state, action) => {
      state.comments = action.payload;
    },

    setEditComment: (state, action) => {
      state.editComment = action.payload;
    },

    setBlogDetails: (state, action) => {
      state.blogDetails = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setBlogData,
  setLogin,
  setSignup,
  validate,
  setNewComment,
  setBlogs,
  setMyBlogs,
  setComments,
  setEditComment,
  setBlogDetails,
} = dataSlice.actions;
export { dataSlice };
