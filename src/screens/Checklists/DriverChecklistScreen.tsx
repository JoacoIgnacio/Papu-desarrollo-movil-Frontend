import React, { useState } from 'react';
import { FormContainer, Row, Label, Input, Button, CheckboxContainer, Textarea } from './EquipmentChecklistScreen.styles';

const ChecklistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    sistemaLuces: '',
    neumaticos: '',
    parabrisas: '',
    carroceria: '',
    niveles: '',
    documentacion: '',
    botiquin: '',
    derrameKit: '',
    emergenciaKit: '',
    inviernoKit: '',
    extintor: '',
    volante: '',
    gps: '',
    rcoApp: '',
    trabaTuercas: '',
    observaciones: {
      sistemaLuces: '',
      neumaticos: '',
      parabrisas: '',
      carroceria: '',
      niveles: '',
      documentacion: '',
      botiquin: '',
      derrameKit: '',
      emergenciaKit: '',
      inviernoKit: '',
      extintor: '',
      volante: '',
      gps: '',
      rcoApp: '',
      trabaTuercas: '',
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name.includes('observaciones')) {
      const key = name.split('_')[1]; 
      setFormData({ ...formData, observaciones: { ...formData.observaciones, [key]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí manejarías el envío del formulario
    console.log(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Check List "Conductores” Comercializadora Ltda.</h2>
      
      <Row>
        <Label>Nombre</Label>
        <Input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
      </Row>

      <Row>
        <Label>Fecha</Label>
        <Input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Patente</Label>
        <Input type="text" name="patente" value={formData.patente} onChange={handleInputChange} placeholder="Patente del vehículo" />
      </Row>

      <h3>Fatiga y Somnolencia</h3>

      <Row>
        <Label>¿Ha dormido menos de 6 hrs en las últimas 24 hrs?</Label>
        <CheckboxContainer>
          <Input type="radio" name="horasSueño" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="horasSueño" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_horasSueño" placeholder="(Observaciones)En caso de dormir menos de 6hrs, dar aviso a jefe directo" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Ha ingerido medicamentos que afecten la disminución de los reflejos?</Label>
        <CheckboxContainer>
          <Input type="radio" name="medicamentos" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="medicamentos" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_medicamentos" placeholder="(Observaciones) En caso de estar tomando medicamentos, debe dar aviso a su jefe directo." onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Se encuentra en condiciones para realizar la actividad?</Label>
        <CheckboxContainer>
          <Input type="radio" name="condiciones" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="condiciones" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_condiciones" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>En este momento ¿Se encuentra mal de salud?</Label>
        <CheckboxContainer>
          <Input type="radio" name="estadoSalud" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="estadoSalud" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_estadoSalud" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Presenta sensación de cansancio, sueño y/o bostezos?</Label>
        <CheckboxContainer>
          <Input type="radio" name="sensaciones" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="sensaciones" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_sensaciones   " placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Realizo actividad física intensa antes del inicio de su labor?</Label>
        <CheckboxContainer>
          <Input type="radio" name="actividadFisica" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="actividadFisica" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_actividadFisica" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <h3>Conductor</h3>

      <Row>
        <Label>¿Cuenta con sus elementos de protección personal?</Label>
        <CheckboxContainer>
          <Input type="radio" name="proteccion" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="proteccion" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_proteccion" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>¿Cuenta con su ropa corporativa?</Label>
        <CheckboxContainer>
          <Input type="radio" name="ropa" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="ropa" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_ropa" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <h3>Condiciones antes del viaje</h3>
      <Row>
        <Label>Realizo Check List Equipos</Label>
        <CheckboxContainer>
          <Input type="radio" name="checklistequipos" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="checklistequipos" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_checklistequipos" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <Row>
        <Label>Conexión RCO</Label>
        <CheckboxContainer>
          <Input type="radio" name="rco" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="rco" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_rco" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>

      <h3>Presentación personal</h3>
      <Row>
        <Label>El conductor cuenta con una buena presentación personal (Vestimenta, corte de cabello adecuado, afeitado)</Label>
        <CheckboxContainer>
          <Input type="radio" name="presentacionpersonal" value="si" onChange={handleInputChange}/> Sí
          <Input type="radio" name="presentacionpersonal" value="no" onChange={handleInputChange}/> No
        </CheckboxContainer>
        <Textarea name="observaciones_presentacionpersonal" placeholder="Observaciones" onChange={handleInputChange} />
      </Row>
      
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};

export default ChecklistForm;
