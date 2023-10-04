const handelStateChanges = (event, state, setState) => {
  if (typeof state === "object") {
    const { name, value, type, checked, files } = event.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setState({ ...state, [name]: newValue });
  }
};
export default handelStateChanges;
