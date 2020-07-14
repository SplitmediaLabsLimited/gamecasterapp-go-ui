import Flex from '@go-ui/components';
import { usePopper } from 'react-popper';
import { useRect } from '@reach/rect';
import { useForkedRef } from '@reach/utils';
import matchSorter from 'match-sorter';
import React, { useCallback, useMemo, useRef } from 'react';
import { SelectLabel, SelectMenu } from './dropdown';
import highlight from './highlight';
import {
  CtrlIcon,
  CtrlIconWrap,
  FormField,
  Highlight,
  Input,
  Select,
  useSelect,
} from './shared-components';
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
    const [rootRef, setRootRef] = useState(null);
    const [ctrlRef, setCtrlRef] = useState(null);
    const [popperRef, setPopperRef] = useState(null);
    const popper = usePopper(
      useFieldAsReference ? rootRef : ctrlRef,
      popperRef,
      {
        placement,
        modifiers,
      }
    );

    const rootSizeRef = useRef();
    const ctrlSizeRef = useRef();
    const rect = useRect(useFieldAsReference ? rootSizeRef : ctrlSizeRef);

    return (
      <FormField
        as={Select}
        ref={useForkedRef(ref, setRootRef, rootSizeRef)}
        onStateChange={stateFocusOnParent}
        {...props}>
        <SelectLabel>{label}</SelectLabel>
        <InputCtrl
          placeholder={placeholder}
          size={size}
          toggleMenuOnFocus={toggleMenuOnFocus}
          ref={useForkedRef(ctrlSizeRef, setCtrlRef)}
        />
        <ComboMenu items={items} popper={popper} width={rect?.width} />
      </FormField>
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
        (e) => {
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
      <Flex
        sx={{
          borderRadius: '0.25em',
          '&:focus, &:focus-within': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${(t) => t.colors.primary[400]}`,
            transition: 'box-shadow 120ms',
          },
        }}
        style={style}
        className={className}
        ref={ref}>
        <Input
          value={value || ''}
          {...inputProps}
          ref={inputRef}
          sx={{ '&:focus': { outline: 'none', boxShadow: 'none' } }}
        />
        <CtrlIconWrap
          {...btnProps}
          onClick={(e) => {
            e.preventDefault();
            inputRef.current.focus();
          }}>
          <CtrlIcon
            sx={{
              top: 'unset',
              position: 'relative',
              right: 'unset',
              pointerEvents: 'unset',
            }}
            style={{
              transform: `rotate(${select.isOpen ? '90deg' : '270deg'})`,
            }}
          />
        </CtrlIconWrap>
      </Flex>
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

    return items.filter((item) => filtered.includes(select.itemToString(item)));
  }, [items, select]);

  return (
    <SelectMenu
      items={filteredItems.concat(
        items.filter((val) => !filteredItems.includes(val))
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
