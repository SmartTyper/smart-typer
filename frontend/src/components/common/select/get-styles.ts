import {
  CSSObject,
  ControlProps,
  OptionProps,
  StylesConfig,
} from 'common/types/types';

const getStyles = (): StylesConfig => ({
  container: (provided: CSSObject): CSSObject => ({
    ...provided,
    width: '100%',
  }),
  control: (provided: CSSObject, state: ControlProps): CSSObject => ({
    ...provided,
    height: '40px',
    minHeight: '40px',
    backgroundColor: 'white',
    borderColor: '#bfbfbf',
    boxShadow: state.isFocused ? '0px 0px 5px 0px #4bba73' : 'none',

    '&:hover': {
      borderColor: '#bfbfbf',
    },
  }),
  valueContainer: (provided: CSSObject): CSSObject => ({
    ...provided,
    height: '3.5rem',
    padding: '10px 12px',
    fontSize: '1.5rem',
    lineHeight: 'calc(1.5rem + 1px)',
  }),
  input: (provided: CSSObject): CSSObject => ({
    ...provided,
    padding: '0',
    margin: '0px',
  }),
  menuPortal: (provided: CSSObject): CSSObject => ({
    ...provided,
    zIndex: 1300,
  }),
  placeholder: (provider: CSSObject): CSSObject => ({
    ...provider,
    overflow: 'hidden',
    color: '#858585',
  }),
  indicatorSeparator: (provided: CSSObject): CSSObject => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: (provided: CSSObject): CSSObject => ({
    ...provided,
    height: '3.5rem',
  }),
  singleValue: (provider: CSSObject): CSSObject => ({
    ...provider,
    overflow: 'inherit',
    height: '100%',
  }),
  option: (provider: CSSObject, state: OptionProps): CSSObject => ({
    ...provider,
    fontSize: '1.5rem',
    lineHeight: 'calc(1.5rem + 1px)',
    color: '#293042',
    backgroundColor: state.isSelected
      ? '#77e2a9'
      : state.isFocused
        ? '#e4f9ee'
        : 'white',
    cursor: 'pointer',
  }),
  dropdownIndicator: (provider: CSSObject): CSSObject => ({
    ...provider,
    color: '#858585',
    paddingLeft: '4px',

    '&:hover': {
      borderColor: 'black',
    },
  }),
  clearIndicator: (provider: CSSObject): CSSObject => ({
    ...provider,
    paddingRight: '4px',
  }),
});

export { getStyles };
