import { FETCH_MCQS } from "./types";

export const fetchMcqs = (id) => (dispatch) => {
  console.log("fetching" + id);
  const port = process.env.PORT || 5000;
  fetch(`http://localhost:${port}/mcq/${id}`)
    .then((res) => res.json())
    .then((mcqs) =>
      dispatch({
        type: FETCH_MCQS,
        payload: mcqs,
      })
    );
};
