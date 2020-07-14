import Form from '@go/ui/form';
import usePopper from '@go/ui/popup/use-popper';
import { SelectCtrl, SelectLabel, SelectMenu } from './dropdown';
import { useRect } from '@reach/rect';
import { useForkedRef, wrapEvent } from '@reach/utils';
import Downshift from 'downshift';
import React, { useCallback, useRef } from 'react';
import { useUncontrolled } from 'uncontrollable';
import { Select } from './shared-components';

const stateReducer = (state, changes) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        highlightedIndex: state.highlightedIndex,
        isOpen: true,
      };
    default:
      return changes;
  }
};

const MultiSelect = React.forwardRef(
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
      onChange,
      useFieldAsReference = false,
      ...props
    },
    ref
  ) => {
    const { selectedItems = [], setSelectedItems } = useUncontrolled(props, {
      selectedItems: 'setSelectedItems',
    });

    const addSelectedItem = useCallback(
      (item, cb) => {
        const items = selectedItems.concat(item);
        setSelectedItems(items);
        cb(items);
      },
      [selectedItems, setSelectedItems]
    );

    const removeItem = useCallback(
      (item, cb) => {
        const items = selectedItems.filter((i) => i !== item);
        setSelectedItems(items);
        cb && cb(items);
      },
      [selectedItems, setSelectedItems]
    );

    const getRemoveButtonProps = useCallback(
      ({ onClick, item, ...props } = {}) => ({
        onClick: wrapEvent(onClick, (e) => {
          e.stopPropagation();
          removeItem(item, onChange);
        }),
        ...props,
      }),
      [onChange, removeItem]
    );

    const handleSelection = useCallback(
      (selectedItem, downshift) => {
        const callOnChange = (selectedItems) => {
          if (onChange) {
            onChange(selectedItems, {
              getRemoveButtonProps,
              removeItem,
              ...downshift,
            });
          }
        };

        if (selectedItems.includes(selectedItem)) {
          removeItem(selectedItem, callOnChange);
        } else {
          addSelectedItem(selectedItem, callOnChange);
        }
      },
      [
        selectedItems,
        onChange,
        getRemoveButtonProps,
        removeItem,
        addSelectedItem,
      ]
    );

    const referenceRef = useRef();
    const popper = usePopper({ placement, modifiers });
    const referenceSize = useRect(referenceRef);
    const forkedRef = useForkedRef(referenceRef, popper.reference.ref);
    const rootRef = useForkedRef(ref, forkedRef);

    return (
      <Form.Field
        as={Select}
        stateReducer={stateReducer}
        onChange={handleSelection}
        selectedItem={null}
        {...props}
        ref={useFieldAsReference ? rootRef : ref}>
        <SelectLabel>{label}</SelectLabel>
        <SelectCtrl
          placeholder={placeholder}
          {...(useFieldAsReference ? {} : { ref: forkedRef })}
          size={size}
          selectedItems={selectedItems}
        />
        <SelectMenu
          items={items}
          popper={popper.popper}
          width={referenceSize && referenceSize.width}
          selectedItems={selectedItems}
        />
      </Form.Field>
    );
  }
);

export { MultiSelect as Select };

export default MultiSelect;
