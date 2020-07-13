import { Badge, Input as BaseInput, Flex } from '@go-ui/components';

/** @jsx jsx **/
import { jsx, css as sx } from '@go-ui/core';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Downshift from 'downshift';
import { em, rem } from 'polished';
import { transparentize } from '@go-ui/color';
import { forwardRef, createContext, useContext } from 'react';
import { Check, ChevronLeft, Close, Search } from '@styled-icons/material';
import { scrollbarStyle } from './styles';

const SelectContext = createContext();

export const FormField = styled(Flex)(
  {
    display: 'flex',
    flexDirection: 'column',
    '> label': { fontSize: em(14) },
    'small:last-child': {
      marginBottom: em(5),
    },
  },
  (props) =>
    !props.horizontal && { flex: 1, '> label': { paddingBottom: em(4) } },
  (props) =>
    props.horizontal && {
      flexDirection: 'row',
      alignItems: 'center',
      label: { paddingBottom: 0, paddingRight: em(10) },
      'label:not(:first-child)': {
        paddingLeft: em(10),
      },
    }
);

export const FormLabel = styled.label({ display: 'inline-block' });

export function useSelect() {
  return useContext(SelectContext);
}

const Root = forwardRef((props, ref) => {
  return <div {...props} ref={ref} />;
});

const closeOnEscape = (state, changes) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEscape:
      return {
        ...state,
        isOpen: changes.isOpen,
      };
    default:
      return changes;
  }
};

const SelectImpl = forwardRef(function SelectImpl(
  { children, className, style, ...rest },
  ref
) {
  return (
    <Downshift stateReducer={closeOnEscape} {...rest}>
      {(downshiftProps) => (
        <Root
          className={className}
          style={style}
          {...downshiftProps.getRootProps({
            refKey: 'ref',
            ref: ref,
          })}>
          <SelectContext.Provider value={downshiftProps}>
            {children}
          </SelectContext.Provider>
        </Root>
      )}
    </Downshift>
  );
});

export const Select = styled(SelectImpl)({ position: 'relative' });

const ItemWrap = styled.li(
  sx({
    py: em(9),
    px: em(6.5),
    fontSize: em(14),
    cursor: 'pointer',
  }),

  (props) =>
    props.isActive &&
    sx({
      borderRadius: '0.25em',
      bg: (t) => transparentize(t.colors.base[500], 0.7),
    })
);

export const Item = forwardRef(
  ({ isActive, isSelected, withSpacer, children, ...rest }, ref) => (
    <ItemWrap ref={ref} isActive={isActive} {...rest}>
      {withSpacer && (
        // this is just a spacer :P
        <span
          sx={{ display: 'inline-block', width: `calc(1em + ${em(9.5)})` }}
        />
      )}
      {isSelected && (
        <Check
          sx={{
            width: '1em',
            height: '1em',
            mr: em(9.5),
            color: (t) => t.colors.primary[200],
          }}
        />
      )}
      {children}
    </ItemWrap>
  )
);

export const InputWrap = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const Input = styled(BaseInput)`
  text-align: left;
  cursor: ${(props) => !props.disabled && 'pointer'};
  text-overflow: ellipsis;
  font-size: inherit;
`;

export const Label = styled.label`
  display: block;
  font-size: ${em(14)};
  margin-bottom: ${em(12)};
`;

export const Menu = styled.ul(
  sx({ bg: 'base.600' }),
  css`
    width: 100%;
    border-radius: 0.25em;
    margin: ${em(5)} 0;
    padding: ${em(9)} ${em(6.5)};
    list-style-type: none;
    max-height: ${rem(200)};
    overflow-y: auto;

    &[data-transition-entering] {
      transform: translateY(-30px);
      opacity: 0;
    }

    &[data-transition-entered] {
      transform: translateY(0);
      opacity: 1;

      transition: transform 300ms cubic-bezier(0.1, 0.9, 0.2, 1),
        opacity 300ms cubic-bezier(0.1, 0.9, 0.2, 1);
    }

    &[data-transition-exiting] {
      transform: translateY(-30px);
      opacity: 0;

      transition: transform 150ms cubic-bezier(0.7, 0, 1, 0.5),
        opacity 150ms cubic-bezier(0.7, 0, 1, 0.5);
    }
  `,
  sx(scrollbarStyle)
);

const iconCss = {
  width: '1em',
  height: '1em',
  cursor: 'pointer',
  '-webkit-appearance': 'none !important',
};

export const SearchIcon = styled(Search)(
  sx({
    ...iconCss,
    transform: 'scale(-0.8, 0.8)',
  })
);

export const ArrowIcon = styled(ChevronLeft)(sx(iconCss));

export const CtrlButton = styled.button(
  css`
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    outline: none;
    font-size: 1.5em;
  `,
  (props) =>
    sx({
      color: (t) => t.colors.base[props.disabled ? 600 : 400],
    })
);

export const CtrlIconWrap = styled.div(
  sx({ bg: 'base.600' }),
  css`
    appearance: none;
    display: flex;
    align-items: center;
    border-top-right-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
    padding-right: 0.3em;
  `
);

export const CtrlIcon = styled(ArrowIcon)(
  css`
    font-size: 1.5em;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    top: calc(50% - (0.5em));
    position: absolute;
    pointer-events: none;
    right: 0.2em;
  `,
  (props) =>
    sx({
      color: (t) => t.colors.base[props.disabled ? 600 : 400],
    })
);

export const ComboInputStyle = styled(Input)(
  sx({
    backgroundColor: 'unset',
    border: '1px solid',
    borderColor: 'base.500',
    color: 'base.500',
    '&::placeholder': {
      color: 'base.500',
    },
    pl: rem(20),
  })
);

export const ComboCtrlButton = styled(CtrlButton)(
  sx({
    p: 0,
    left: 0,
    right: 'unset',
    color: 'base.500',
  })
);

export const XIcon = styled(Close)(sx(iconCss));

export const Highlight = styled.mark(
  sx({ bg: 'primary.400', color: 'white', fontWeight: 'bold' })
);

export const Tag = ({ onClick, children, ...props }) => (
  <Badge
    tag
    variant="primary"
    {...props}
    sx={{
      paddingRight: em(4),
      display: 'inline-flex',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: em(4),
      marginBottom: em(4),
      marginLeft: em(6),
      '&:last-of-type': { marginRight: em(6) },
    }}>
    <span
      sx={{
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
      {children}
    </span>
    <button
      onClick={onClick}
      aria-label="clear item"
      sx={{
        backgroundColor: 'unset',
        color: 'inherit',
        whiteSpace: 'nowrap',
        flex: 'none',
        padding: '0',
        marginLeft: em(3),
        outline: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        appearance: 'none',
        border: '0',
      }}>
      <XIcon />
    </button>
  </Badge>
);
