import React from 'react'
import SideBar from './SideBar';
import TransHistory from '../DashComp/TransHistory';

const History = () => {
  return (
    <>
<div>
              <h2
                // onClick={handleShowTransacHis}
                className="absolute top-0 cursor-pointer"
              >
                <i className="fa fa-arrow-left"> </i>
              </h2>
              <TransHistory />
            </div>
        
                    <SideBar />
     </>
  )
}

export default History