import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getAccordionActionsUtilityClass } from './accordionActionsClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, disableSpacing } = ownerState;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
  };

  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};

const AccordionActionsRoot = styled('div', {
  name: 'MuiAccordionActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  },
})(({ ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  ...(!ownerState.disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8,
    },
  }),
}));

const AccordionActions = React.forwardRef(function AccordionActions(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAccordionActions' });
  const { className, disableSpacing = false, ...other } = props;
  const ownerState = { ...props, disableSpacing };

  const classes = useUtilityClasses(ownerState);

  return (
    <AccordionActionsRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

AccordionActions.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default AccordionActions;
