import styled from 'styled-components';

const LangWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  z-index: 10;
`;

const CheckboxContainer = styled.div`
  position: relative;
  width: 60px;
  height: 32px;
  margin: 0 auto;
  overflow: hidden;
  border: solid 1px ${({ theme }) => theme.colors.backgroundDarkBlue};
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
`;

const CheckboxSwitcher = styled.div`
  z-index: 2;

  &:before {
    content: 'EN';
    position: absolute;
    top: 2.5px;
    left: 3px;
    width: 25px;
    height: 25px;
    color: ${({ theme }) => theme.colors.textButton};
    font-size: 13px;
    font-weight: bold;
    line-height: 0.5;
    padding: 9px 3px;
    background-color: ${({ theme }) => theme.colors.backgroundDarkBlue};
    border-radius: 50%;
    transition: ${({ theme }) => theme.effects.transition},
      left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  }
`;

const InputCheckbox = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;

  &:active + ${CheckboxSwitcher}:before {
    width: 46px;
    border-radius: 100px;
  }

  &:checked + ${CheckboxSwitcher}:before {
    content: 'RU';
    left: 30px;
  }

  &:checked:active + ${CheckboxSwitcher}:before {
    margin-left: -26px;
  }
`;

export { LangWrapper, CheckboxContainer, InputCheckbox, CheckboxSwitcher };
