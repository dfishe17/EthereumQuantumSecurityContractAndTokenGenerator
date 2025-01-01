
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

const Section = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--outline-dimmest);
`;

export function ERC20ContractUI({ onDeploy }) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    initialSupply: '1000000',
    decimals: '18',
    description: '',
    website: '',
    tokenType: 'standard',
    securityLevel: 'basic',
    dilithiumKeyLength: '2420',
    kyberKeyLength: '800',
    rainbowKeyLength: '528',
    useQuantumSecurity: false,
    burnableToken: false,
    pausableToken: false,
    cappedSupply: false,
    maxSupply: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeploy(formData);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <FormWrapper>
      <h3>Create ERC20 Token</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>Token Name</InputLabel>
          <InputDescription>The name of your token (e.g., "My Token")</InputDescription>
          <Input
            name="name"
            placeholder="e.g., My Token"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Token Symbol</InputLabel>
          <InputDescription>The symbol of your token (e.g., "MTK")</InputDescription>
          <Input
            name="symbol"
            placeholder="e.g., MTK"
            value={formData.symbol}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Initial Supply</InputLabel>
          <InputDescription>The initial amount of tokens to create</InputDescription>
          <Input
            name="initialSupply"
            type="number"
            min="1"
            placeholder="1000000"
            value={formData.initialSupply}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <InputLabel>Decimals</InputLabel>
          <InputDescription>Number of decimal places (usually 18 for ERC20)</InputDescription>
          <Input
            name="decimals"
            type="number"
            min="0"
            max="18"
            placeholder="18"
            value={formData.decimals}
            onChange={handleChange}
            required
          />
        </div>

        <Section>
          <InputLabel>Token Metadata</InputLabel>
          <div>
            <InputLabel>Description</InputLabel>
            <InputDescription>Brief description of your token</InputDescription>
            <Input
              name="description"
              placeholder="Enter token description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <InputLabel>Website</InputLabel>
            <InputDescription>Project website URL (optional)</InputDescription>
            <Input
              name="website"
              type="url"
              placeholder="https://"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </Section>

        <Section>
          <InputLabel>Token Features</InputLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <InputLabel>
                <Input
                  type="checkbox"
                  name="burnableToken"
                  checked={formData.burnableToken}
                  onChange={handleChange}
                  style={{ width: 'auto', marginRight: '8px' }}
                />
                Burnable Token
              </InputLabel>
              <InputDescription>Allow tokens to be burned</InputDescription>
            </div>

            <div>
              <InputLabel>
                <Input
                  type="checkbox"
                  name="pausableToken"
                  checked={formData.pausableToken}
                  onChange={handleChange}
                  style={{ width: 'auto', marginRight: '8px' }}
                />
                Pausable Token
              </InputLabel>
              <InputDescription>Allow pausing token transfers</InputDescription>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <InputLabel>
              <Input
                type="checkbox"
                name="cappedSupply"
                checked={formData.cappedSupply}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '8px' }}
              />
              Capped Supply
            </InputLabel>
            <InputDescription>Set maximum token supply limit</InputDescription>
            
            {formData.cappedSupply && (
              <Input
                name="maxSupply"
                type="number"
                min={formData.initialSupply}
                placeholder="Maximum supply"
                value={formData.maxSupply}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <InputLabel>Token Type</InputLabel>
            <InputDescription>Select the type of token to create</InputDescription>
            <select
              name="tokenType"
              value={formData.tokenType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                background: 'var(--bg-higher)',
                border: '1px solid var(--outline-default)',
                borderRadius: 'var(--br-8)',
                color: 'var(--fg-default)',
                marginTop: '8px'
              }}
            >
              <option value="standard">Standard ERC20</option>
              <option value="mintable">Mintable Token</option>
              <option value="wrapped">Wrapped Token</option>
            </select>
          </div>
        </Section>

        <Section>
          <InputLabel>Security Settings</InputLabel>
          <div style={{ marginBottom: '16px' }}>
            <InputLabel>
              <Input
                type="checkbox"
                name="useQuantumSecurity"
                checked={formData.useQuantumSecurity}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '8px' }}
              />
              Enable Quantum Security
            </InputLabel>
            <InputDescription>Add post-quantum cryptography protection to your token</InputDescription>
          </div>

          {formData.useQuantumSecurity && (
            <>
              <div>
                <InputLabel>Dilithium Key Length</InputLabel>
                <InputDescription>Digital signature scheme resistant to quantum attacks (min: 2420 bytes)</InputDescription>
                <Input
                  name="dilithiumKeyLength"
                  type="number"
                  min="2420"
                  placeholder="2420"
                  value={formData.dilithiumKeyLength}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <InputLabel>Kyber Key Length</InputLabel>
                <InputDescription>Quantum-resistant key encapsulation mechanism (min: 800 bytes)</InputDescription>
                <Input
                  name="kyberKeyLength"
                  type="number"
                  min="800"
                  placeholder="800"
                  value={formData.kyberKeyLength}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <InputLabel>Rainbow Key Length</InputLabel>
                <InputDescription>Multivariate signature scheme for quantum resistance (min: 528 bytes)</InputDescription>
                <Input
                  name="rainbowKeyLength"
                  type="number"
                  min="528"
                  placeholder="528"
                  value={formData.rainbowKeyLength}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
        </Section>

        <Button type="submit">Deploy ERC20 Token</Button>
      </form>
    </FormWrapper>
  );
}
