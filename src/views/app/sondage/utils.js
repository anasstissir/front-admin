import moment from 'moment'
import React from 'react'

export const labelUpcoming = (startDate, endDate) => {
  if (
    moment(startDate).format("YYYY/MM/DD") >
    moment().format("YYYY/MM/DD")
  ) {
    return 'A venir';
  } else if (
    moment().format("YYYY/MM/DD") >
    moment(endDate).format("YYYY/MM/DD")
  ) {
    return 'Terminé';
  } else {
    if (
      moment().format("YYYY/MM/DD") >
      moment(startDate).format("YYYY/MM/DD") &&
      moment().format("YYYY/MM/DD") <
      moment(endDate).format("YYYY/MM/DD")
    ) {
      return 'Maintenant';
    }
  }

  return 'Inconnu'
}

export const labelUpcomingDesign = (startDate, endDate) => {
  if (
    moment(startDate).format("YYYY/MM/DD") >
    moment().format("YYYY/MM/DD")
  ) {
    return 'warning';
  } else if (
    moment().format("YYYY/MM/DD") >
    moment(endDate).format("YYYY/MM/DD")
  ) {
    return 'success';
  } else {
    if (
      moment().format("YYYY/MM/DD") >
      moment(startDate).format("YYYY/MM/DD") &&
      moment().format("YYYY/MM/DD") <
      moment(endDate).format("YYYY/MM/DD")
    ) {
      return 'primary';
    }
  }

  return 'dark'
}

export const MiniCard = (props) => {
  return (
    <div className={props.className}>
      {props.component}
      <div className="pl-3 pr-2">
        <p className="font-weight-medium mb-0">
          {props.header}
        </p>
        <p className="font-weight-medium mb-0">
          {props.sub}
        </p>
      </div>
    </div>
  )
}

export const formatStatus = status => {
  switch (status) {
    case "SAVED":
      return "Enregistré";
    case "PUBLISHED":
      return "Publié";
    
  }
}

export const renderColor = (status) => {
  const mod = (status.length + status[0].charCodeAt(0)) % 4;
  switch (mod) {
    case 1:
      return "success";
    case 2:
      return "primary";
    case 3:
      return "secondary";
    case 4:
      return "dark";
    default:
      return "warning";
  }
};