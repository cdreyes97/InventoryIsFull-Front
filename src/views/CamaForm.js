import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


import PageTitle from "../components/common/PageTitle";
import camaService from "../services/camas.service";

class CamaForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.camaChange = this.camaChange.bind(this);
    this.submitCama = this.submitCama.bind(this);
  }

  initialState = { id: '', descripcion: '', estado: ''}
  componentDidMount() {
    const camaId = +this.props.match.params.id;
    if (camaId) {
        camaService.show(camaId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        descripcion: response.data.descripcion,
                        estado: response.data.estado,
                        camas: response.data.camas,
                    });
                }
            }).catch((error) => {
                console.error("Error " + error);
            });
    }
  }

  submitCama = event => {
    alert('descripcion: ' + this.state.descripcion + '\nestado ' + this.state.estado);
    event.preventDefault();

    const cama = {
        id: this.state.id,
        descripcion: this.state.descripcion,
        estado: this.state.estado,
    };

    camaService.createCama(cama)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("Sala de Recuperación Agregado");
            }
        });
  }

  camaChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  resetCama = () => {
    this.setState(() => this.initialState);
  }

  updateCama = event => {
    event.preventDefault();

    const cama = {
      id: this.state.id,
      descripcion: this.state.descripcion,
      estado: this.state.estado,
    };

    camaService.updateCama(this.state.id, cama)
        .then(response => {
            if (response.data != null) {
                this.setState(this.initialState);
                alert("cama Editado");
            }
        });
    }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg={12} style={{ marginTop: "20px" }}>
            <Card>
              <Card.Header>{this.state.id ? "Editar Cama" : "Agregar Cama"}</Card.Header>
                <Form onReset={this.resetCama} onSubmit={this.state.id ? this.updateCama : this.submitCama} id="camaForm">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group controlId="formGriddescripcion">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control required type="text" name="descripcion" value={this.state.descripcion} onChange={this.camaChange} placeholder="Descripcion" />
                      </Form.Group>

                      <Form.Group controlId="formGridestado" style={{ marginLeft: "10px" }}>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control required type="text" name="estado" value={this.state.estado} onChange={this.camaChange} placeholder="Libre/Ocupado" />
                      </Form.Group>
                      </Form.Row>
                        </Card.Body>
                          <Card.Footer>
                            <Button variant="success" type="submit">
                              {this.state.id ? "Update" : "Submit"}
                            </Button>{' '}
                            <Button variant="info" type="reset">
                              Reset
                            </Button>
                          </Card.Footer>
                            </Form>
            </Card>
                    </Col>
                </Row>
      </Container>
    );
  }
};

export default CamaForm;
