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
import recuperacionService from '../services/recuperacion.service';

import PageTitle from "../components/common/PageTitle";

class Recuperacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recuperacion: [],
    }
  }

  componentDidMount() {
    recuperacionService.getAll().then((response) => {
      this.setState({
        recuperacion: response.status === 200 ? response.data : [],
      })
    });
  }

  deleteRecuperacion(recuperacionId) {

    recuperacionService.deleteRecuperacion(recuperacionId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

  render() {
    const { recuperacion } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Link style={{ marginRight: "00px" }} to={"agregar-recuperacion"} className="btn btn-sm">Agregar</Link>
          <Link style={{ marginRight: "00px" }} to={"camas-recuperacion"} className="btn btn-sm btn-light">Camas</Link>
          <PageTitle sm="4" title="Salas de Recuperacion" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          {recuperacion.map((recuperacion, index) => {
            return (
              <Col lg="2" key={recuperacion.id} style={{marginLeft: "30px"}}>
                <Card Large className="card-post mb-4 " style={{width: "210px"}}>
                  <CardBody >
                    <h6 className="card-title">Id {recuperacion.id}</h6>
                    <h6 className="card-title">Piso {recuperacion.piso}</h6>
                    <h6 className="card-title">Número {recuperacion.numero}</h6>
                    <ButtonGroup>
                        <Link style={{ marginRight: "00px" }} to={"ver-recuperacion/" + recuperacion.id} className="btn btn-sm btn-info">Ver</Link>
                        <Link style={{ marginRight: "00px" }} to={"editar-recuperacion/" + recuperacion.id} className="btn btn-sm btn-secondary">Editar</Link>
                        <Button style={{ marginLeft: "00px" }} onClick={this.deleteRecuperacion.bind(this, recuperacion.id)}>Borrar</Button>
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

export default Recuperacion;
