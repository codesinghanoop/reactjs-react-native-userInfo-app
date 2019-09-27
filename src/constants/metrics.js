import React from 'react';
import styled, { css } from 'styled-components';

const Metrics = {
  large: css`1147px`,
  Xlarge: css`1480px`,
  medium: css`990px`,
  small: css`600px`,
  Xsmall: css`410px`,
};

export const filterOptions = [
  {
    displayName: 'Type 0',
    value: '0',
  },
  {
    displayName: 'Type 1',
    value: '1',
  },
  {
    displayName: 'Type 2',
    value: '2',
  },
  {
    displayName: 'Type 3',
    value: '3',
  },
  {
    displayName: 'Type 4',
    value: '4',
  },
];

export default Metrics;
