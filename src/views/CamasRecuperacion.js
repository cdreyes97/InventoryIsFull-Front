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
import camaService from '../services/camas.service';

import PageTitle from "../components/common/PageTitle";

class CamasRecuperacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      camas: [],
    }
  }

  componentDidMount() {
    camaService.getAll().then((response) => {
      this.setState({
        camas: response.status === 200 ? response.data : [],
      })
    });
  }

  deleteCama(camaId) {

    camaService.deleteCama(camaId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
        this.setState({
          camas: this.state.camas.filter(cama => cama.id !== camaId)
        });
}

  render() {
    const { camas } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Link style={{ marginRight: "00px" }} to={"recuperacion"} className="btn btn-outline-light">{"< Volver"}</Link>
          <PageTitle sm="4" title="Camas de Recuperación" subtitle="" className="text-sm-left" />
          <Link style={{ marginRight: "00px" }} to={"crear-cama-recuperacion"} className="btn btn-sm btn-outline-primary">Nueva Cama</Link>
        </Row>
        <Row>
          {camas.map((cama, index) => {
            return (
              <Col lg="2" key={cama.id}>
                <Card small className="card-post mb-4" style={{width: "175px"}}>
                  <CardBody>
                    <h6 className="card-title">Cama {cama.id}</h6>
                    <h6 className="card-title">{cama.descripcion}</h6>
                    <h6 className="card-title">{cama.estado}</h6>
                    <ButtonGroup>
                        <Link style={{ marginRight: "00px" }} to={"editar-cama-recuperacion/" + cama.id} className="btn btn-sm btn-secondary">Editar</Link>
                        <Button style={{ marginLeft: "00px" }} onClick={this.deleteCama.bind(this, cama.id)}>Borrar</Button>
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

export default CamasRecuperacion;
