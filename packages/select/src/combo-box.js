import Form from '@go/ui/form';
import Group from '@go/ui/group';
import usePopper from '@go/ui/popup/use-popper';
import { useRect } from '@reach/rect';
import { useForkedRef } from '@reach/utils';
import { css as sx } from '@theme-ui/css';
import matchSorter from 'match-sorter';
import React, { useCallback, useMemo, useRef } from 'react';
import { SelectLabel, SelectMenu } from './basic-select';
import highlight from './highlight';
import {
  CtrlIcon,
  CtrlIconWrap,
  Highlight,
  Input,
  Select,
  useSelect,
} from './select-components';
const ComboBox = React.forwardRef(
  (
    {
      items,
      label,
      disabled,
      autoFocus,
      placeholder = 'Type to search',
      size,
      placement,
      modifiers,
      horizontal,
      toggleMenuOnFocus,
      useFieldAsReference,
      ...props
    },
    ref
  ) => {
    const referenceRef = useRef();
    const popper = usePopper({ placement, modifiers });
    const referenceSize = useRect(referenceRef);
    const forkedRef = useForkedRef(referenceRef, popper.reference.ref);
    const rootRef = useForkedRef(ref, forkedRef);

    return (
      <Form.Field
        horizontal
        ref={useFieldAsReference ? rootRef : ref}
        as={Select}
        onStateChange={stateFocusOnParent}
        {...props}
      >
        <SelectLabel>{label}</SelectLabel>
        <InputCtrl
          toggleMenuOnFocus={toggleMenuOnFocus}
          placeholder={placeholder}
          size={size}
          {...(useFieldAsReference ? {} : { ref: forkedRef })}
        />
        <ComboMenu
          items={items}
          popper={popper.popper}
          width={referenceSize && referenceSize.width}
        />
      </Form.Field>
    );
  }
);

const InputCtrl = React.forwardRef(
  (
    {
      size,
      placeholder,
      autoFocus,
      disabled,
      toggleMenuOnFocus,
      style,
      className,
    },
    ref
  ) => {
    const select = useSelect();

    const { value, ...inputProps } = select.getInputProps({
      placeholder,
      disabled,
      autoFocus,
      size,
      onFocus: useCallback(
        e => {
          e.preventDefault();
          if (toggleMenuOnFocus) select.toggleMenu();
        },
        [select, toggleMenuOnFocus]
      ),
    });
    const inputRef = useRef();

    const btnProps = select.getToggleButtonProps({
      id: `${select.id}-button`,
      size,
    });

    return (
      <Group
        style={style}
        className={className}
        ref={ref}
        css={`
          border-radius: 0.25em;
          &:focus,
          &:focus-within {
            outline: none;
            box-shadow: 0 0 0 2px ${th.color('primary.400')};
            transition: box-shadow 120ms;
          }
        `}
      >
        <Input
          value={value || ''}
          {...inputProps}
          ref={inputRef}
          css={`
            &:focus {
              outline: none;
              box-shadow: none;
            }
          `}
        />
        <CtrlIconWrap
          {...btnProps}
          onClick={e => {
            e.preventDefault();
            inputRef.current.focus();
          }}
        >
          <CtrlIcon
            css={`
              top: unset;
              position: relative;
              right: unset;
              pointer-events: unset;
            `}
            style={{
              transform: `rotate(${select.isOpen ? '90deg' : '270deg'})`,
            }}
          />
        </CtrlIconWrap>
      </Group>
    );
  }
);

export function menuItemRender({ item, select }) {
  return select.inputValue.length
    ? highlight(select.itemToString(item), select.inputValue).map((token, id) =>
        token.highlight ? (
          <Highlight key={id}>{token.text}</Highlight>
        ) : (
          <span key={id}>{token.text}</span>
        )
      )
    : select.itemToString(item);
}

function ComboMenu({ items, renderItem = menuItemRender, ...props }) {
  const select = useSelect();

  const filteredItems = useMemo(() => {
    const filtered = matchSorter(
      items.map(select.itemToString),
      select.inputValue
    );

    return items.filter(item => filtered.includes(select.itemToString(item)));
  }, [items, select]);

  return (
    <SelectMenu
      items={filteredItems.concat(
        items.filter(val => !filteredItems.includes(val))
      )}
      renderItem={renderItem}
      {...props}
    />
  );
}

export function stateFocusOnParent(changes, stateAndHelpers) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.clickItem:
      const inputProps = stateAndHelpers.getInputProps();
      // getting the input element then blur it and focus it to the parent
      // solution ref. here https://bit.ly/2HhfRq9
      const dropdownInputEl = document.getElementById(inputProps.id);
      const dropdownGroupEl = dropdownInputEl.parentElement;
      dropdownInputEl.blur();

      dropdownGroupEl.setAttribute('tabindex', -1);
      dropdownGroupEl.focus();
      return {
        ...changes,
      };
    default:
      return changes;
  }
}

export {
  ComboBox,
  SelectLabel as ComboLabel,
  InputCtrl as ComboInput,
  ComboMenu,
};

export default ComboBox;
