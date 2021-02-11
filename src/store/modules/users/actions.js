import api from '../../../apiClient';

// import permissions from './Permissions';

const actions = {
  // OK
  signUp({ dispatch }, { credentials }) {
    dispatch('services/POST', { uri: 'signup', data: credentials }, { root: true })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  },

  // Ok
  retrieveToken({ commit, dispatch }, { credentials }) {
    return new Promise((resolve, reject) => {
      dispatch('services/POST', { uri: 'signin', data: credentials }, { root: true })
        .then((response) => {
          commit('SET_CURRENT_USER', response.data);
          commit('services/STORAGE_TOKEN', response.data.token, { root: true });
          resolve(response);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },

  loadCurrentUser({ state }) {
    return state.currentUser;
  },

  loadUserId({ commit, dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      dispatch('services/GET', { uri: `users/${id}` }, { root: true })
        .then((response) => {
          commit('SET_CURRENT_USER', response.data[0]);
          resolve(response);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },

  authentication({ dispatch, rootGetters }) {
    try {
      return dispatch('loadUserId', { id: rootGetters['services/decodeToken'].id });
    } catch (error) {
      return error;
    }
  },

  // IMPLEMENT REQUEST???
  destroyToken({ commit }) {
    localStorage.removeItem('access_token');
    commit('DESTROY_CURRENT_USER');
    console.log('logout');
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  addPin({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      console.log('users/addPin');
      api.post('/addNewPin', {
        title: data.title,
        category: data.category,
        email: data.email,
        phone: data.phone,
        street: data.street,
        neighborhood: data.neighborhood,
        zipcode: data.zipcode,
        number: data.number,
        city: data.city,
        imgUrl: data.imgUrl,
        content: data.content,
        linkF: data.linkF,
        linkIG: data.linkIG,
        otherLink: data.otherLink,
        userId: data.userId, // ONLY USERID OR USERREF {}  ??????
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': authorization,
        },
      })
        .then((response) => {
          console.log('users/addPin RESPONSE', response.data);
          commit('ADD_PIN', response.data);
          resolve(response);
        })
        .catch((error) => {
          console.log('users/addPin - ERROR', error.message);
          reject(error);
        });
    });
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  addNewEvent({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      api.post('/addNewEvent', {
        title: data.title,
        userId: data.userId, // userId or userRef {} ????
        date: data.date,
        street: data.street,
        neighborhood: data.neighborhood,
        number: data.number,
        city: data.city,
        zipcode: data.zipcode,
        ticket: data.ticket,
        content: data.content,
        link: data.link,
        imgUrl: data.imgUrl,
      })
        .then((response) => {
          console.log('users/addNewEvent RESPONSE', response.data);
          commit('ADD_EVENT', response.data);
          resolve(response);
        })
        .catch((error) => {
          console.log('users/addNewEvent - ERROR', error.message);
          reject(error);
        });
    });
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  likeReply({ state, commit, dispatch }, { replyId }) {
    console.log(state.currentUser.id); // TO BE DELETED
    // Promise((resolve, reject) => {
    //   api.post('/likeReply', {
    //     replyId,
    //     userId: state.currentUser.id,
    //   })
    //     .then((response) => {
    //       console.log('users/addLike');
    //       dispatch('topics/incrementLikeInReply', { replyId }, { root: true }); // call incrementLike on topicModule
    //       commit('ADD_LIKE', { response.data });
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       reject(error);
    //     });
    // });
    dispatch('setKey'); // TO BE DELETED
    const likeId = state.key; // TO BE DELETED
    const like = { likeId, replyId, userId: state.currentUser.id }; // TO BE DELETED
    commit('ADD_LIKE', { like }); // TO BE DELETED
    console.log('users/addLike'); // TO BE DELETED
  },

  // IMPLEMENT REQUEST - ADD TOKEN
  unlikeReply({ state, commit, dispatch }, { replyId }) {
    console.log(state.currentUser.id); // TO BE DELETED
    // Promise((resolve, reject) => {
    //   api.delete('/removeLikeInReply', {
    //     replyId,
    //   })
    //     .then(() => {
    //       console.log('users/removeLike');
    //       dispatch('topics/decrementLikeInReply', { replyId }, { root: true }); // call decrementLike on topicModule
    //       commit('REMOVE_LIKE', { replyId });
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       reject(error);
    //     });
    // });
    dispatch('topics/decrementLikeInReply', { replyId }, { root: true }); // call decrementLike on topicModule
    commit('REMOVE_LIKE', { replyId });
    console.log('users/unlikeLike');
  },

  // IMPLEMENT REQUEST - ADD TOKEN - CONTINUE HERE
  supportThis({ state, dispatch, commit }, { topicId, supportType }) {
    console.log('fake log', state.currentUser.id); // TO BE DELETED
    const newSupport = { topicId, supportType }; // TO BE DELETED
    // Promise((resolve, reject) => {
    //   api.post('/supportTopic', {
    //     topicId,
    //     supportType,
    //     userId: state.currentUser.id,
    //   })
    //     .then((response) => {
    //       console.log('users/supportThis', topicId);
    //       dispatch('topics/supportCurrentTopic', response.data, { root: true });
    //       commit('ADD_SUPPORT', response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       reject(error);
    //     });
    // });
    dispatch('topics/supportCurrentTopic', { supportType }, { root: true }); // // TO BE DELETED
    commit('ADD_SUPPORT', newSupport); // // TO BE DELETED
  },

  // OK
  setKey({ commit }) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i += 1) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const key = autoId;
    console.log('generated KEY', key);
    commit('SET_KEY', { newKey: key });
  },
};

export default actions;
