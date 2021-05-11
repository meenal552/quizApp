import { FETCH_MCQS } from "./types";

export const fetchMcqs = (id) => (dispatch) => {
  console.log("fetching" + id);
  fetch(`http://localhost:5000/mcq/${id}`)
    .then((res) => res.json())
    .then((mcqs) =>
      dispatch({
        type: FETCH_MCQS,
        payload: mcqs,
      })
    );
};
