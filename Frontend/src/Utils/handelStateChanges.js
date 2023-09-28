const handelStateChanges = (event, state, setState) => {
  if (typeof state === "object") {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }
};
export default handelStateChanges;
