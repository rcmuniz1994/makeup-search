import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FiltersContainer = styled.div`
  background-color: rgba(0,0,0,.075);
  border: 1px solid #dee2e6;
  padding: 15px 5px;
  text-align: center;
  
  .dropdown-toggle {
    overflow-x: hidden;
    text-overflow: ellipsis
  }
`;

const FiltersContainerTitle = styled.p`
  color: #212529;
  font-size: 24px;
  font-weight: bold;
`;

const FilterLabel = styled.label`
  color: #212529;
  font-size: 16px;
  font-weight: bold;
`;

const Filters = (props) => {
  const { brands, selectedBrand, handleOnSelectBrand } = props;

  return (
    <FiltersContainer>
      <FiltersContainerTitle>
        Filters
      </FiltersContainerTitle>
      <FilterLabel for="brand-filter">Brand</FilterLabel>
      <DropdownButton
        id="brand-filter"
        variant="dark"
        title={selectedBrand || 'Select a brand...'}
        onSelect={handleOnSelectBrand}
      >
        <Dropdown.Item eventKey=""> -- </Dropdown.Item>
        {brands.map((brand) => (
          <Dropdown.Item eventKey={brand}>
            {brand}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </FiltersContainer>
  );
};

Filters.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBrand: PropTypes.string.isRequired,
  handleOnSelectBrand: PropTypes.func.isRequired,
};

export default Filters;
