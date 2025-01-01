
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

export function QuantumSecureTokenUI({ onDeploy }) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    initialSupply: '1000000',
    decimals: '18',
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
      <h3>Create Quantum-Secure Token</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token Name</label>
          <Input
            name="name"
            placeholder="My Quantum Token"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Token Symbol</label>
          <Input
            name="symbol"
            placeholder="QTK"
            value={formData.symbol}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Initial Supply</label>
          <Input
            name="initialSupply"
            type="number"
            value={formData.initialSupply}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Decimals</label>
          <Input
            name="decimals"
            type="number"
            min="0"
            max="18"
            value={formData.decimals}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Dilithium Key Length</label>
          <Input
            name="dilithiumKeyLength"
            type="number"
            min="2420"
            value={formData.dilithiumKeyLength}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Kyber Key Length</label>
          <Input
            name="kyberKeyLength"
            type="number"
            min="800"
            value={formData.kyberKeyLength}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rainbow Key Length</label>
          <Input
            name="rainbowKeyLength"
            type="number"
            min="528"
            value={formData.rainbowKeyLength}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Deploy Quantum-Secure Token</Button>
      </form>
    </FormWrapper>
  );
}
