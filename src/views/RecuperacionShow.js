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
import camaService from '../services/camas.service';

import PageTitle from "../components/common/PageTitle";

class RecuperacionShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      camas: []
    }
    this.idRecuperacion = '';
  }

  initialState = { id: '', camas: []}

  componentDidMount() {
    this.idRecuperacion = this.props.match.params.id;
    recuperacionService.show(this.idRecuperacion).then((response) => {
      this.setState({
        camas: response.status === 200 ? response.data.camas : [],
      })
    });
  }

  deleteRecuperacion(recuperacionId) {

    recuperacionService.deleteRecuperacion(recuperacionId)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

  removeCamaFromRecuperacion(camaId){

    const data = {
      idSala: this.idRecuperacion,
      idCama: camaId
    };

    camaService.removeCama(data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  render() {
    const { camas } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
        <Link style={{ marginRight: "00px" }} to={"/agregar-cama-recuperacion/" + this.idRecuperacion} className="btn btn-sm">Agregar Cama</Link>
          <PageTitle sm="4" title={"Sala de Recuperacion " + this.idRecuperacion} subtitle="" className="text-sm-left" />
        </Row>

        <Row>
          {camas.map((cama, index) => {
            return (
              <Col lg="2" key={cama} style={{marginLeft: "30px"}}>
                <Card Large className="card-post mb-4 " style={{width: "210px"}}>
                  <CardBody >
                    <h6 className="card-title">Id {cama}</h6>
                  </CardBody>
                  <ButtonGroup>
                        <Button style={{ marginLeft: "00px" }} onClick={this.removeCamaFromRecuperacion.bind(this, cama)}>Borrar</Button>
                    </ButtonGroup>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    );
  }

}

export default RecuperacionShow;
