
import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 20px;
  background: var(--bg-default);
  border-radius: var(--br-8);
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  margin: 8px 0;
  padding: 8px;
  background: var(--bg-higher);
  border: 1px solid var(--outline-default);
  border-radius: var(--br-8);
  color: var(--fg-default);
`;

const InputLabel = styled.label`
  color: var(--fg-default);
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
`;

const InputDescription = styled.div`
  color: var(--fg-dimmer);
  font-size: 12px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: var(--accent-primary-dimmer);
  color: white;
  border: none;
  border-radius: var(--br-8);
  cursor: pointer;
  
  &:hover {
    background: var(--accent-primary-default);
  }
`;

export function QuantumContractUI({ onDeploy }) {
  const [formData, setFormData] = useState({
    name: '',
    dilithiumKeyLength: '2420',
    kyberKeyLength: '800', 
    rainbowKeyLength: '528'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeploy(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <FormWrapper>
      <h3>Create Quantum-Resistant Contract</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>Contract Name</InputLabel>
          <InputDescription>A unique identifier for your quantum-resistant contract</InputDescription>
          <Input
            name="name"
            placeholder="e.g., MyQuantumContract"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Dilithium Key Length</InputLabel>
          <InputDescription>Length of the Dilithium signature (recommended: 2420 bytes for post-quantum security)</InputDescription>
          <Input
            name="dilithiumKeyLength"
            type="number"
            min="2420"
            max="4000"
            placeholder="2420"
            value={formData.dilithiumKeyLength}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Kyber Key Length</InputLabel>
          <InputDescription>Length of the Kyber encryption key (recommended: 800 bytes for post-quantum security)</InputDescription>
          <Input
            name="kyberKeyLength"
            type="number"
            min="800"
            max="1600"
            placeholder="800"
            value={formData.kyberKeyLength}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Rainbow Key Length</InputLabel>
          <InputDescription>Length of the Rainbow signature (recommended: 528 bytes for quantum resistance)</InputDescription>
          <Input
            name="rainbowKeyLength"
            type="number"
            min="528"
            max="1056"
            placeholder="528"
            value={formData.rainbowKeyLength}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Deploy Quantum Contract</Button>
      </form>
    </FormWrapper>
  );
}
