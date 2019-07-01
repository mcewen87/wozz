export default function updateEventState(state, index, updatedData) {
  return [
    ...state.slice(0, index),
    updatedData,
    ...state.slice(index + 1, state.length)
  ];
}
