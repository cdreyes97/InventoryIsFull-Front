import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ButtonGroup,
  Button
} from "shards-react";
import { Link } from 'react-router-dom';
import pabellonService from '../services/pabellon.service';

import PageTitle from "../components/common/PageTitle";

class Pabellones extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pabellones: [],
    }
  }

  componentDidMount() {
    pabellonService.getAll().then((response) => {
      this.setState({
        pabellones: response.status === 200 ? response.data : [],
      })
    });
  }

  deletePabellon(pabellonId) {

    pabellonService.deletePabellon(pabellonId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    this.setState({
      pabellones: this.state.pabellones.filter(pabellon => pabellon.id !== pabellonId)
    });
}

  render() {
    const { pabellones } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Pabellones" subtitle="" className="text-sm-left" />
          <Link style={{ marginRight: "00px" }} to={"agregar-pabellon"} className="btn btn-sm btn-outline-primary">Nuevo Pabellón</Link>
        </Row>

        <Row>
          {pabellones.map((pabellon, index) => {
            return (
              <Col lg="2" key={pabellon.id}>
                <Card small className="card-post mb-4" style={{width: "175px"}}>
                  <CardBody>
                    <h5 className="card-title">Sala {pabellon.sala}</h5>
                    <p className="card-text text-muted">{pabellon.descripcion}</p>
                    <p className="card-text text-muted">{pabellon.estado}</p>
                    <ButtonGroup>
                        <Link style={{ marginRight: "00px" }} to={"editar-pabellon/" + pabellon.id} className="btn btn-sm btn-secondary">Editar</Link>
                        <Button style={{ marginLeft: "00px" }} onClick={this.deletePabellon.bind(this, pabellon.id)}>Borrar</Button>
                    </ButtonGroup>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    );
  }

}

export default Pabellones;
