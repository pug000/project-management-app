import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  width: 50%;
  margin-left: 16px;

  @media (max-width: 600px) {
    order: 1;
    width: 100%;
    margin: 20px 0 0;
  }

  Form {
    flex-direction: row;
    gap: 3px;
    padding: 0;

    span {
      display: none;
    }
  }

  Input {
    margin-top: 5px;

    & ~ label {
      top: 6px;
    }

    &:focus ~ label,
    &:disabled ~ label {
      transform: none;
      font-size: ${({ theme }) => theme.fontSizes.text};
      color: ${({ theme }) => theme.colors.grey};
    }

    &:valid ~ label {
      display: none;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  Button {
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.transparent};
    color: ${({ theme }) => theme.colors.primaryColor};

    svg {
      transform: scale(2);
    }
  }
`;

export default SearchBarWrapper;
