import React from 'react'

const Notification = ({ notif, className }) => {
    if (notif === null) {
      return null
    }
  
    return (
      <div className={className}>
        {notif}
      </div>
    )
  }

export default Notification