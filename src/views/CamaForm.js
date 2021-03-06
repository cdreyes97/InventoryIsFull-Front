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
    //alert('descripcion: ' + this.state.descripcion + '\nestado ' + this.state.estado);
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
                alert("Cama Creada");
                this.props.history.push('/camas-recuperacion');
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
                alert("Cama Editada");
                this.props.history.push('/camas-recuperacion');
            }
        });
    }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
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
                    </Form.Row>
                    <Form.Row>
                      {this.state.id ? <Form.Group controlId="formGridestado" style={{ marginLeft: "10px" }}>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control as="select" required type="text" name="estado" value={this.state.estado} onChange={this.camaChange}>
                          <option>Disponible</option>
                          <option>Ocupado</option>
                        </Form.Control>
                      </Form.Group> : null}
                    </Form.Row>
                        </Card.Body>
                          <Card.Footer>
                            <Button variant="success" type="submit">
                              {this.state.id ? "Update" : "Submit"}
                            </Button>{' '}
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
