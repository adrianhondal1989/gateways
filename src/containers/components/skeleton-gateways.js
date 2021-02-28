import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const SkeletonGateways = (props) => {


  return (
    <div className="px-4 pb-4">
      <Table
        // className={[classes.table, 'pb-3']}
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: '-webkit-left' }}>
              <Skeleton width="60%" />
            </TableCell>
            <TableCell style={{ textAlign: '-webkit-center' }}>
              <Skeleton width="60%" />
            </TableCell>
            <TableCell style={{ textAlign: '-webkit-center' }}>
              <Skeleton width="60%" />
            </TableCell>
            <TableCell style={{ textAlign: '-webkit-center' }}>
              <Skeleton width="60%" />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Skeleton animation="pulse" width="100%" height={40} />
      <Skeleton animation={false} width="100%" height={40} />
      <Skeleton animation="pulse" width="100%" height={40} />
      <Skeleton animation={false} width="100%" height={40} />
      <Skeleton animation="pulse" width="100%" height={40} />
    </div>
  )
};

export default SkeletonGateways;