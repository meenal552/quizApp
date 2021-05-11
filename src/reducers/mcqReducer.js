import { FETCH_MCQS } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MCQS:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
}
