import axios from 'axios';

export const serviceGetAllGateways = () => {
  return axios.get("http://localhost:3001/gateways");
};

export const serviceUpdateGateway = (gateway) => {
  return axios.put(
    "http://localhost:3001/gateway",
    gateway
  );
};

export const serviceAddGateway = (gateway) => {
  return axios.post(
    "http://localhost:3001/gateway",
    gateway
  );
};

export const serviceDeleteGateway = (gatewaySerial) => {
  console.log('gatewaySerial', gatewaySerial)
  return axios.delete(
    "http://localhost:3001/gateway",
    { data: { serial: gatewaySerial } }
  );
};