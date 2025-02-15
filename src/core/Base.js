import React, { Fragment } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Menu from "./Menu";

const Base = ({
  children
}) => (
    <Fragment>
    <Menu />
      <Row className='justify-content-md-center'>
          {children}
      </Row>
    </Fragment>
);

export default Base;
