import axios from "axios";

const baseUrl = "http://localHost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log("🤯🤯🤯🤯", data);
    return res.data;
  } catch (err) {}
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/users/getUsers`);
    // console.log("🤯🤯🤯🤯", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/artist/getAll`);
    // console.log("😮‍💨😮‍💨😮‍💨", res.data.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseUrl}api/users/deleteUser/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/song/getAll`);
    // console.log("get all songs", res.data);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseUrl}api/album/getAll`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseUrl}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseUrl}api/artist/save`, { ...data });
    return (await res).data.saveArtist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseUrl}api/album/save`, { ...data });
    return (await res).data.saveAlbum;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseUrl}api/song/save`, { ...data });
    return (await res).data.saveSong;
  } catch (error) {
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    const res = axios.delete(`${baseUrl}api/song/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteAlbumById = async (id) => {
  try {
    const res = axios.delete(`${baseUrl}api/album/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteArtistById = async (id) => {
  try {
    const res = axios.delete(`${baseUrl}api/artist/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
