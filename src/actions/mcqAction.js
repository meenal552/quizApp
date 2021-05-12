import { FETCH_MCQS } from "./types";

export const fetchMcqs = (id) => (dispatch) => {
  console.log("fetching" + id);
  fetch(`https://quiz--site-server.herokuapp.com/mcq/${id}`)
    .then((res) => res.json())
    .then((mcqs) =>
      dispatch({
        type: FETCH_MCQS,
        payload: mcqs,
      })
    );
};
