import { useForkedRef } from '@reach/utils';
import { usePopper } from 'react-popper';
import { useRect } from '@reach/rect';
import React, { useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import {
  FormField,
  FormLabel,
  CtrlIcon,
  Input,
  InputWrap,
  Item,
  Menu,
  Select,
  useSelect,
} from './select-components';

const BasicSelect = React.forwardRef(
  (
    {
      items,
      label,
      disabled,
      autoFocus,
      placeholder = 'Click to Select',
      size,
      placement,
      modifiers,
      useFieldAsReference = false,
      renderItem = ({ item, select }) => select.itemToString(item),
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
        {...props}
        ref={useForkedRef(ref, setRootRef, rootSizeRef)}>
        <SelectLabel>{label}</SelectLabel>
        <SelectCtrl
          placeholder={placeholder}
          size={size}
          ref={useForkedRef(ctrlSizeRef, setCtrlRef)}
        />
        <SelectMenu
          ref={setPopperRef}
          items={items}
          popper={popper}
          width={rect?.width}
          renderItem={renderItem}
        />
      </FormField>
    );
  }
);

const SelectCtrl = React.forwardRef(
  ({ size, placeholder, autoFocus, selectedItems, disabled }, ref) => {
    const select = useSelect();

    const btnProps = select.getToggleButtonProps({
      id: `${select.id}-input`,
      placeholder,
      autoFocus,
      disabled,
      type: 'text',
      readOnly: true,
      value: selectedItems ? selectedItems.join(', ') : select.inputValue || '',
      size,
    });

    return (
      <InputWrap ref={ref}>
        <Input {...btnProps} />
        <CtrlIcon
          style={{
            transform: `rotate(${select.isOpen ? '90deg' : '270deg'})`,
          }}
        />
      </InputWrap>
    );
  }
);

const SelectLabel = (props) => {
  const select = useSelect();

  return <FormLabel {...select.getLabelProps(props)} />;
};

const SelectMenu = React.forwardRef(function SelectMenu(
  {
    items,
    selectedItems,
    width,
    popper,
    renderItem = ({ item, select }) => select.itemToString(item),
    children,
    ...props
  },
  ref
) {
  const select = useSelect();
  return (
    <div {...select.getMenuProps({ style: { display: 'none' } })}>
      <TransitionGroup component={null}>
        {select.isOpen && (
          <Transition timeout={{ enter: 15, exit: 150 }}>
            {(transitionState) =>
              ReactDOM.createPortal(
                <div
                  ref={ref}
                  style={{
                    ...popper.styles.popper,
                    width,
                    zIndex: 1,
                  }}>
                  <Menu
                    {...popper.attributes.popper}
                    data-placement={
                      popper.attributes.popper?.['data-popper-placement']
                    }
                    {...{ [`data-transition-${transitionState}`]: true }}
                    {...props}>
                    {children}
                    {items.map((item, id) => (
                      <Item
                        {...select.getItemProps({
                          key: `${item}-${id}`,
                          index: id,
                          item: item,
                          isActive: select.highlightedIndex === id,
                          isSelected: selectedItems
                            ? selectedItems.includes(item)
                            : select.selectedItem === item,
                          withSpacer:
                            selectedItems && selectedItems.length > 0
                              ? !selectedItems.includes(item)
                              : select.selectedItem !== undefined &&
                                select.selectedItem !== item,
                        })}>
                        {renderItem({ item, select })}
                      </Item>
                    ))}
                  </Menu>
                </div>,
                document.body
              )
            }
          </Transition>
        )}
      </TransitionGroup>
    </div>
  );
});

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

    return (
      <InputWrap style={style} className={className} ref={ref}>
        <Input value={value || ''} {...inputProps} />
        <CtrlIcon
          style={{
            transform: `rotate(${select.isOpen ? '90deg' : '270deg'})`,
          }}
        />
      </InputWrap>
    );
  }
);

export {
  BasicSelect as Select,
  SelectLabel,
  SelectCtrl,
  InputCtrl,
  SelectMenu,
};

export default Object.assign(BasicSelect, {
  Label: SelectLabel,
  Control: SelectCtrl,
  Input: InputCtrl,
  Menu: SelectMenu,
});
