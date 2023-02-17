import { MODE } from "../constants";

export const isEmpty = (value: string) => {
  return !value;
};


export const simplifyResJson = (json: []) => {
  return json.map((item: any) => {
    const id = item?.properties?.id;
    const labelArray = item?.properties?.label.split(", ");
    return {
      id,
      labelArray,
      layer: item?.properties?.layer,
      coordinates: {
        lat: item?.geometry?.coordinates[1],
        lon: item?.geometry?.coordinates[0],
      },
    };
  });
};

export const hasInvalidValue = (value: any) => {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === "" || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === "object" &&
      Object.values(value).some(
        (item) => item === "" || item === null || item === undefined,
      )) // check for empty object
  );
};

export const renderBandColor = (mode: string) => {
  let color = "";
  switch (mode) {
    case MODE.BUS:
      return (color = "#007ac9");
    case MODE.TRAM:
      return (color = "green");
    case MODE.RAIL:
      return (color = "#8c4799");
    case MODE.SUBWAY:
      return (color = "rgb(255 72 0");
    default:
      return (color = "#ddd");
  }
};

export const renderIcon = (mode: any): JSX.Element => {
  let icon = "";
  switch (mode) {
    case MODE.BUS:
      icon = "directions_bus";
      break;
    case MODE.TRAM:
      icon = "tram";
      break;
    case MODE.RAIL:
      icon = "train";
      break;
    case MODE.SUBWAY:
      icon = "directions_subway";
      break;
    default:
      icon = "directions_walk";
  }
  return <span className='material-icons'> {icon} </span>;
};

export const convertMinToHour = (time: number) => {
  if (time < 3600) {
    return `${Math.ceil(time / 60)} min`;
  } else {
    const hour = Math.floor(time / 3600);
    const min = Math.ceil((time % 3600) / 60);
    return `${hour} h ${min} min`;
  }
};

/**
 * Debounce an operation.
 * @param {void} func - The function that you want to execute after the debounce time.
    * @param {number} wait - The amount of time you want the debounce function to wait after the last received action before executing func.
    * @returns {func} The function being passed as argument.
    */
export function debounce(func: Function, wait: number) {
  let timeout: any;

  return function executedFunction(...args: []) {
    const later = () => {
      // End the debounce
      timeout = null;
      // Execute the input function
      func(...args);
    };
    // Prevents the input function from executed
    clearTimeout(timeout);
    // Restart the debounce
    timeout = setTimeout(later, wait);
  };
}
